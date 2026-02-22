"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function Header({ user, role }: { user: any | null, role?: string | null }) {
  const getDashboardLink = () => {
    if (!user) return "/handler/sign-up";
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "MENTOR") return "/mentor/dashboard";
    return "/student/dashboard";
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <BookOpen className="w-7 h-7 text-indigo-700" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900 tracking-tight leading-none group-hover:text-indigo-700 transition-colors">BookandLab</span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wide uppercase mt-0.5">Digital School System</span>
          </div>
        </Link>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors">How It Works</Link>
          <Link href="#learning-model" className="text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors">Learning Model</Link>
          <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link 
                href="/account" 
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Account
              </Link>
              <Link 
                href={getDashboardLink()} 
                className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 shadow-sm transition-all"
              >
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/handler/sign-in" 
                className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/handler/sign-up" 
                className="px-5 py-2 text-sm font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 shadow-sm transition-all"
              >
                Start Free Trial
              </Link>
            </>
          )}
        </div>

      </div>
    </motion.header>
  );
}
