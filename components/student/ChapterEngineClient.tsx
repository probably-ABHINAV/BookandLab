"use client";

import { useState, useEffect } from "react";
import { Lock, CheckCircle, PlayCircle, Loader2, AlertTriangle, ChevronRight, PartyPopper } from "lucide-react";
import { completeInteractiveStep, startChapterStep, submitProject, submitReflection } from "@/app/actions/student/learning";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function ChapterEngineClient({ 
  chapter, initialSteps, studentId, project, projectSubmission, reflection, reflectionSubmission 
}: { 
  chapter: any; initialSteps: any[]; studentId: string;
  project?: any; projectSubmission?: any; reflection?: any; reflectionSubmission?: any;
}) {
  const firstActive = initialSteps.findIndex(s => s.isUnlocked && s.derivedStatus !== 'COMPLETED');
  const [activeStepIdx, setActiveStepIdx] = useState(firstActive >= 0 ? firstActive : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const steps = initialSteps;
  const activeStep = steps[activeStepIdx];

  // Logic: Trigger confetti if the chapter just became completed
  const isChapterCompleted = reflectionSubmission?.status === 'APPROVED';
  
  useEffect(() => {
    if (isChapterCompleted) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [isChapterCompleted]);

  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("projectId", project?.id);
    const contentText = formData.get("contentText") as string;
    const mediaUrl = formData.get("mediaUrl") as string;
    
    try {
      const res = await submitProject(chapter.id, project?.id, contentText, mediaUrl ? [mediaUrl] : []);
      if (res.success) {
        if (activeStepIdx < steps.length - 1) {
          setActiveStepIdx(activeStepIdx + 1);
        }
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#10b981']
        });
        router.refresh(); 
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReflectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("reflectionId", reflection?.id);
    const contentText = formData.get("contentText") as string;
    
    try {
      const res = await submitReflection(chapter.id, reflection?.id, contentText);
      if (res.success) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit reflection");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteInteractive = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const res = await completeInteractiveStep(chapter.id, activeStep.step_number);
      if (res.success) {
        if (activeStepIdx < steps.length - 1) {
          setActiveStepIdx(activeStepIdx + 1);
        }
        router.refresh(); 
      }
    } catch (err: any) {
      setError(err.message || "Failed to complete step");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 shrink-0 space-y-3">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIdx;
          const isLocked = !step.isUnlocked;
          const isCompleted = step.derivedStatus === 'COMPLETED';
          
          return (
            <button
              key={step.id}
              onClick={() => !isLocked && setActiveStepIdx(idx)}
              disabled={isLocked}
              className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl transition-all relative overflow-hidden group ${
                isActive ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-600 ring-offset-2' : 
                isLocked ? 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100' : 
                'bg-white text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isCompleted ? <CheckCircle className={`w-5 h-5 ${isActive ? 'text-indigo-200' : 'text-emerald-500'}`} /> : 
                 isLocked ? <Lock className="w-5 h-5 text-slate-300" /> : 
                 <PlayCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-indigo-500 group-hover:scale-110 transition-transform'}`} />}
              </div>
              <div className="flex-1 truncate">
                <div className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>Step {step.step_number}</div>
                <div className="font-bold text-sm leading-tight mt-0.5">{step.type}</div>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="activeStep" 
                  className="absolute inset-0 bg-indigo-600 -z-10" 
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}

        {isChapterCompleted && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl mt-6 text-center">
            <PartyPopper className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-emerald-900 uppercase tracking-tight">Chapter Mastery Reached!</p>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden min-h-[700px] flex flex-col relative">
        <header className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-black tracking-[0.2em] text-indigo-600 uppercase">Interactive Session</span>
            <h2 className="text-3xl font-black mt-1 text-slate-900 tracking-tight leading-none">{chapter.name}</h2>
          </div>
          <div className="hidden sm:block">
            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000" 
                style={{ width: `${(steps.filter(s => s.derivedStatus === 'COMPLETED').length / steps.length) * 100}%` }}
              />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 text-right">Progress: {Math.round((steps.filter(s => s.derivedStatus === 'COMPLETED').length / steps.length) * 100)}%</p>
          </div>
        </header>
        
        <div className="p-8 flex-1 relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeStep.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="h-full"
             >
                {activeStep.step_number < 5 && (
                  <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8 py-12">
                    <div className="relative">
                      <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-indigo-500" />
                      </div>
                      {activeStep.derivedStatus === 'COMPLETED' && (
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 uppercase tracking-widest mb-2">{activeStep.type}</h3>
                      <p className="text-slate-500 text-lg leading-relaxed">
                        Concept focus: <span className="font-mono text-indigo-600">{activeStep.content_reference}</span>
                      </p>
                      <p className="text-sm text-slate-400 mt-4 max-w-md mx-auto italic">
                        In the full version, this module loads rich interactive videos, MDX sheets, and simulated lab environments.
                      </p>
                    </div>
                    
                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex gap-3 items-center text-sm font-bold border border-red-100">
                        <AlertTriangle className="w-5 h-5 shrink-0"/>{error}
                      </div>
                    )}

                    <div className="w-full pt-8 border-t border-slate-100 flex justify-center">
                      {activeStep.derivedStatus === 'COMPLETED' ? (
                        <button 
                          onClick={() => activeStepIdx < steps.length - 1 && setActiveStepIdx(activeStepIdx + 1)}
                          className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm uppercase tracking-widest hover:gap-4 transition-all"
                        >
                          Continue to Next Step <ChevronRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button 
                          onClick={handleCompleteInteractive}
                          disabled={isSubmitting}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-black shadow-xl shadow-indigo-100 transition-all transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 flex items-center gap-3 w-full max-w-sm justify-center uppercase tracking-widest text-sm"
                        >
                          {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Processing</> : 'Complete Step & Continue'}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 5: Master Project Submission */}
                {activeStep.step_number === 5 && (
                  <div className="max-w-3xl mx-auto space-y-8 py-4">
                    <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 -mr-16 -mt-16 rounded-full" />
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                        <PartyPopper className="w-6 h-6 text-indigo-600" />
                        Capstone: {project?.type || 'Application Activity'}
                      </h3>
                      <p className="text-slate-600 mt-4 leading-relaxed text-lg">{project?.instructions || 'Apply your knowledge to solve the final challenge.'}</p>
                      <div className="mt-6 p-4 bg-white/80 backdrop-blur border border-indigo-100 rounded-2xl flex gap-3 text-sm text-indigo-800 font-bold items-center">
                        <CheckCircle className="w-5 h-5 shrink-0 text-indigo-600" />
                        Submission requires Mentor Approval to unlock subsequent chapters.
                      </div>
                    </div>
                    
                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex gap-3 items-center text-sm font-bold border border-red-100">
                        <AlertTriangle className="w-5 h-5 shrink-0"/>{error}
                      </div>
                    )}

                    <div className={`bg-white border-2 ${projectSubmission?.status === 'APPROVED' ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100'} p-8 rounded-[2.5rem] shadow-sm`}>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-black uppercase tracking-widest text-xs ${projectSubmission?.status === 'APPROVED' ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {projectSubmission?.status === 'PENDING' && 'Status: Awaiting Review'}
                          {projectSubmission?.status === 'APPROVED' && 'Status: Verified'}
                          {projectSubmission?.status === 'NEEDS_REVISION' && 'Status: Revision Requested'}
                          {!projectSubmission && 'Draft your submission'}
                        </h3>
                        {projectSubmission?.status === 'APPROVED' && (
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Mastered</span>
                        )}
                      </div>
                      
                      <form onSubmit={handleProjectSubmit} className="space-y-4">
                        <textarea 
                          name="contentText"
                          className="w-full p-5 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 disabled:opacity-60 text-lg font-medium" 
                          rows={6} 
                          disabled={projectSubmission?.status === 'PENDING' || projectSubmission?.status === 'APPROVED'}
                          defaultValue={projectSubmission?.content_text || ""}
                          placeholder="Document your findings, results, or process here..."
                          required
                        />
                        <div className="flex flex-col sm:flex-row gap-4">
                          <input 
                            type="url" 
                            name="mediaUrl"
                            disabled={projectSubmission?.status === 'PENDING' || projectSubmission?.status === 'APPROVED'}
                            defaultValue={projectSubmission?.media_urls?.[0] || ""}
                            className="flex-1 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-slate-50 disabled:opacity-60 text-sm font-medium"
                            placeholder="Optional: Link to artifacts (Drive, Figma, Portfolio)"
                          />
                          {projectSubmission?.status !== 'PENDING' && projectSubmission?.status !== 'APPROVED' && (
                            <button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-xl font-black shadow-lg transition-all text-sm uppercase tracking-widest flex items-center gap-2 justify-center disabled:opacity-50"
                            >
                              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin"/></> : 'Submit Final'}
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Step 6: Reflection Submission */}
                {activeStep.step_number === 6 && (
                  <div className="max-w-3xl mx-auto space-y-8 py-4">
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 -mr-24 -mt-24 rounded-full blur-3xl opacity-20" />
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-2">The Reflection</h3>
                      <p className="text-indigo-200 font-bold leading-relaxed">{reflection?.prompt || 'What was your biggest breakthrough in this chapter?'}</p>
                      
                      <div className="mt-8">
                        {error && (
                          <div className="p-4 bg-white/10 text-white rounded-2xl flex gap-3 items-center text-sm font-bold border border-white/20 mb-6 backdrop-blur">
                            <AlertTriangle className="w-5 h-5 shrink-0"/>{error}
                          </div>
                        )}

                        <form onSubmit={handleReflectionSubmit} className="space-y-6">
                          <textarea 
                            name="contentText"
                            className="w-full p-6 rounded-2xl border-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60 bg-white/10 backdrop-blur-md text-white placeholder-indigo-300 font-medium text-lg leading-relaxed" 
                            rows={6} 
                            disabled={reflectionSubmission?.status === 'PENDING' || reflectionSubmission?.status === 'APPROVED'}
                            defaultValue={reflectionSubmission?.content_text || ""}
                            placeholder="Your thoughtful reflection goes here..."
                            required
                          />
                          
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-xs text-indigo-300 font-bold uppercase tracking-widest max-w-[200px]">Finalizing this will lock the chapter as masterly completed.</p>
                            
                            {reflectionSubmission?.status !== 'PENDING' && reflectionSubmission?.status !== 'APPROVED' && (
                              <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-white text-indigo-950 px-8 py-4 rounded-xl font-black shadow-xl transition-all transform hover:-translate-y-1 hover:bg-slate-50 disabled:opacity-50 uppercase tracking-widest text-sm flex items-center gap-2"
                              >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Finish Journey'}
                              </button>
                            )}
                          </div>
                          
                          {reflectionSubmission?.status === 'PENDING' && (
                            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                              <CheckCircle className="w-5 h-5 text-indigo-400" />
                              <p className="text-sm font-black text-white uppercase tracking-widest">Awaiting Mentor Validation</p>
                            </div>
                          )}
                          {reflectionSubmission?.status === 'APPROVED' && (
                            <div className="flex items-center gap-3 bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/30">
                              <CheckCircle className="w-5 h-5 text-emerald-400" />
                              <p className="text-sm font-black text-emerald-300 uppercase tracking-widest">Chapter Mastered</p>
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                )}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
