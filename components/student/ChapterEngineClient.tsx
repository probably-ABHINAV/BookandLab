"use client";

import { useState } from "react";
import { Lock, CheckCircle, PlayCircle, Loader2, AlertTriangle } from "lucide-react";
import { submitProjectAction } from "@/lib/actions/projects";
import { submitReflectionAction } from "@/lib/actions/reflections";
import { useRouter } from "next/navigation";

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

  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("projectId", project?.id);
    
    try {
      const res = await submitProjectAction(formData);
      if (res.success) {
        router.refresh(); // This re-fetches server props updating locks
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
    
    try {
      const res = await submitReflectionAction(formData);
      if (res.success) {
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit reflection");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 space-y-2">
        {steps.map((step, idx) => {
          const isActive = idx === activeStepIdx;
          const isLocked = !step.isUnlocked;
          const isCompleted = step.derivedStatus === 'COMPLETED';
          
          return (
            <button
              key={step.id}
              onClick={() => !isLocked && setActiveStepIdx(idx)}
              disabled={isLocked}
              className={`w-full text-left flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive ? 'bg-indigo-600 text-white shadow-md' : 
                isLocked ? 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100' : 
                'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="shrink-0">
                {isCompleted ? <CheckCircle className={`w-5 h-5 ${isActive ? 'text-indigo-200' : 'text-emerald-500'}`} /> : 
                 isLocked ? <Lock className="w-5 h-5 text-slate-300" /> : 
                 <PlayCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-indigo-500'}`} />}
              </div>
              <div className="flex-1 truncate">
                <div className="text-xs font-bold uppercase tracking-wider opacity-80">Step {step.step_number}</div>
                <div className="font-semibold">{step.type}</div>
              </div>
            </button>
          );
        })}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        <header className="p-6 border-b border-slate-100 bg-slate-50/50">
          <span className="text-sm font-bold tracking-widest text-indigo-600 uppercase">Step {activeStep.step_number}: {activeStep.type}</span>
          <h2 className="text-2xl font-bold mt-1 text-slate-900">{chapter.name}</h2>
        </header>
        
        <div className="p-8 flex-1">
           {/* Placeholder for generic content steps (1-4) since content CMS is not in scope for Phase 4 */}
           {activeStep.step_number < 5 && (
             <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
               <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
                 <PlayCircle className="w-8 h-8 text-indigo-300" />
               </div>
               <p className="text-lg font-medium">Content for {activeStep.type} ({activeStep.content_reference})</p>
               <p className="text-sm">In a production environment, this would render MDX or video block components.</p>
             </div>
           )}

           {/* Step 5: Master Project Submission Placeholder */}
           {activeStep.step_number === 5 && (
             <div className="space-y-6">
               <div className="bg-slate-50 border p-6 rounded-xl">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">Project: {project?.type || 'Application Activity'}</h3>
                 <p className="text-slate-600 mt-2">{project?.instructions || 'Follow the guidelines provided in earlier steps. Apply your accumulated knowledge.'}</p>
                 <div className="mt-4 p-3 bg-indigo-50/50 rounded flex gap-2 text-sm text-indigo-800">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span>Submission is strictly enforced. It must be approved by your Mentor before you can unlock the next chapter.</span>
                 </div>
               </div>
               
               {error && activeStep.step_number === 5 && (
                 <div className="p-3 bg-red-50 text-red-600 rounded flex gap-2 items-center"><AlertTriangle className="w-4 h-4"/>{error}</div>
               )}

               <div className={`bg-amber-50 border ${projectSubmission?.status === 'APPROVED' ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200'} p-6 rounded-xl`}>
                 <h3 className={`font-bold ${projectSubmission?.status === 'APPROVED' ? 'text-emerald-900' : 'text-amber-900'} mb-2`}>
                   {projectSubmission?.status === 'PENDING' && 'Status: Submitted (Pending Mentor Review)'}
                   {projectSubmission?.status === 'APPROVED' && 'Status: Mentor Approved'}
                   {projectSubmission?.status === 'NEEDS_REVISION' && 'Status: Needs Revision (Feedback Provided)'}
                   {!projectSubmission && 'Project Submission Required'}
                 </h3>
                 
                 <form onSubmit={handleProjectSubmit}>
                   <textarea 
                     name="contentText"
                     className="w-full p-3 rounded-lg border border-slate-300 focus:ring-amber-500 focus:border-amber-500 mb-2 disabled:opacity-60" 
                     rows={4} 
                     disabled={projectSubmission?.status === 'PENDING' || projectSubmission?.status === 'APPROVED'}
                     defaultValue={projectSubmission?.content_text || ""}
                     placeholder="Type your project submission here or describe your attached work..."
                     required
                   />
                   <input 
                     type="url" 
                     name="mediaUrl"
                     disabled={projectSubmission?.status === 'PENDING' || projectSubmission?.status === 'APPROVED'}
                     defaultValue={projectSubmission?.media_urls?.[0] || ""}
                     className="w-full p-3 rounded-lg border border-slate-300 focus:ring-amber-500 focus:border-amber-500 mb-4 disabled:opacity-60"
                     placeholder="Optional: Link to external media (Drive, YouTube, etc.)"
                   />
                   
                   {projectSubmission?.status !== 'PENDING' && projectSubmission?.status !== 'APPROVED' && (
                     <div className="flex justify-end">
                       <button 
                         type="submit" 
                         disabled={isSubmitting}
                         className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
                       >
                         {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin"/> Processing</> : 'Submit Project'}
                       </button>
                     </div>
                   )}
                 </form>
               </div>
             </div>
           )}

           {/* Step 6: Reflection Submission Placeholder */}
           {activeStep.step_number === 6 && (
             <div className="space-y-6">
               <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl">
                 <h3 className="font-bold text-indigo-900 mb-2">Final Reflection</h3>
                 <p className="text-sm text-indigo-800 mb-4 font-medium">{reflection?.prompt || 'What were the most challenging parts of this chapter? How did you apply your thinking to overcome them?'}</p>
                 
                 {error && activeStep.step_number === 6 && (
                   <div className="p-3 bg-red-50 text-red-600 rounded flex gap-2 items-center mb-4"><AlertTriangle className="w-4 h-4"/>{error}</div>
                 )}

                 <form onSubmit={handleReflectionSubmit}>
                   <textarea 
                     name="contentText"
                     className="w-full p-3 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60 bg-white" 
                     rows={5} 
                     disabled={reflectionSubmission?.status === 'PENDING' || reflectionSubmission?.status === 'APPROVED'}
                     defaultValue={reflectionSubmission?.content_text || ""}
                     placeholder="Reflect on your problem-solving process..."
                     required
                   />
                   
                   {reflectionSubmission?.status !== 'PENDING' && reflectionSubmission?.status !== 'APPROVED' && (
                     <div className="mt-4 flex justify-between items-center">
                       <span className="text-sm text-indigo-600 italic">This will finalize your chapter progression.</span>
                       <button 
                         type="submit"
                         disabled={isSubmitting}
                         className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
                       >
                         {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin"/> Finalizing</> : 'Submit Reflection'}
                       </button>
                     </div>
                   )}
                   
                   {reflectionSubmission?.status === 'PENDING' && <p className="mt-3 text-sm font-bold text-indigo-600">Reflection submitted. Awaiting Mentor Review.</p>}
                   {reflectionSubmission?.status === 'APPROVED' && <p className="mt-3 text-sm font-bold text-emerald-600">Reflection approved. Chapter fully completed!</p>}
                 </form>
               </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
}
