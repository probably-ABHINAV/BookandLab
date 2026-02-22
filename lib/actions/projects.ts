"use server";

import { createProtectedAction } from "@/lib/rbac/roles";
import { createAdminClient } from "@/lib/db/supabase";
import { revalidatePath } from "next/cache";

export const submitProjectAction = createProtectedAction(
  ["STUDENT"],
  async (user, formData: FormData) => {
    const projectId = formData.get("projectId") as string;
    const contentText = formData.get("contentText") as string;
    // NOTE: In a full media implementation, you'd handle file uplods to S3/Supabase Storage here
    // and extract the URLs. For this architecture baseline, we'll accept text or a URL string.
    const mediaUrl = formData.get("mediaUrl") as string; 

    if (!projectId) {
      throw new Error("Project ID is required.");
    }
    if (!contentText && !mediaUrl) {
      throw new Error("You must submit either text content or a media URL.");
    }

    const supabase = await createAdminClient();

    // 1. Verify the Project exists
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, chapter_id")
      .eq("id", projectId)
      .single();

    if (projectError || !project) {
      throw new Error("Invalid project reference.");
    }

    // 2. Check for an existing APPROVED submission to prevent tampering
    const { data: existing } = await supabase
      .from("project_submissions")
      .select("status")
      .eq("project_id", projectId)
      .eq("user_id", user.id)
      .single();

    if (existing && existing.status === "APPROVED") {
      throw new Error("This project has already been approved and is immutable.");
    }

    // 3. Upsert the Submission securely locked to the student's team_id
    const { error: upsertError } = await supabase
      .from("project_submissions")
      .upsert(
        {
          project_id: projectId,
          user_id: user.id,
          team_id: user.team_id,
          content_text: contentText || null,
          media_urls: mediaUrl ? [mediaUrl] : null,
          status: "PENDING", // Always resets to PENDING on new submission
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id, project_id' }
      );

    if (upsertError) {
      console.error("[submitProjectAction] Upsert Error:", upsertError);
      throw new Error("Failed to save project submission.");
    }

    // 4. Mark Step 5 (Project) as COMPLETED to unlock Step 6
    const { data: step5 } = await supabase
      .from("chapter_steps")
      .select("id")
      .eq("chapter_id", project.chapter_id)
      .eq("step_number", 5)
      .single();

    if (step5) {
      await supabase.from("step_progress").upsert({
        user_id: user.id,
        step_id: step5.id,
        status: "COMPLETED",
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id, step_id' });
    }

    revalidatePath(`/student/chapters/${project.chapter_id}`);
    revalidatePath(`/student/dashboard`);

    return { success: true, message: "Project submitted successfully pending mentor review." };
  }
);
