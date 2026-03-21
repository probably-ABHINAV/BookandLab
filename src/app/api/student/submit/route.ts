import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rules/authRule";
import { subscriptionRule } from "@/lib/rules/subscriptionRule";
import { validateBody, projectSubmitSchema } from "@/lib/validations/schemas";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const { error: authErr, user } = await requireRole(request, "student");
  if (authErr) return authErr;
  const userId = user!.id;

  const { data, error: valErr } = await validateBody(request, projectSubmitSchema);
  if (valErr) return valErr;

  const { error: subErr } = await subscriptionRule(userId);
  if (subErr) return subErr;

  const supabase = await createServerSupabaseClient();
  try {
    // 1. Insert structured submission
    const { data: submission, error: subError } = await supabase
      .from("project_submissions")
      .insert({
        user_id: userId,
        chapter_id: data.chapter_id,
        text_answer: data.text_answer,
        reflection: data.reflection,
        status: "pending_review",
        submitted_at: new Date().toISOString()
      })
      .select()
      .single();

    if (subError) throw subError;

    // 2. Find assigned mentor for this student
    const { data: assignment } = await supabase
      .from("mentor_assignments")
      .select("mentor_id")
      .eq("student_id", userId)
      .eq("is_active", true)
      .single();

    if (assignment) {
      // 3. Notify the mentor
      await supabase.from("notifications").insert({
        user_id: assignment.mentor_id,
        type: "new_submission",
        title: "New Student Submission",
        body: `A student has submitted a project for review.`,
        metadata: { submission_id: submission.id }
      });
    }

    return NextResponse.json({ success: true, submission_id: submission.id });
  } catch (err) {
    console.error("[API Error] POST /student/submit", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
