import { requireRole } from "@/lib/rbac/roles";
import { getMentorDashboardData } from "@/lib/services/mentor";
import Link from "next/link";
import { Clock, MessageSquare, UserCircle } from "lucide-react";

export default async function MentorDashboard() {
  const user = await requireRole(["MENTOR"]);
  const { students, pendingProjects, pendingReflections } = await getMentorDashboardData(user.id, user.team_id);
  
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="border-b border-emerald-200 pb-4">
        <h1 className="text-3xl font-bold text-emerald-900">Mentor Dashboard</h1>
        <p className="text-emerald-700 mt-2">Welcome, {user?.name || user?.email}</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Pending Project Reviews
              </h2>
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                {pendingProjects.length}
              </span>
            </div>
            
            {pendingProjects.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-500">
                You're all caught up! No projects pending review.
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingProjects.map((p: any) => {
                  const student = students.find((s: any) => s.id === p.user_id);
                  return (
                    <div key={p.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                      <div className="p-4 border-b flex flex-row items-start justify-between bg-slate-50/50">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{p.projects?.chapters?.name || 'Project Review'}</h3>
                          <p className="text-sm text-slate-500">Submitted by {student?.email}</p>
                        </div>
                        <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
                          {p.projects?.type || 'PROJECT'}
                        </span>
                      </div>
                      <div className="p-4 flex justify-between items-center bg-white">
                        <span className="text-sm text-slate-500">
                          {new Date(p.submitted_at).toLocaleDateString()}
                        </span>
                        <Link href={`/mentor/review/project/${p.id}`} className="text-emerald-600 font-medium hover:underline text-sm">
                          Start Review &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-center justify-between mb-4 mt-8">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Pending Reflections
              </h2>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                {pendingReflections.length}
              </span>
            </div>
            
            {pendingReflections.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-500">
                No reflection debriefs awaiting review.
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingReflections.map((r: any) => {
                  const student = students.find((s: any) => s.id === r.user_id);
                  return (
                    <div key={r.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                      <div className="p-4 flex flex-row items-center justify-between bg-slate-50/50">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{r.reflections?.chapters?.name || 'Reflection'}</h3>
                          <p className="text-sm text-slate-500">Submitted by {student?.email}</p>
                        </div>
                        <Link href={`/mentor/review/reflection/${r.id}`} className="text-blue-600 font-medium hover:underline text-sm">
                          Review &rarr;
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
        
        <aside>
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-emerald-50 border-b border-emerald-100">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
                <UserCircle className="w-5 h-5 text-emerald-600" />
                Assigned Students
              </h3>
              <p className="text-sm text-slate-600 mt-1">Your cohort currently has {students.length} active students.</p>
            </div>
            <div className="p-0 divide-y divide-emerald-50">
              {students.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm">No students assigned yet.</div>
              ) : (
                students.map((student: any) => (
                  <div key={student.id} className="p-4 hover:bg-slate-50 flex items-center justify-between group transition-colors">
                    <div className="font-medium text-sm truncate pr-4 text-slate-700">{student.email}</div>
                    <Link href={`/mentor/student/${student.id}`} className="text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Profile
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
