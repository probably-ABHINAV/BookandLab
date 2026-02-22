import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
           <div className="md:col-span-2 space-y-6">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                 <BookOpen className="w-6 h-6 text-white" />
               </div>
               <span className="text-2xl font-extrabold text-white tracking-tight">BookandLab</span>
             </div>
             <p className="text-slate-400 max-w-md text-lg leading-relaxed font-medium">
               A digital school system engineered for genuine cognitive development, project-based output, and human mentorship.
             </p>
           </div>
           
           <div>
             <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Navigation</h4>
             <ul className="space-y-4 font-medium">
               <li><Link href="#how-it-works" className="text-slate-400 hover:text-indigo-400 transition-colors">How it Works</Link></li>
               <li><Link href="#learning-model" className="text-slate-400 hover:text-indigo-400 transition-colors">Learning Model</Link></li>
               <li><Link href="#pricing" className="text-slate-400 hover:text-indigo-400 transition-colors">Pricing & Plans</Link></li>
             </ul>
           </div>

           <div>
             <h4 className="text-white font-bold tracking-wider uppercase mb-6 text-sm">Legal</h4>
             <ul className="space-y-4 font-medium">
               <li><Link href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
               <li><Link href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
               <li><Link href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact Us</Link></li>
             </ul>
           </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} BookandLab. Built for modern schooling.
          </p>
          <div className="px-4 py-2 border border-slate-800 rounded-full text-xs font-bold text-slate-400 tracking-wider">
            ALIGNED WITH NEP 2020
          </div>
        </div>
        
      </div>
    </footer>
  );
}
