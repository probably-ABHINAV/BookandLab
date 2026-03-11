"use client";

import { useState, useEffect, useCallback } from "react";
import { markNotificationReadAction, markAllNotificationsReadAction, fetchNotificationsAction } from "@/lib/actions/notifications";
import { Bell, CheckCheck, Circle, Clock, FileText, Users, BookOpen, Shield, TrendingUp } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  REVIEW_COMPLETED: TrendingUp,
  PROJECT_SUBMITTED: FileText,
  MENTOR_ASSIGNED: Users,
  CHAPTER_UNLOCKED: BookOpen,
  ADMIN_ANNOUNCEMENT: Shield,
  ROLE_CHANGED: Shield,
  SUBMISSION_STATUS: FileText,
};

const COLOR_MAP: Record<string, string> = {
  REVIEW_COMPLETED: "text-emerald-600 bg-emerald-50",
  PROJECT_SUBMITTED: "text-blue-600 bg-blue-50",
  MENTOR_ASSIGNED: "text-indigo-600 bg-indigo-50",
  CHAPTER_UNLOCKED: "text-amber-600 bg-amber-50",
  ADMIN_ANNOUNCEMENT: "text-purple-600 bg-purple-50",
  ROLE_CHANGED: "text-rose-600 bg-rose-50",
  SUBMISSION_STATUS: "text-sky-600 bg-sky-50",
};

export function NotificationClient({ userId, teamId, initialNotifications, initialUnreadCount }: {
  userId: string;
  teamId: string;
  initialNotifications: any[];
  initialUnreadCount: number;
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);

  const poll = useCallback(async () => {
    try {
      const { notifications: fresh, unreadCount: count } = await fetchNotificationsAction(userId, teamId);
      setNotifications(fresh);
      setUnreadCount(count);
    } catch {}
  }, [userId, teamId]);

  useEffect(() => {
    const interval = setInterval(poll, 12000);
    return () => clearInterval(interval);
  }, [poll]);

  async function handleMarkRead(id: string) {
    const fd = new FormData();
    fd.append("notificationId", id);
    await markNotificationReadAction(fd);
    setNotifications(n => n.map(x => x.id === id ? { ...x, is_read: true } : x));
    setUnreadCount(c => Math.max(0, c - 1));
  }

  async function handleMarkAll() {
    await markAllNotificationsReadAction(new FormData());
    setNotifications(n => n.map(x => ({ ...x, is_read: true })));
    setUnreadCount(0);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-indigo-600" />
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
              {unreadCount} unread
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAll} className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-16 text-center">
          <Bell className="w-14 h-14 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">All caught up!</h3>
          <p className="text-slate-500 mt-1">No notifications at the moment.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n: any) => {
            const Icon = ICON_MAP[n.type] || Bell;
            const colors = COLOR_MAP[n.type] || "text-slate-600 bg-slate-50";
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  n.is_read
                    ? "bg-white border-slate-100 opacity-70"
                    : "bg-white border-indigo-100 shadow-sm hover:shadow-md"
                }`}
                onClick={() => !n.is_read && handleMarkRead(n.id)}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${colors}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${n.is_read ? "text-slate-500" : "text-slate-800 font-semibold"}`}>
                    {n.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{new Date(n.created_at).toLocaleString()}</span>
                  </div>
                </div>
                {!n.is_read && <Circle className="w-3 h-3 text-indigo-500 fill-indigo-500 shrink-0 mt-1.5" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
