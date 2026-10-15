import { CVAnalysisResult, PracticeQuestion } from '../types/career';

export async function analyzeCvApi(cvText: string, targetCareer: string): Promise<CVAnalysisResult> {
  const res = await fetch('/api/ai/analyze-cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cvText, targetCareer }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to analyze CV with AI');
  }
  return res.json();
}

export async function fetchLiveTrendsApi(careerDomain?: string) {
  const res = await fetch('/api/ai/live-trends', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ careerDomain }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to load live trends');
  }
  return res.json();
}

export async function sendCareerChatMessageApi(
  message: string,
  history: { role: 'user' | 'model'; content: string }[],
  profileContext: any
): Promise<{ reply: string }> {
  const res = await fetch('/api/ai/career-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, profileContext }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to get career mentor advice');
  }
  return res.json();
}

export async function generateAdaptiveQuestionsApi(
  language: string,
  weakTopics: string[],
  difficulty: string,
  count = 3
): Promise<{ questions: PracticeQuestion[] }> {
  const res = await fetch('/api/ai/adaptive-practice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ language, weakTopics, difficulty, count }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to generate practice questions');
  }
  return res.json();
}

export async function generateJobPrepPlanApi(
  jobTitle: string,
  company: string,
  missingSkills: string[],
  currentMatch: string
) {
  const res = await fetch('/api/ai/job-prep', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobTitle, company, missingSkills, currentMatch }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to generate job preparation roadmap');
  }
  return res.json();
}

export async function screenCandidateApi(candidate: any, jobRequirements: any) {
  const res = await fetch('/api/ai/screen-candidate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidate, jobRequirements }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Screening request failed');
  }
  return res.json();
}

export async function evaluateInterviewAnswerApi(
  targetJob: string,
  question: string,
  questionType: string,
  answer: string
) {
  const res = await fetch('/api/ai/evaluate-interview-answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetJob, question, questionType, answer }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Interview evaluation failed');
  }
  return res.json();
}

export async function critiqueSystemDesignApi(
  problemTitle: string,
  components: any,
  capacityAssumptions: string,
  architectureNotes: string
) {
  const res = await fetch('/api/ai/critique-system-design', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problemTitle,
      components,
      capacityAssumptions,
      architectureNotes,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'System design critique failed');
  }
  return res.json();
}

export async function checkCodeSolutionApi(params: {
  language: string;
  questionTitle: string;
  prompt: string;
  userCode: string;
  expectedAnswer?: string;
  testCases?: any[];
}) {
  const res = await fetch('/api/ai/check-code-solution', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Code verification request failed');
  }
  return res.json();
}

