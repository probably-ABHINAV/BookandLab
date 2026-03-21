import { z } from "zod";

// ── STUDENT ───────────────────────────────
export const stepCompleteSchema = z.object({
  chapter_id: z.string().uuid(),
  step: z.number().int().min(1).max(6),
  response: z.string().max(5000).optional(),
});

export const projectSubmitSchema = z.object({
  chapter_id: z.string().uuid(),
  text_answer: z.string().min(10, "Min 10 chars").max(10000),
  reflection: z.string().min(5).max(5000).optional(),
});

export const weeklyTargetSchema = z.object({
  weekly_target: z.number().int().min(1).max(14),
});

// ── MENTOR ────────────────────────────────
export const mentorReviewSchema = z.object({
  submission_id: z.string().uuid(),
  concept_clarity: z.number().int().min(1).max(5),
  critical_thinking: z.number().int().min(1).max(5),
  application: z.number().int().min(1).max(5),
  communication: z.number().int().min(1).max(5),
  comment: z.string().min(20, "Min 20 chars").max(2000),
  is_resubmit_requested: z.boolean().default(false),
});

// ── ADMIN ─────────────────────────────────
export const createChapterSchema = z.object({
  subject_id: z.string().uuid(),
  unit_id: z.string().uuid().optional(),
  prerequisite_chapter_id: z.string().uuid().nullable().optional(),
  title: z.string().min(3).max(200),
  description: z.string().max(500).optional(),
  order_index: z.number().int().min(0),
  estimated_minutes: z.number().int().min(10).max(300).default(45),
});

export const assignMentorSchema = z.object({
  mentor_id: z.string().uuid(),
  student_id: z.string().uuid(),
});

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(["student", "mentor", "admin"]),
  plan_name: z.enum(["starter", "standard", "premium"]).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export const extendSubscriptionSchema = z.object({
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
});

import { NextResponse } from "next/server";

// ── GENERIC HELPER ────────────────────────
export async function validateBody<T>(req: Request, schema: z.ZodSchema<T>) {
  try {
    const body = await req.json().catch(() => ({}));
    const data = schema.parse(body);
    return { data: data as T, error: null };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { data: null, error: NextResponse.json({ error: "Validation failed", details: err.issues }, { status: 422 }) };
    }
    return { data: null, error: NextResponse.json({ error: "Invalid JSON or missing fields" }, { status: 400 }) };
  }
}
