"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap, LayoutDashboard, BookOpen, Star, Bell, Settings, Trophy, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNav({ user, role, items, gamification }: { 
  user: any; 
  role: string; 
  items: any[]; 
  gamification?: any 
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Map icons to names to match layout
  const ICON_MAP: Record<string, any> = {
    LayoutDashboard, BookOpen, Star, Settings, Bell,
  };

  return (
    <div className="lg:hidden">
      {/* Floating Action Button for Menu */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all outline-none"
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
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            />

            {/* Side Menu */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-indigo-900 text-white z-[70] shadow-2xl flex flex-col overflow-y-auto"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold tracking-tight">BookandLab</h2>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 p-6 space-y-4">
                {items.map((item) => {
                  const Icon = ICON_MAP[item.icon] || LayoutDashboard;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors text-lg font-bold"
                    >
                      <Icon className="w-6 h-6 text-indigo-300" />
                      {item.label}
                    </Link>
                  );
                })}

                {role === "STUDENT" && gamification && (
                  <div className="mt-8 bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center">
                    <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                    <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest mb-1">Explorer Level {gamification.level}</p>
                    <p className="text-2xl font-black text-white">{gamification.totalXP} XP</p>
                    <div className="h-2 w-full bg-white/10 rounded-full mt-4 overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-amber-400" 
                        style={{ width: `${gamification.levelProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/10 mt-auto">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-400/10 text-red-300 font-bold">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
