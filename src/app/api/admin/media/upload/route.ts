import { requireRole } from "@/lib/rules/authRule";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { error: authErr, user } = await requireRole(request, "admin");
  if (authErr) return authErr;

  const formData = await request.formData();
  const file = formData.get("file");
  const subject_tag = formData.get("subject_tag") as string || "";

  if (!file || !(file as any).size)
    return Response.json({ error: "No file provided" }, { status: 400 });

  const f = file as File;

  // Validate file type
  const allowed = ["image/png","image/jpeg","image/jpg","image/svg+xml","image/webp","application/pdf","video/mp4","video/webm"];
  if (!allowed.includes(f.type))
    return Response.json({ error: "File type not allowed" }, { status: 422 });

  // Validate size (50MB)
  if (f.size > 52428800)
    return Response.json({ error: "File too large (max 50MB)" }, { status: 422 });

  // Determine bucket
  const bucket = f.type.startsWith("image") ? "chapter-images"
    : f.type === "application/pdf" ? "chapter-pdfs" : "chapter-videos";

  // Determine file type category
  const fileType = f.type.startsWith("image") ? "image"
    : f.type === "application/pdf" ? "pdf" : "video";

  // Build storage path: subject/timestamp-filename
  const timestamp = Date.now();
  const cleanName = f.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const storagePath = subject_tag
    ? `${subject_tag.toLowerCase()}/${timestamp}-${cleanName}`
    : `general/${timestamp}-${cleanName}`;

  // Upload to Supabase Storage (use service role for storage admin)
  const storageClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const arrayBuffer = await f.arrayBuffer();
  const { data: storageData, error: storageErr } = await storageClient.storage
    .from(bucket)
    .upload(storagePath, arrayBuffer, {
      contentType: f.type,
      upsert: false,
    });

  if (storageErr)
    return Response.json({ error: "Upload failed: " + storageErr.message }, { status: 500 });

  // Get public URL
  const { data: { publicUrl } } = storageClient.storage
    .from(bucket)
    .getPublicUrl(storagePath);

  // Save metadata to media_library table
  const supabase = await createServerSupabaseClient();
  const { data: mediaRecord, error: dbErr } = await supabase
    .from("media_library")
    .insert({
      file_name: f.name,
      file_type: fileType,
      bucket_name: bucket,
      storage_path: storagePath,
      public_url: publicUrl,
      file_size_bytes: f.size,
      subject_tag: subject_tag || null,
      alt_text: f.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      uploaded_by: user!.id,
    })
    .select()
    .single();

  if (dbErr)
    return Response.json({ error: "DB save failed: " + dbErr.message }, { status: 500 });

  return Response.json({ success: true, file: mediaRecord });
}
