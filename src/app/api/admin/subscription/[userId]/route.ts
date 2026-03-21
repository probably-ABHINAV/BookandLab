import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rules/authRule";
import { validateBody, extendSubscriptionSchema } from "@/lib/validations/schemas";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { error: authErr, user } = await requireRole(request, "admin");
  if (authErr) return authErr;
  const targetUserId = params.userId;

  const { data, error: valErr } = await validateBody(request, extendSubscriptionSchema);
  if (valErr) return valErr;

  const supabase = createServerSupabaseClient();
  try {
    // Find latest sub
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("id, end_date")
      .eq("user_id", targetUserId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!sub) return NextResponse.json({ error: "No subscription found" }, { status: 404 });

    const { error } = await supabase
      .from("subscriptions")
      .update({
        end_date: data.end_date,
        status: "active"
      })
      .eq("id", sub.id);

    if (error) throw error;

    await supabase.from("audit_log").insert({
      table_name: "subscriptions",
      record_id: sub.id,
      action: "UPDATE",
      old_data: sub,
      new_data: { end_date: data.end_date, status: "active" },
      changed_by: user!.id
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API Error] PATCH /admin/subscription/[userId]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
