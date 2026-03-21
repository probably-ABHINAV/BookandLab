import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rules/authRule";
import { validateBody, createChapterSchema } from "@/lib/validations/schemas";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { error: authErr, user } = await requireRole(request, "admin");
  if (authErr) return authErr;

  const { data, error: valErr } = await validateBody<z.infer<typeof createChapterSchema>>(request, createChapterSchema);
  if (valErr) return valErr;

  const supabase = await createServerSupabaseClient(); // Assuming configured with service_role if needed, or RLS allows given user role 'admin'
  try {
    // Insert chapter
    const { data: chapter, error } = await supabase
      .from("chapters")
      .insert({
        ...(data as any),
        is_published: false
      })
      .select()
      .single();

    if (error) throw error;

    // Log action to audit
    await supabase.from("audit_log").insert({
      table_name: "chapters",
      record_id: chapter.id,
      action: "INSERT",
      new_data: chapter,
      changed_by: user!.id
    });

    return NextResponse.json({ success: true, chapter });
  } catch (err) {
    console.error("[API Error] POST /admin/chapter", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
