import { requireRole } from "@/lib/rbac/roles";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Star, Settings, Bell, GraduationCap, Trophy } from "lucide-react";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { getUserNotifications, getUnreadCount } from "@/lib/services/notifications";
import { getStudentGamification } from "@/lib/services/student";
import { MobileNav } from "@/components/shared/MobileNav";

const NAV_ITEMS = [
  { href: "/student/dashboard", label: "Home", icon: "LayoutDashboard" },
  { href: "/student/subjects", label: "My Subjects", icon: "BookOpen" },
  { href: "/student/skills", label: "My Skills", icon: "Star" },
  { href: "/student/notifications", label: "Notifications", icon: "Bell" },
  { href: "/student/settings", label: "Settings", icon: "Settings" },
];

const ICON_MAP: Record<string, any> = {
  LayoutDashboard, BookOpen, Star, Settings, Bell,
};

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["STUDENT"]);
  if (!user) redirect("/403");

  // Fetch notifications for the header
  const initialNotifications = await getUserNotifications(user.id, user.team_id, 5);
  const initialUnreadCount = await getUnreadCount(user.id, user.team_id);
  const gamification = await getStudentGamification(user.id);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-900 to-slate-900 text-white flex flex-col shrink-0 sticky top-0 h-screen hidden lg:flex">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-white">BookandLab</h2>
              <p className="text-[10px] text-indigo-300 font-black uppercase tracking-[0.2em] mt-0.5">Student Module</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-indigo-100/80 hover:bg-white/10 hover:text-white transition-colors"
              >
                {Icon && <Icon className="w-5 h-5" />}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 text-center group cursor-default">
            <div className="relative inline-block">
               <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-3 animate-pulse" />
               <div className="absolute -top-1 -right-1 bg-indigo-500 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-indigo-400">LVL {gamification.level}</div>
            </div>
            <p className="text-[10px] text-indigo-200 font-black uppercase tracking-widest mb-1">Explorer Mastery</p>
            <p className="text-xl font-black text-white">{gamification.totalXP} <span className="text-xs text-indigo-300 font-bold uppercase">XP</span></p>
            
            <div className="h-2 w-full bg-white/10 rounded-full mt-4 overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-indigo-400 transition-all duration-1000" 
                style={{ width: `${gamification.levelProgress}%` }}
              />
            </div>
            <p className="text-[9px] text-indigo-300 font-bold uppercase tracking-tight mt-2">{gamification.levelProgress}% to Level {gamification.level + 1}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader 
          user={user} 
          role="STUDENT" 
          initialNotifications={initialNotifications}
          initialUnreadCount={initialUnreadCount}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
        {/* Mobile Navigation Trigger (Fixed Bottom / Top depends on MobileNav impl) */}
        <MobileNav user={user} role="STUDENT" items={NAV_ITEMS} gamification={gamification} />
      </div>
    </div>
  );
}
