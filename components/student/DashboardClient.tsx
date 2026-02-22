"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, PlayCircle, Star, ChevronRight, Award } from "lucide-react";

export function DashboardClient({ user, data }: { user: any, data: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 15 } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* 1. Dashboard Header */}
      <motion.header variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Focus & Growth</h1>
          <p className="text-lg text-slate-500 mt-2">
            Welcome back, <span className="font-semibold text-slate-800">{user.name || "Student"}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-200 hover:text-indigo-700 transition-colors border border-transparent hover:border-slate-300">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          {/* Active Tags / Phase 2 placeholder */}
          <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100 cursor-default">
            Explorer Level 1
          </motion.span>
          <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100 cursor-default">
            Thinker
          </motion.span>
        </div>
      </motion.header>
      
      {/* 2. Resume Learning (The Hook) */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <PlayCircle className="text-emerald-500" />
          Jump Back In
        </h2>
        
        {data.resumeState ? (
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[2rem] p-6 md:p-8 text-white shadow-xl shadow-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group border border-emerald-500/50"
          >
            {/* Subtle light effect on hover */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10">
              <span className="text-emerald-100 text-sm font-black uppercase tracking-widest mb-2 block">
                In Progress
              </span>
              <h3 className="text-3xl font-extrabold mb-2 tracking-tight">{data.resumeState.chapter?.name}</h3>
              <p className="text-emerald-50 opacity-90 font-medium">
                Step {data.resumeState.step?.number}: Focus and complete the challenge.
              </p>
            </div>
            
            <Link 
              href={`/student/chapters/${data.resumeState.chapter?.id}?step=${data.resumeState.step?.number}`}
              className="relative z-10 px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg flex items-center gap-2 shrink-0 group-hover:shadow-emerald-900/20"
            >
              Resume Step {data.resumeState.step?.number}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-700 mb-2">No active chapter found</h3>
            <p className="text-slate-500 font-medium mb-4">Start a new chapter from your subjects below.</p>
          </div>
        )}
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Subjects & Curriculum */}
        <motion.section variants={itemVariants} className="col-span-1 lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="text-indigo-500 w-5 h-5" />
            My Curriculum
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.subjects.length > 0 ? data.subjects.map((subject: any, idx: number) => (
              <Link href={`/student/subjects/${subject.id}`} key={subject.id} className="block group h-full">
                <motion.div 
                  whileHover={{ y: -6 }}
                  className="bg-white border border-slate-200 rounded-[1.5rem] p-6 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all flex flex-col h-full relative overflow-hidden"
                >
                  {/* Subtle top border highlight on hover */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                      {subject.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mt-auto">
                    <div className="flex justify-between text-sm text-slate-500 font-bold uppercase tracking-wider">
                      <span>Progress</span>
                      <span>{subject.completedChapters} / {subject.totalChapters} Ch</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progressPct}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            )) : (
              <div className="col-span-full bg-slate-50 p-8 rounded-[1.5rem] text-center border border-slate-200">
                <p className="text-slate-500 font-medium">No subjects assigned yet.</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* 4. Skill Snapshot & Feedback */}
        <motion.div variants={itemVariants} className="space-y-8">
          <section className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background artifact */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] opacity-40 mix-blend-screen"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <Award className="text-amber-400 w-6 h-6" />
                Skill Snapshot
              </h2>
              <Link href="/student/skills" className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider underline underline-offset-4">
                Details
              </Link>
            </div>
            
            <div className="space-y-5 relative z-10">
              {Object.entries(data.skills).map(([skill, value]: [string, any], idx) => (
                <div key={skill} className="space-y-2 group">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-300 text-left">
                    <span className="group-hover:text-white transition-colors">{skill}</span>
                    <span className="text-amber-400 font-bold py-0.5 px-2 bg-amber-400/10 rounded-md">+{value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(value * 2, 100)}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 + (idx * 0.1) }}
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <motion.section 
            whileHover={{ y: -4 }}
            className="bg-white border border-rose-100 rounded-[2rem] p-8 shadow-lg shadow-rose-100/50 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-200 rounded-full blur-[60px] opacity-40"></div>
            <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
              <Star className="text-rose-500 w-6 h-6 fill-rose-100" />
              Latest Feedback
            </h2>
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-6 text-sm text-slate-700 border border-rose-100 relative z-10 shadow-sm">
              <p className="italic leading-relaxed font-medium text-base">
                "Excellent critical thinking shown on the latest project. Try to visually document your steps next time..."
              </p>
              <div className="mt-4 flex items-center gap-3 text-rose-600 font-bold text-xs uppercase tracking-wider">
                <div className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-rose-700 shadow-sm">M</div>
                Mentor Review
              </div>
            </div>
          </motion.section>
        </motion.div>

      </div>
    </motion.div>
  );
}
