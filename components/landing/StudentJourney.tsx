"use client";

import { motion } from "framer-motion";
import { ChevronRight, UserCircle2 } from "lucide-react";

const journeySteps = [
  { time: "09:00 AM", title: "Login to Dashboard", desc: "View personalized subject cards and skill snapshot." },
  { time: "09:05 AM", title: "Select Subject", desc: "Navigate to the current active unit and chapter." },
  { time: "09:15 AM", title: "Enter Chapter", desc: "Review 'Why it matters' and learning outcomes." },
  { time: "09:30 AM", title: "Build Project", desc: "Create tangible output applying the core concepts." },
  { time: "10:15 AM", title: "Submit Reflection", desc: "Articulate challenges faced during the project." },
  { time: "Later", title: "Skill Growth", desc: "Receive mentor evaluation and track verified skill points." }
];

export function StudentJourney() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              A Day in the Life.<br/>
              <span className="text-[#1E2A5A]">Real Work, Real Growth.</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg font-medium">
              We don't do passive video playlists. Here is exactly what a student does when they enter the BookandLab system.
            </p>
            
            <div className="bg-[#F8F9FB] rounded-4xl p-8 border border-slate-100 shadow-lg shadow-slate-200/50 relative mt-12">
               {/* Timeline vertical line */}
               <div className="absolute left-10 md:left-12 top-12 bottom-12 w-0.5 bg-indigo-100"></div>
               
               <div className="space-y-8 relative z-10">
                 {journeySteps.map((step, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ duration: 0.4, delay: idx * 0.1 }}
                     className="flex items-start gap-6 group"
                   >
                     <div className="w-4 h-4 rounded-full bg-indigo-700 border-4 border-[#F8F9FB] shadow-sm shrink-0 mt-1.5 z-10 group-hover:scale-150 transition-transform"></div>
                     <div>
                       <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md tracking-wider uppercase">{step.time}</span>
                       </div>
                       <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-800 transition-colors">{step.title}</h4>
                       <p className="text-sm text-slate-600 font-medium">{step.desc}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>
          </motion.div>

          {/* Desktop Visual representation */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full max-w-xl lg:max-w-none hidden lg:block"
          >
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200 shadow-2xl relative">
              <div className="absolute top-4 left-0 w-full flex justify-center opacity-30">
                <div className="w-32 h-2 bg-slate-300 rounded-full"></div>
              </div>
              
              {/* Mock Dashboard UI */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 mt-6 shadow-sm">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <UserCircle2 className="w-10 h-10 text-slate-300" />
                      <div>
                        <div className="h-4 w-32 bg-slate-200 rounded mb-1.5"></div>
                        <div className="h-3 w-20 bg-emerald-100 rounded"></div>
                      </div>
                    </div>
                    <div className="h-8 w-8 bg-slate-100 rounded-full"></div>
                 </div>

                 <div className="space-y-4">
                   <div className="h-6 w-48 bg-slate-100 rounded mb-4"></div>
                   
                   {/* Mock Subject Card */}
                   <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-indigo-200 transition-colors cursor-pointer group flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">P</div>
                          <div className="h-5 w-24 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-3 w-40 bg-slate-100 rounded"></div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                   </div>

                   {/* Mock Subject Card 2 */}
                   <div className="bg-white border border-slate-100 rounded-xl p-5 flex justify-between items-center opacity-60">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded bg-teal-50 flex items-center justify-center"></div>
                          <div className="h-5 w-32 bg-slate-200 rounded"></div>
                        </div>
                        <div className="h-3 w-36 bg-slate-100 rounded"></div>
                      </div>
                   </div>
                 </div>

                 {/* Mock Skill Snapshot */}
                 <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="h-5 w-32 bg-slate-200 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-10 flex-1 bg-indigo-50 border border-indigo-100 rounded-lg"></div>
                      <div className="h-10 flex-1 bg-teal-50 border border-teal-100 rounded-lg"></div>
                      <div className="h-10 flex-1 bg-amber-50 border border-amber-100 rounded-lg"></div>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
