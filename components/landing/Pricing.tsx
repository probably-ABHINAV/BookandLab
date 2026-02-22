"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E2A5A] mb-6 tracking-tight">
            Honest, Academic Pricing
          </h2>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Experience the entire digital environment. No hidden features. No microtransactions. Designed for complete academic years.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          
          {/* Trial */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all flex flex-col h-full relative"
          >
            <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Discovery</h3>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">Free Trial</span>
            </div>
            <p className="text-slate-600 mb-8 border-b border-slate-100 pb-8 flex-1 font-medium leading-relaxed">
              Experience the platform flow and interface freely before committing to a term.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-indigo-700" /> <span className="text-slate-700 font-medium">Access initial chapters</span>
              </li>
              <li className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-indigo-700" /> <span className="text-slate-700 font-medium">Experience mentor feedback</span>
              </li>
            </ul>
            <Link 
              href="/handler/sign-up" 
              className="w-full py-4 text-center font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              Start Free Trial
            </Link>
          </motion.div>

          {/* Yearly (Best Value) */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-[#1E2A5A] rounded-4xl p-10 border border-[#1E2A5A] shadow-2xl relative transform lg:-translate-y-4 flex flex-col h-full z-10"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 bg-linear-to-r from-indigo-500 to-teal-500 text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg">
              BEST VALUE
            </div>
            <h3 className="text-sm font-bold text-indigo-300 mb-2 uppercase tracking-widest pt-2">Academic Year</h3>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-white tracking-tight">₹9,999</span>
              <span className="text-indigo-200 font-medium">/ yr</span>
            </div>
            <p className="text-indigo-100/90 mb-8 border-b border-indigo-800 pb-8 flex-1 font-medium leading-relaxed">
              Full access to the curriculum, core projects, and priority mentor evaluations for the academic cycle.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-indigo-400" /> <span className="text-white font-bold">Unrestricted Curriculum Access</span>
              </li>
              <li className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-indigo-400" /> <span className="text-white font-bold">Unlimited Mentor Reviews</span>
              </li>
              <li className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-teal-400" /> <span className="text-white font-bold">Active Skill Engine Tracking</span>
              </li>
              <li className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-amber-400" /> <span className="text-white font-bold">Permanent Tag Unlocks</span>
              </li>
            </ul>
            <Link 
              href="/handler/sign-up" 
              className="w-full py-4 text-center font-bold bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-900/50 hover:bg-indigo-500 transition-colors"
            >
              Get Started Now
            </Link>
          </motion.div>

          {/* Monthly */}
          <motion.div 
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-white rounded-4xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all flex flex-col h-full relative"
          >
            <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">Flexible</h3>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">₹999</span>
              <span className="text-slate-500 font-medium">/ mo</span>
            </div>
            <p className="text-slate-600 mb-8 border-b border-slate-100 pb-8 flex-1 font-medium leading-relaxed">
              Month-by-month access with absolutely no long-term contractual commitment.
            </p>
            <ul className="space-y-4 mb-8">
               <li className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-indigo-700" /> <span className="text-slate-700 font-medium">All subjects & chapters</span>
              </li>
              <li className="flex items-center gap-3">
                 <CheckCircle2 className="w-5 h-5 text-indigo-700" /> <span className="text-slate-700 font-medium">Standard mentor reviews</span>
              </li>
            </ul>
            <Link 
              href="/handler/sign-up" 
              className="w-full py-4 text-center font-bold text-indigo-700 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              Subscribe Monthly
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
