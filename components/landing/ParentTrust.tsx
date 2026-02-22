"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, HeartHandshake } from "lucide-react";

export function ParentTrust() {
  return (
    <section className="py-24 bg-[#1E2A5A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Designed for Students.<br />
              <span className="text-indigo-300">Trusted by Parents.</span>
            </h2>
            <p className="text-lg text-indigo-100/90 leading-relaxed font-medium mb-10 max-w-lg">
              We know the internet can be a distracting place for learning. That’s why BookandLab is engineered to be a calm, focused environment where real academic growth happens.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-indigo-900/50 border border-indigo-700/50 flex flex-shrink-0 items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Guided Screen Time</h4>
                  <p className="text-indigo-200/80 font-medium">No endless scrolling or addictive loops. Concrete start and end points for every study session.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-indigo-900/50 border border-indigo-700/50 flex flex-shrink-0 items-center justify-center">
                  <Target className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Zero Distractions</h4>
                  <p className="text-indigo-200/80 font-medium">An ad-free, locked-down interface. Once they enter a chapter, the focus is entirely on the material.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-indigo-900/50 border border-indigo-700/50 flex flex-shrink-0 items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Expert Human Mentors</h4>
                  <p className="text-indigo-200/80 font-medium">Every project and reflection is reviewed by a real educator, ensuring nuances aren't missed by AI.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative"
          >
             <div className="absolute -top-6 -left-6 md:-left-10 text-8xl text-indigo-100 opacity-50 font-serif">"</div>
             <blockquote className="relative z-10">
               <p className="text-2xl md:text-3xl text-slate-800 font-bold leading-snug mb-8">
                 The structure is incredible. Instead of just passively watching videos and forgetting them, my child is actually <span className="text-indigo-700">building projects and defending their reasoning</span>. It’s like a real digital school.
               </p>
               <footer className="flex items-center gap-4 border-t border-slate-100 pt-6">
                 <div className="w-14 h-14 bg-indigo-50 rounded-full flex flex-shrink-0 flex-col items-center justify-center border border-indigo-100">
                    <span className="text-lg font-bold text-indigo-700">S.</span>
                 </div>
                 <div>
                   <div className="text-lg font-bold text-slate-900">Sarah M.</div>
                   <div className="text-slate-500 font-medium text-sm">Parent of Class 8 Student</div>
                 </div>
               </footer>
             </blockquote>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
