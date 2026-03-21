import { requireRole } from "@/lib/rules/authRule";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error: authErr, user } = await requireRole(request, "mentor");
  if (authErr) return authErr;

  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  // Get submission + student info + chapter title
  const { data: submission } = await supabase
    .from("project_submissions")
    .select(`
      *,
      users!user_id(id, name, email),
      chapters!chapter_id(title, subject_id, subjects(name))
    `)
    .eq("id", id)
    .single();

  if (!submission) return Response.json({ error: "Not found" }, { status: 404 });

  // BOLA: mentor must be assigned to this student
  const { data: assignment } = await supabase
    .from("mentor_assignments")
    .select("id")
    .eq("mentor_id", user!.id)
    .eq("student_id", submission.user_id)
    .eq("is_active", true)
    .single();

  if (!assignment) return Response.json({ error: "Not found" }, { status: 404 });

  // Get previous reviews for this student (for context)
  const prevSubIds = await supabase
    .from("project_submissions")
    .select("id")
    .eq("user_id", submission.user_id)
    .neq("id", id);

  const { data: previousReviews } = await supabase
    .from("mentor_reviews")
    .select("*, project_submissions(chapters(title))")
    .in("submission_id", (prevSubIds.data||[]).map(s=>s.id))
    .eq("mentor_id", user!.id)
    .order("reviewed_at", { ascending: false })
    .limit(5);

  return Response.json({ submission, previous_reviews: previousReviews || [] });
}
