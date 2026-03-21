import { requireRole } from "@/lib/rules/authRule";
import { subscriptionRule } from "@/lib/rules/subscriptionRule";
import { validateBody, stepCompleteSchema } from "@/lib/validations/schemas";
import { updateUserStats } from "@/lib/rules/calculationEngine";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { error: authErr, user } = await requireRole(req as any, "student");
  if (authErr) return authErr;
  const userId = user.id;

  const { data, error: valErr } = await validateBody(req, stepCompleteSchema);
  if (valErr) return valErr;

  const { error: subErr } = await subscriptionRule(userId);
  if (subErr) return subErr;

  const supabase = await createServerSupabaseClient();
  const { data: existing } = await supabase
    .from("chapter_progress").select("*")
    .eq("user_id", userId).eq("chapter_id", data.chapter_id).single();

  const steps = existing?.steps_completed ?? [];
  if (!steps.includes(data.step)) steps.push(data.step);
  steps.sort((a: number, b: number) => a - b);

  const isComplete = steps.length >= 6;

  await supabase.from("chapter_progress").upsert({
    user_id: userId,
    chapter_id: data.chapter_id,
    current_step: Math.min(data.step + 1, 6),
    steps_completed: steps,
    status: isComplete ? "completed" : "in_progress",
    completed_at: isComplete ? new Date().toISOString() : null,
    last_activity: new Date().toISOString(),
  }, { onConflict: "user_id,chapter_id" });

  // Always update streak + weekly goal
  const stats = await updateUserStats(userId);

  return Response.json({
    success: true,
    chapter_completed: isComplete,
    streak: stats.streak,
    weekly_done: stats.weeklyDone,
  });
}
