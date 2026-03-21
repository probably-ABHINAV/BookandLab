import { requireRole } from "@/lib/rules/authRule";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { error, user } = await requireRole(request, "student");
  if (error) return error;

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return Response.json({ notifications: data });
}
