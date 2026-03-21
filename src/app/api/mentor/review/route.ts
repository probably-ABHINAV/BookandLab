import { requireRole } from "@/lib/rules/authRule";
import { validateBody, mentorReviewSchema } from "@/lib/validations/schemas";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { calculateSkillAverages } from "@/lib/rules/calculationEngine";

export async function POST(req: Request) {
  const { error: authErr, user } = await requireRole(req as any, "mentor");
  if (authErr) return authErr;
  const mentorId = user.id;

  const { data, error: valErr } = await validateBody(req, mentorReviewSchema);
  if (valErr) return valErr;

  const supabase = createServerSupabaseClient();

  // BOLA CHECK — verify mentor is assigned to this student
  const { data: sub } = await supabase
    .from("project_submissions").select("id, user_id, status")
    .eq("id", data.submission_id).single();
  if (!sub) return Response.json({ error: "Not found" }, { status: 404 });

  const { data: assignment } = await supabase
    .from("mentor_assignments").select("id")
    .eq("mentor_id", mentorId).eq("student_id", sub.user_id)
    .eq("is_active", true).single();
  if (!assignment) return Response.json({ error: "Not found" }, { status: 404 });

  if (sub.status === "reviewed")
    return Response.json({ error: "Already reviewed" }, { status: 409 });

  // Insert review
  const { data: review, error } = await supabase
    .from("mentor_reviews")
    .insert({ ...data, mentor_id: mentorId })
    .select().single();
  if (error) return Response.json({ error: "Save failed" }, { status: 500 });

  // Update submission status
  await supabase.from("project_submissions").update({
    status: data.is_resubmit_requested ? "resubmit" : "reviewed",
    reviewed_at: new Date().toISOString(),
  }).eq("id", data.submission_id);

  // Notify student
  await supabase.from("notifications").insert({
    user_id: sub.user_id,
    type: "review_complete",
    title: "Your project has been reviewed",
    body: "Check your Skills page for scores and feedback.",
  });

  return Response.json({ success: true, review_id: review.id });
}
