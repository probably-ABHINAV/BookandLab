"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Combine, PenTool, TrendingUp } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Understand",
    description: "Learn core concepts through structured materials.",
    icon: <BookOpen className="w-6 h-6 text-indigo-700" />
  },
  {
    id: 2,
    title: "Think",
    description: "Analyze scenarios and answer guided questions.",
    icon: <Brain className="w-6 h-6 text-teal-700" />
  },
  {
    id: 3,
    title: "Build Projects",
    description: "Apply knowledge by building tangible mini-projects.",
    icon: <Combine className="w-6 h-6 text-amber-600" />
  },
  {
    id: 4,
    title: "Reflect",
    description: "Articulate what was learned and challenges faced.",
    icon: <PenTool className="w-6 h-6 text-[#1E2A5A]" />
  },
  {
    id: 5,
    title: "Grow Skills",
    description: "Receive mentor feedback and watch skills accumulate.",
    icon: <TrendingUp className="w-6 h-6 text-emerald-700" />
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1E2A5A] mb-6 tracking-tight">
            How Learning Works
          </h2>
          <p className="text-lg text-slate-700 font-medium bg-slate-50 border border-slate-100 shadow-sm inline-block px-5 py-2.5 rounded-xl">
            Every chapter follows this exact flow. <span className="text-indigo-800 font-bold">No skipping. No shortcuts.</span>
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal Connection Line */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] w-[80%] h-0.5 bg-linear-to-r from-indigo-100 via-teal-100 to-indigo-100 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center group bg-white lg:bg-transparent p-6 lg:p-0 rounded-3xl lg:rounded-none shadow-sm lg:shadow-none border border-slate-100 lg:border-none"
              >
                <div className="relative w-28 h-28 bg-white border-4 border-white shadow-xl shadow-slate-200/50 rounded-4xl flex items-center justify-center mb-6 z-10">
                  <div className="absolute inset-0 bg-slate-50 rounded-[1.75rem] -z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-teal-50 rounded-[1.75rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1E2A5A] text-white text-sm font-bold flex items-center justify-center shadow-md">
                    {step.id}
                  </div>
                  {step.icon}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-800 transition-colors">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-[220px] font-medium">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
