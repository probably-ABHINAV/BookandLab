"use client";

import { Bell, User, LogOut } from "lucide-react";
import { NotificationClient } from "@/components/shared/NotificationClient";
import { useState } from "react";

export function DashboardHeader({ 
  user, 
  role, 
  initialNotifications, 
  initialUnreadCount 
}: { 
  user: any, 
  role: string,
  initialNotifications: any[],
  initialUnreadCount: number
}) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          role === "ADMIN" ? "bg-indigo-100 text-indigo-700" : 
          role === "MENTOR" ? "bg-emerald-100 text-emerald-700" : 
          "bg-blue-100 text-blue-700"
        }`}>
          {role} Account
        </span>
      </div>

      <div className="flex items-center gap-4">
        <NotificationClient 
          userId={user.id} 
          teamId={user.team_id}
          initialNotifications={initialNotifications}
          initialUnreadCount={initialUnreadCount}
        />
        
        <div className="h-8 w-px bg-slate-200 mx-2" />
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">{user.name || user.email?.split("@")[0]}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">{user.email}</p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 shadow-inner">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
