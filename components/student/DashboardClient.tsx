"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BarChart3, CheckSquare, FileText, Zap, 
  Microscope, Triangle, Book, Globe, 
  ChevronRight, Calendar as CalendarIcon, 
  CheckCircle2, Clock, AlertCircle
} from "lucide-react";

export function DashboardClient({ user, data }: { user?: any, data?: any }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  // Fallback data if none provided
  const studentName = user?.name || "Aryan";

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8 bg-[#fafafa] min-h-screen"
    >
      {/* 1. Dashboard Header */}
      <motion.header variants={itemVariants} className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Good morning, <span className="text-blue-600">{studentName}</span> 👋
        </h1>
        <p className="text-sm md:text-base text-slate-500 font-medium">
          Here's your learning overview for this week — you're on a great streak!
        </p>
      </motion.header>
      
      {/* 2. Overview Stats */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Learning Progress */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 opacity-50"></div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Learning Progress</h3>
          <div className="text-3xl font-black text-slate-800 mb-2">68<span className="text-xl">%</span></div>
          <div className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit">
            ↑ +12% this week
          </div>
        </div>

        {/* Chapters Completed */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10 opacity-50"></div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Chapters Completed</h3>
          <div className="text-3xl font-black text-slate-800 mb-2">34<span className="text-xl text-slate-400 font-medium">/50</span></div>
          <div className="text-xs font-medium text-slate-400 mt-auto">16 chapters remaining</div>
        </div>

        {/* Projects Submitted */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-[100px] -z-10 opacity-50"></div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Projects Submitted</h3>
          <div className="text-3xl font-black text-slate-800 mb-2">7<span className="text-xl text-slate-400 font-medium">/10</span></div>
          <div className="inline-flex items-center text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md w-fit mt-auto">
            2 pending review
          </div>
        </div>

        {/* Skill Growth Score */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] -z-10 opacity-50"></div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Skill Growth Score</h3>
          <div className="text-3xl font-black text-slate-800 mb-2">82<span className="text-xl text-slate-400 font-medium">/100</span></div>
          <div className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit mt-auto">
            ↑ +6 pts since last week
          </div>
        </div>
      </motion.section>

      {/* 3. Activity & Calendar */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Learning Activity Chart (Placeholder based on design) */}
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Learning Activity</h2>
            <span className="text-sm text-slate-400 font-medium">March 2025</span>
          </div>
          <div className="flex items-center gap-4 mb-8 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-500"></div> Study hours</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-100"></div> Target</div>
          </div>
          {/* Chart Graphic Placeholder */}
          <div className="h-48 w-full flex items-end justify-between px-2 md:px-8 border-b border-slate-100 pb-2 relative">
             {/* Mock bars */}
             <div className="w-8 md:w-12 bg-blue-100 h-[60%] rounded-t-sm relative"><div className="absolute bottom-0 w-full bg-blue-500 h-[40%] rounded-t-sm"></div></div>
             <div className="w-8 md:w-12 bg-blue-100 h-[80%] rounded-t-sm relative"><div className="absolute bottom-0 w-full bg-blue-500 h-[70%] rounded-t-sm"></div></div>
             <div className="w-8 md:w-12 bg-blue-100 h-[50%] rounded-t-sm relative"><div className="absolute bottom-0 w-full bg-blue-500 h-[80%] rounded-t-sm"></div></div>
             <div className="w-8 md:w-12 bg-blue-100 h-[90%] rounded-t-sm relative"><div className="absolute bottom-0 w-full bg-blue-500 h-[60%] rounded-t-sm"></div></div>
             <div className="w-8 md:w-12 bg-blue-100 h-[40%] rounded-t-sm relative"><div className="absolute bottom-0 w-full bg-blue-500 h-[30%] rounded-t-sm"></div></div>
             <div className="w-8 md:w-12 bg-blue-100 h-[70%] rounded-t-sm relative"><div className="absolute bottom-0 w-full bg-blue-500 h-[90%] rounded-t-sm"></div></div>
             <div className="w-8 md:w-12 bg-slate-50 h-[60%] rounded-t-sm relative border border-slate-100 border-dashed"></div>
          </div>
          <div className="flex justify-between px-2 md:px-8 mt-4 text-xs font-medium text-slate-400">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">March 2025</h2>
            <div className="flex gap-2 text-slate-400">
              <button className="p-1 hover:bg-slate-100 rounded">&lt;</button>
              <button className="p-1 hover:bg-slate-100 rounded">&gt;</button>
            </div>
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 mb-4">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
          </div>
          {/* Dates (Static representation) */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-slate-700">
            <div className="text-slate-300 py-1">25</div><div className="text-slate-300 py-1">26</div><div className="text-slate-300 py-1">27</div><div className="text-slate-300 py-1">28</div><div className="text-slate-300 py-1">1</div><div className="py-1 bg-blue-50 text-blue-600 rounded">2</div><div className="py-1 bg-blue-50 text-blue-600 rounded">3</div>
            <div className="py-1 bg-blue-50 text-blue-600 rounded">4</div><div className="py-1 bg-blue-50 text-blue-600 rounded">5</div><div className="py-1 bg-blue-50 text-blue-600 rounded">6</div><div className="py-1 bg-orange-50 text-orange-600 rounded">7</div><div className="py-1 bg-blue-50 text-blue-600 rounded">8</div><div className="py-1 bg-blue-50 text-blue-600 rounded">9</div><div className="py-1">10</div>
            <div className="py-1 bg-blue-50 text-blue-600 rounded">11</div><div className="py-1 bg-emerald-50 text-emerald-600 rounded">12</div><div className="py-1 bg-blue-50 text-blue-600 rounded">13</div><div className="py-1 bg-blue-50 text-blue-600 rounded">14</div><div className="py-1 bg-orange-50 text-orange-600 rounded">15</div><div className="py-1 bg-blue-50 text-blue-600 rounded">16</div><div className="py-1">17</div>
            <div className="py-1 bg-blue-50 text-blue-600 rounded">18</div><div className="py-1 bg-blue-50 text-blue-600 rounded">19</div><div className="py-1 bg-blue-600 text-white rounded shadow-md shadow-blue-200">20</div><div className="py-1">21</div><div className="py-1">22</div><div className="py-1">23</div><div className="py-1">24</div>
            <div className="py-1">25</div><div className="py-1">26</div><div className="py-1">27</div><div className="py-1 bg-orange-50 text-orange-600 rounded">28</div><div className="py-1">29</div><div className="py-1">30</div><div className="py-1">31</div>
          </div>
          <div className="flex items-center gap-3 mt-6 text-xs font-medium text-slate-500 justify-center">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600"></div> Today</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-100"></div> Study</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-100"></div> Project</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-100"></div> Review</span>
          </div>
        </div>
      </motion.section>

      {/* 4. Continue Learning */}
      <motion.section variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Continue Learning</h2>
          <Link href="/subjects" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all subjects <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Subject Cards */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Science</h3>
            <p className="text-sm text-slate-400 font-medium mb-6">Ch. 7 — Motion & Forces</p>
            <div className="mt-auto space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Progress</span><span>72%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-blue-500 rounded-full w-[72%]"></div>
              </div>
              <button className="w-full py-2.5 rounded-xl border border-blue-100 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors flex justify-center items-center gap-1">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mb-4">
              <Triangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Mathematics</h3>
            <p className="text-sm text-slate-400 font-medium mb-6">Ch. 5 — Quadratic Equations</p>
            <div className="mt-auto space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Progress</span><span>58%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-orange-500 rounded-full w-[58%]"></div>
              </div>
              <button className="w-full py-2.5 rounded-xl border border-blue-100 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors flex justify-center items-center gap-1">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-4">
              <Book className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">English</h3>
            <p className="text-sm text-slate-400 font-medium mb-6">Ch. 4 — Poetry Analysis</p>
            <div className="mt-auto space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Progress</span><span>89%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-emerald-500 rounded-full w-[89%]"></div>
              </div>
              <button className="w-full py-2.5 rounded-xl border border-blue-100 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors flex justify-center items-center gap-1">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-500 mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Social Science</h3>
            <p className="text-sm text-slate-400 font-medium mb-6">Ch. 6 — Democracy & Rights</p>
            <div className="mt-auto space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Progress</span><span>45%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-purple-500 rounded-full w-[45%]"></div>
              </div>
              <button className="w-full py-2.5 rounded-xl border border-blue-100 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors flex justify-center items-center gap-1">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 5. Lower Dashboard Grid */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mentor Feedback */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Mentor Feedback</h2>
            <Link href="/feedback" className="text-xs font-bold text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-800 text-sm">Forces & Motion Project</h4>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">⭐ 9/10</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed italic mb-3">
                "Excellent application of Newton's laws. Your diagrams were clear and your analysis was thorough."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">SR</div>
                  <span className="text-xs font-medium text-slate-400">Dr. S. Rajan</span>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline">View full &rarr;</button>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-slate-800 text-sm">Algebra Reflection</h4>
                <span className="inline-flex items-center text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">⭐ 7/10</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed italic mb-3">
                "Good effort, but work on showing intermediate steps in solutions for clarity."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">PK</div>
                  <span className="text-xs font-medium text-slate-400">Prof. P. Kumar</span>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline">View full &rarr;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Development */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Skill Development</h2>
            <Link href="/skills" className="text-xs font-bold text-blue-600 hover:text-blue-700">Details</Link>
          </div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 mb-1">
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-orange-400"/> Concept Clarity</span>
                <span>88%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[88%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 mb-1">
                <span className="flex items-center gap-1.5"><Triangle className="w-4 h-4 text-purple-400"/> Critical Thinking</span>
                <span>75%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full w-[75%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 mb-1">
                <span className="flex items-center gap-1.5"><Microscope className="w-4 h-4 text-emerald-400"/> Application Skill</span>
                <span>82%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full w-[82%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-600 mb-1">
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-blue-400"/> Communication</span>
                <span>91%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[91%]"></div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-sm">
            <div className="font-bold mb-1">Overall Score: 84/100</div>
            <div className="text-blue-600 flex items-center gap-1 text-xs font-medium">Top 15% of your cohort this week <Zap className="w-3 h-3"/></div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Today's Tasks</h2>
            <span className="text-xs font-medium text-slate-500">3/5 done</span>
          </div>
          <div className="space-y-4">
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-slate-400 text-sm line-through">Read Ch. 7 - Section A</h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Done</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Science • Completed at 9:30 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-slate-400 text-sm line-through">Complete Algebra Problem Set</h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Done</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Mathematics • Completed at 11:00 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-slate-400 text-sm line-through">Poetry Reflection Entry</h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Done</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">English • Completed at 1:15 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded border-2 border-slate-200 mt-0.5 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">Submit Democracy Project</h4>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Pending</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Social Science • Due by 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded border-2 border-slate-200 mt-0.5 shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">Review Mentor Feedback</h4>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Urgent</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Forces & Motion • Action needed</p>
              </div>
            </div>

          </div>
        </div>

      </motion.section>

      {/* 6. Learning Path Tracker */}
      <motion.section variants={itemVariants} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 overflow-x-auto">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Learning Path Tracker <span className="text-slate-400 text-sm font-medium">— Science Ch. 7: Motion & Forces</span>
            </h2>
            <Link href="/path" className="text-xs font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap">View details</Link>
         </div>

         {/* Path visualization */}
         <div className="relative flex items-center justify-between min-w-[700px] px-8 py-4">
            {/* Background Track */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
            {/* Active Track */}
            <div className="absolute top-1/2 left-8 w-1/2 h-1 bg-emerald-500 -translate-y-1/2 z-0"></div>
            
            {/* Nodes */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-white shadow-sm">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800">Context</div>
                <div className="text-xs font-bold text-emerald-500">Completed</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-white shadow-sm">
                <Book className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800">Concept</div>
                <div className="text-xs font-bold text-emerald-500">Completed</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center border-4 border-white shadow-sm">
                <Triangle className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-slate-800">Thinking</div>
                <div className="text-xs font-bold text-emerald-500">Completed</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center border-4 border-white shadow-md ring-4 ring-blue-50">
                <Microscope className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-blue-600">Deep Learning</div>
                <div className="text-xs font-bold text-blue-500">In Progress</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3 opacity-50">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-white shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-slate-500">Project</div>
                <div className="text-xs font-medium text-slate-400">Locked</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3 opacity-50">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-4 border-white shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-slate-500">Reflection</div>
                <div className="text-xs font-medium text-slate-400">Locked</div>
              </div>
            </div>

         </div>
      </motion.section>

    </motion.div>
  );
}
