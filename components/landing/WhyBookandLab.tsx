"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Briefcase, Eye, Flame, Map, Users } from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="w-6 h-6 text-indigo-700" />,
    title: "No Rote Memorization",
    desc: "Exams aren't the end goal; genuine understanding is. We focus entirely on deep cognitive processing instead of facts."
  },
  {
    icon: <Briefcase className="w-6 h-6 text-teal-700" />,
    title: "Real-world Projects",
    desc: "Every concept demands an output. Build a circuit, analyze a poem, or code a logic script. You build it, you own it."
  },
  {
    icon: <Users className="w-6 h-6 text-amber-600" />,
    title: "Mentor-Reviewed",
    desc: "Human insight matters. Mentors evaluate reflections and projects, ensuring nuanced feedback machines cannot provide."
  },
  {
    icon: <Flame className="w-6 h-6 text-rose-600" />,
    title: "Skill-Based Growth",
    desc: "We don't do marks or ranks. Grow specific traits like 'Thinking' and 'Communication' over time naturally."
  },
  {
    icon: <Map className="w-6 h-6 text-indigo-600" />,
    title: "Structured Daily Guidance",
    desc: "Strict sequential paths built directly into the UI. You cannot drift or skip around. The environment guides you."
  },
  {
    icon: <Eye className="w-6 h-6 text-slate-600" />,
    title: "Calm Screen Time",
    desc: "No flashy gamification or addictive loops. An academic, peaceful interface designed to encourage deep focus."
  }
];

export function WhyBookandLab() {
  return (
    <section id="learning-model" className="py-24 bg-[#F8F9FB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1E2A5A] mb-6 tracking-tight">
            Why We Are Not EdTech
          </h2>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            We don't sell recorded videos or mock tests. We provide a rigorous, mentor-backed digital environment for genuine, structured skill development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 hover:shadow-xl hover:shadow-indigo-900/5 transition-all group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all border border-slate-100 group-hover:border-indigo-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#1E2A5A] transition-colors">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
