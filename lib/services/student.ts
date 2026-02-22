import { createAdminClient } from "@/lib/db/supabase";

export async function getStudentDashboardData(userId: string) {
  const supabase = await createAdminClient();

  // 1. Fetch Subjects and total chapters
  // Since we might not have views, we'll fetch subjects and compute stats
  const { data: subjects = [] } = await supabase
    .from('subjects')
    .select(`
      id,
      name,
      description,
      class_level
    `)
    .order('name');

  // Instead of a complex cross-join RPC right now, we'll fetch chapters and progress separately
  const { data: chapters = [] } = await supabase
    .from('chapters')
    .select('id, subject_id, name, sequence_order');

  const { data: chapterProgress = [] } = await supabase
    .from('chapter_progress')
    .select('chapter_id, status')
    .eq('user_id', userId);

  // 2. Fetch "Resume Learning" state (last IN_PROGRESS chapter)
  const { data: lastProgress } = await supabase
    .from('chapter_progress')
    .select(`
      chapter_id,
      status, 
      updated_at
    `)
    .eq('user_id', userId)
    .eq('status', 'IN_PROGRESS')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  let resumeChapter = null;
  let resumeStep = null;

  if (lastProgress) {
    const chapter = chapters?.find(c => c.id === lastProgress.chapter_id);
    if (chapter) {
      resumeChapter = chapter;

      // Find the specific step inside this chapter
      // First get all steps for the chapter
      const { data: steps } = await supabase
        .from('chapter_steps')
        .select('id, step_number, type')
        .eq('chapter_id', chapter.id)
        .order('step_number', { ascending: true });

      if (steps && steps.length > 0) {
        // Find progress 
        const { data: stepProgress } = await supabase
          .from('step_progress')
          .select('step_id, status')
          .eq('user_id', userId);

        let nextStepNumber = 1;
        let nextStepId = steps[0].id;
        
        for (const step of steps) {
          const prog = stepProgress?.find(sp => sp.step_id === step.id);
          if (!prog || prog.status !== 'COMPLETED') {
            nextStepNumber = step.step_number;
            nextStepId = step.id;
            break;
          }
        }

        resumeStep = { id: nextStepId, number: nextStepNumber };
      }
    }
  }

  // Formatting subject stats
  const formattedSubjects = subjects?.map(sub => {
    const subChapters = chapters?.filter(c => c.subject_id === sub.id) || [];
    const totalChapters = subChapters.length;
    let completedChapters = 0;
    
    subChapters.forEach(sc => {
      const prog = chapterProgress?.find(cp => cp.chapter_id === sc.id);
      if (prog?.status === 'COMPLETED') completedChapters++;
    });

    const progressPct = totalChapters === 0 ? 0 : Math.round((completedChapters / totalChapters) * 100);

    return {
      ...sub,
      totalChapters,
      completedChapters,
      progressPct
    };
  }) || [];

  return {
    subjects: formattedSubjects,
    resumeState: lastProgress ? {
      chapter: resumeChapter,
      step: resumeStep
    } : null,
    // Provide some realistic mock data for Phase 2 until Phase 3 DB is built
    skills: {
      understanding: 20,
      practical: 15,
      thinking: 35,
      communication: 10,
      creativity: 5
    }
  };
}
