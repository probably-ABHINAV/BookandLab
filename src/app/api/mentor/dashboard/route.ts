import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rules/authRule";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { error: authErr, user } = await requireRole(request, "mentor");
  if (authErr) return authErr;
  const mentorId = user!.id;

  const supabase = createServerSupabaseClient();

  try {
    // 1. Get assigned students
    const { data: assignments } = await supabase
      .from("mentor_assignments")
      .select("student_id, users(name, email, avatar_url)")
      .eq("mentor_id", mentorId)
      .eq("is_active", true);

    const studentIds = assignments?.map((a) => a.student_id) || [];

    // 2. Pending Reviews
    let pendingReviews = [];
    if (studentIds.length > 0) {
      const { data } = await supabase
        .from("project_submissions")
        .select("id, chapter_id, submitted_at, chapters(title), users(name, avatar_url)")
        .in("user_id", studentIds)
        .eq("status", "pending_review")
        .is("deleted_at", null)
        .order("submitted_at", { ascending: true });
      pendingReviews = data || [];
    }

    // 3. Stats
    const { count: completedCount } = await supabase
      .from("mentor_reviews")
      .select("id", { count: "exact" })
      .eq("mentor_id", mentorId);

    const stats = {
      assigned_students: studentIds.length,
      pending_reviews: pendingReviews.length,
      completed_reviews: completedCount || 0,
    };

    // 4. Student Skill Table (simplistic mock-up of average calculation for dashboard)
    const studentSkillTable = assignments?.map((a) => ({
      student_id: a.student_id,
      name: a.users?.name,
      avatar: a.users?.avatar_url,
      // Ideally, a cron/trigger would compute these and store in `skill_growth_summary` table per Part 4 - 7.3
      avg_concept: 0,
      avg_thinking: 0,
      avg_application: 0,
      avg_communication: 0
    })) || [];

    return NextResponse.json({
      success: true,
      stats,
      pending_reviews: pendingReviews,
      student_skill_table: studentSkillTable
    });

  } catch (err) {
    console.error("[API Error] GET /mentor/dashboard", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
