import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rules/authRule";
import { subscriptionRule } from "@/lib/rules/subscriptionRule";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { calculateSkillAverages } from "@/lib/rules/calculationEngine";

export async function GET(request: NextRequest) {
  const { error: authErr, user } = await requireRole(request, "student");
  if (authErr) return authErr;
  const userId = user!.id;

  const { error: subErr } = await subscriptionRule(userId);
  if (subErr) return subErr;

  const supabase = createServerSupabaseClient();

  try {
    // 1. User stats (streak, weekly goal)
    const { data: stats } = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", userId)
      .single();

    // 2. Unread notifications
    const { count: unreadCount } = await supabase
      .from("notifications")
      .select("id", { count: "exact" })
      .eq("user_id", userId)
      .eq("is_read", false);

    // 3. Continue Learning (last active chapter)
    const { data: lastProgress } = await supabase
      .from("chapter_progress")
      .select("chapter_id, current_step, chapters(title, subject_id, subjects(name))")
      .eq("user_id", userId)
      .eq("status", "in_progress")
      .order("last_activity", { ascending: false })
      .limit(1)
      .single();

    // 4. Subjects & progress summary
    const { data: subjects } = await supabase.from("subjects").select("id, name, tag").is("deleted_at", null);
    
    // We get progress counts per subject
    const subjectCards = await Promise.all((subjects || []).map(async (subj) => {
      const { data: chapters } = await supabase
        .from("chapters")
        .select("id")
        .eq("subject_id", subj.id)
        .eq("is_published", true)
        .is("deleted_at", null);
        
      const ids = chapters?.map(c => c.id) || [];
      const total = ids.length;
      
      let completed = 0;
      if (total > 0) {
        const { count } = await supabase
          .from("chapter_progress")
          .select("id", { count: "exact" })
          .eq("user_id", userId)
          .eq("status", "completed")
          .in("chapter_id", ids);
        completed = count || 0;
      }
      
      return {
        id: subj.id,
        name: subj.name,
        tag: subj.tag,
        completed_chapters: completed,
        total_chapters: total,
        progress_percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    }));

    // 5. Skill snapshot
    const skillSnapshot = await calculateSkillAverages(userId);

    // 6. Pending Tasks
    const { data: pendingResubmits } = await supabase
      .from("project_submissions")
      .select("id, chapter_id, status, chapters(title)")
      .eq("user_id", userId)
      .eq("status", "resubmit")
      .is("deleted_at", null);

    return NextResponse.json({
      success: true,
      continue_learning: lastProgress,
      subject_cards: subjectCards,
      skill_snapshot: skillSnapshot,
      pending_tasks: pendingResubmits || [],
      weekly_goal: {
        target: stats?.weekly_target || 3,
        done: stats?.weekly_chapters_done || 0
      },
      streak: stats?.current_streak || 0,
      notifications: unreadCount || 0
    });
  } catch (err) {
    console.error("[API Error] GET /student/dashboard", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
