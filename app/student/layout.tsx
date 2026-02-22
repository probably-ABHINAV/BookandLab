import { requireRole } from "@/lib/rbac/roles";
import { redirect } from "next/navigation";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireRole(["STUDENT"]);
  } catch {
    redirect("/403");
  }

  return <div className="min-h-screen bg-slate-50">{children}</div>;
}
