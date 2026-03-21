import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rules/authRule";
import { validateBody } from "@/lib/validations/schemas";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { z } from "zod";

const updateChapterSchema = z.object({
  is_published: z.boolean().optional(),
  title: z.string().min(3).max(200).optional(),
  order_index: z.number().int().min(0).optional(),
  prerequisite_chapter_id: z.string().uuid().nullable().optional(),
  deleted_at: z.string().optional() // Soft delete
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error: authErr, user } = await requireRole(request, "admin");
  if (authErr) return authErr;
  const chapterId = params.id;

  const { data, error: valErr } = await validateBody(request, updateChapterSchema);
  if (valErr) return valErr;

  const supabase = createServerSupabaseClient();
  try {
    // Audit before update
    const { data: oldData } = await supabase.from("chapters").select("*").eq("id", chapterId).single();

    const { data: chapter, error } = await supabase
      .from("chapters")
      .update(data)
      .eq("id", chapterId)
      .select()
      .single();

    if (error) throw error;

    await supabase.from("audit_log").insert({
      table_name: "chapters",
      record_id: chapterId,
      action: "UPDATE",
      old_data: oldData,
      new_data: chapter,
      changed_by: user!.id
    });

    return NextResponse.json({ success: true, chapter });
  } catch (err) {
    console.error("[API Error] PATCH /admin/chapter/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
