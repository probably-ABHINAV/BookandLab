"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  Star,
  Bell,
  Settings,
  Trophy,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav({
  user,
  role,
  items,
  gamification,
}: {
  user: any;
  role: string;
  items: any[];
  gamification?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const ICON_MAP: Record<string, any> = {
    LayoutDashboard,
    BookOpen,
    Star,
    Settings,
    Bell,
  };

  // ✅ Logout function
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      document.cookie =
        "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (err) {
      console.log("Logout cleanup error", err);
    }

    window.location.href = "/login";
  };

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.4)] border-2 border-white/10 flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-all outline-none"
        aria-label="Open Menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            />

            {/* Side Menu */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#141522] text-slate-300 z-[70] shadow-2xl flex flex-col overflow-hidden border-l border-slate-800"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800/80 flex items-center justify-between shrink-0">
                <div className="flex flex-col">
                  <span className="text-white font-extrabold text-xl tracking-tight whitespace-nowrap">
                    book and lab
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">
                    Student
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu */}
              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                <div className="p-4 space-y-1 mt-2">
                  <div className="text-[10px] font-bold text-slate-500 mb-3 px-3 uppercase tracking-widest">
                    Menu
                  </div>

                  {items.map((item) => {
                    const Icon = ICON_MAP[item.icon] || LayoutDashboard;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all group"
                      >
                        <Icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Gamification */}
                {role === "STUDENT" && gamification && (
                  <div className="p-5 mt-auto">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shrink-0">
                          <div className="w-full h-full bg-[#141522] rounded-full flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-amber-400" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Level {gamification.level}
                          </h4>
                          <span className="text-[10px] text-amber-400 font-black">
                            {gamification.totalXP} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ✅ Logout Footer */}
              <div className="p-4 border-t border-slate-800/80 shrink-0">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-rose-500/10 text-rose-400 text-sm font-bold hover:bg-rose-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
