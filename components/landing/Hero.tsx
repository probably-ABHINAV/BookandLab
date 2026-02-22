"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Combine } from "lucide-react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.6 } }
  } as any;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#F8F9FB]">
      
      {/* Very subtle animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-200/50 blur-[120px]" 
        />
        <motion.div 
           animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
           className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-200/40 blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Text & CTAs */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col text-center lg:text-left"
          >
            {/* Highlight Pill */}
            <motion.div variants={itemVariants} className="inline-flex self-center lg:self-start items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100/60 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                30% Concept • 70% Real Learning
              </span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-6">
              Learn by Doing.<br />
              <span className="text-[#1E2A5A] opacity-90">Not by Memorizing.</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p variants={itemVariants} className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
              A structured digital school for Classes 6–10 where students understand concepts, apply them through projects, and grow real skills.
            </motion.p>
            
            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/handler/sign-up" 
                className="w-full sm:w-auto px-8 py-4 text-[17px] font-bold text-white bg-indigo-700 rounded-xl hover:bg-indigo-800 transition-colors shadow-lg shadow-indigo-700/20"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/handler/sign-in" 
                className="w-full sm:w-auto px-8 py-4 text-[17px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
          
          {/* RIGHT: Abstract UI Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block h-[560px] w-full"
          >
             <div className="absolute inset-0 bg-white rounded-[32px] shadow-2xl shadow-indigo-900/5 border border-slate-100 overflow-hidden">
                {/* Academic Backdrop Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(#1E2A5A_1px,transparent_1px),linear-gradient(90deg,#1E2A5A_1px,transparent_1px)] [background-size:20px_20px]"></div>
                
                {/* Mock Header */}
                <div className="absolute top-0 w-full h-16 border-b border-slate-100 bg-white/80 backdrop-blur-sm z-10 flex items-center px-6 gap-4">
                  <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center"><BookOpen className="w-4 h-4 text-indigo-700" /></div>
                  <div className="w-32 h-4 bg-slate-100 rounded-full"></div>
                  <div className="ml-auto w-10 h-10 rounded-full bg-slate-50 border border-slate-200"></div>
                </div>

                <div className="absolute top-24 left-8 right-8 z-10 flex flex-col gap-6">
                  
                  {/* Floating Project Card */}
                  <motion.div 
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="w-20 h-5 bg-teal-50 rounded text-[10px] font-bold text-teal-700 flex items-center justify-center uppercase tracking-wider mb-2">In Progress</div>
                        <div className="w-48 h-6 bg-slate-800 rounded-md"></div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center"><Combine className="w-5 h-5 text-amber-600" /></div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                      <div className="bg-indigo-600 h-2 rounded-full w-[60%]"></div>
                    </div>
                    <div className="text-[11px] font-medium text-slate-400">Step 3 of 5: Real World Application</div>
                  </motion.div>

                  {/* Skill Growth Bars Overlay */}
                  <motion.div 
                    animate={{ y: [4, -4, 4] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="bg-[#1E2A5A] rounded-2xl p-6 shadow-xl shadow-[#1E2A5A]/20 transform rotate-1 ml-12"
                  >
                    <div className="flex items-center gap-3 mb-6">
                       <TrendingUp className="w-5 h-5 text-teal-400" />
                       <div className="text-sm font-bold text-white tracking-wide">SKILL GROWTH</div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Bar 1 */}
                      <div>
                        <div className="flex justify-between mb-1.5"><span className="text-[11px] font-medium text-slate-300">Analytical Thinking</span><span className="text-[11px] font-bold text-white">+15</span></div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5"><motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 1.5, delay: 0.5 }} className="bg-teal-400 h-1.5 rounded-full"></motion.div></div>
                      </div>
                      {/* Bar 2 */}
                      <div>
                        <div className="flex justify-between mb-1.5"><span className="text-[11px] font-medium text-slate-300">Practical Application</span><span className="text-[11px] font-bold text-white">+25</span></div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5"><motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1.5, delay: 0.7 }} className="bg-amber-400 h-1.5 rounded-full"></motion.div></div>
                      </div>
                    </div>
                  </motion.div>

                </div>
             </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
