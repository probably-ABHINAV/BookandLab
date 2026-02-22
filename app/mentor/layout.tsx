import { requireRole } from "@/lib/rbac/roles";
import { redirect } from "next/navigation";

export default async function MentorLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireRole(["MENTOR", "ADMIN"]); // Admins can also view mentor areas if needed
  } catch {
    redirect("/403");
  }

  return <div className="min-h-screen bg-emerald-50">{children}</div>;
}
