export type UserRole = 'student' | 'recruiter';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  headline: string;
  targetCareer: string;
  careerReadiness: number; // 0 - 100%
  selectedLanguages: string[];
  education: {
    institution: string;
    degree: string;
    graduationYear: string;
    gpa?: string;
  };
  cvUrl?: string;
  cvFileName?: string;
  cvUploadedAt?: string;
  leetcodeUsername?: string;
  privacy: {
    profileVisibility: 'public' | 'recruiters_only' | 'private';
    cvVisibility: boolean;
    contactInfoVisibility: boolean;
    codingProfileVisibility: boolean;
    assessmentVisibility: boolean;
  };
}

export interface SkillScore {
  name: string;
  category: 'Language' | 'Core' | 'Framework' | 'Tool' | 'Soft';
  score: number; // 0 - 100%
  targetScore: number;
  history: { date: string; score: number }[];
  sources: string[];
}

export interface LeetCodeData {
  username: string;
  connected: boolean;
  totalSolved: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  acceptanceRate: number;
  contestRating?: number;
  globalRanking?: number;
  topLanguages: { language: string; problemsCount: number }[];
  strongTopics: string[];
  weakTopics: string[];
  recentSubmissions: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
    timestamp: string;
  }[];
}

export interface CVAnalysisResult {
  overallScore: number;
  scoreBreakdown: {
    skills: number;
    experience: number;
    projects: number;
    achievements: number;
    formatting: number;
  };
  extractedData: {
    education: { institution: string; degree: string; year: string }[];
    skills: string[];
    programmingLanguages: string[];
    experience: { role: string; company: string; duration: string; highlights: string[] }[];
    projects: { title: string; technologies: string[]; description: string }[];
    certifications: string[];
    achievements: string[];
  };
  missingInformation: string[];
  improvementOpportunities: string[];
  recommendedProjects: {
    title: string;
    techStack: string[];
    rationale: string;
    estimatedHours: number;
  }[];
  summary: string;
  analyzedAt: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  category: string;
  progress: number; // 0 - 100
  status: 'completed' | 'in_progress' | 'remaining';
  description: string;
  recommendedTime: string;
  skills: string[];
}

export interface Course {
  id: string;
  title: string;
  provider: string; // e.g. 'freeCodeCamp (YouTube)', 'Traversy Media (YouTube)', 'Udemy', 'Coursera'
  careerPath?: string; // e.g. 'Software Developer', 'Full Stack Developer', 'AI & Machine Learning', 'Cloud & DevOps'
  type?: 'youtube' | 'paid'; // free YouTube course vs paid certification
  url?: string; // YouTube video/playlist link or paid platform link
  price?: string; // e.g. 'Free on YouTube', '$19.99 on Udemy', '$49/mo on Coursera'
  channelName?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  skillsCovered: string[];
  priorityRank: 1 | 2 | 3;
  progress: number;
  completed: boolean;
  whyRecommended: string;
  thumbnail: string;
  rating: number;
  studentsCount: number;
}

export type QuestionType = 'MCQ' | 'OutputPrediction' | 'Debugging' | 'FillCode' | 'CodingChallenge';

export interface CodeTestCase {
  input: string;
  expected: string;
  description?: string;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  language: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: QuestionType;
  prompt: string;
  starterCode?: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string;
  testCases?: CodeTestCase[];
  constraints?: string[];
  explanation: string;
  hint: string;
}

export interface CodeCheckResult {
  isCorrect: boolean;
  score: number;
  verdict: 'Accepted' | 'Wrong Answer' | 'Syntax Error' | 'Needs Improvement';
  feedback: string;
  improvements: string[];
  modifiedSolution: string;
  testResults: {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }[];
  timeComplexity?: string;
  spaceComplexity?: string;
}

export interface PracticeStats {
  totalSolved: number;
  accuracyRate: number;
  byLanguage: { [key: string]: { total: number; correct: number } };
  weakTopics: { topic: string; accuracy: number; recommendedQuestions: number }[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-Site';
  experienceLevel: string;
  experienceYearsReq: number;
  salaryRange: string;
  requiredSkills: string[];
  programmingLanguages: string[];
  description: string;
  deadline: string;
  careerCategory: string;
  applicantCount: number;
}

export interface JobStanding {
  matchScore: number;
  percentileRank: number; // e.g. Top 18%
  isHighlyCompetitive: boolean;
  skillMatchScore: number;
  codingScore: number;
  assessmentScore: number;
  experienceScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  experienceGapText?: string;
  howToReach95: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  matchScore: number;
  status:
    | 'Applied'
    | 'Under Review'
    | 'Shortlisted'
    | 'Assessment'
    | 'Interview'
    | 'Final Interview'
    | 'Offer'
    | 'Hired'
    | 'Rejected';
  notes?: string;
  lastUpdated: string;
}

export interface IndustryTrend {
  id: string;
  name: string;
  domain: string;
  popularity: 'Extremely High' | 'High' | 'Rising Fast';
  growthIndicator: string;
  whyItMatters: string;
  relatedJobs: string[];
  requiredSkills: string[];
  recommendedCourses: string[];
  recommendedPractice: string;
}

export interface CareerComparisonItem {
  career: string;
  matchScore: number;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  skillsGap: 'Low' | 'Medium' | 'High';
  medianSalary: string;
  topSkillsNeeded: string[];
  learningTimeEstimate: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'done' | 'current' | 'upcoming';
  icon: string;
}

export interface RecruiterCandidate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email: string;
  matchScore: number;
  cvScore: number;
  codingScore: number;
  assessmentScore: number;
  strongPoints: string[];
  improvementAreas: string[];
  experienceYears: number;
  leetcodeCount: number;
  skills: string[];
  status: 'Applied' | 'Screened' | 'Shortlisted' | 'Assessment' | 'Interview' | 'Offered' | 'Rejected';
  appliedJobId: string;
}

export interface PlatformNotification {
  id: string;
  title: string;
  message: string;
  type: 'job' | 'application' | 'recruiter' | 'assessment' | 'trend' | 'practice';
  timestamp: string;
  read: boolean;
}

export interface BehavioralQuestion {
  id: string;
  question: string;
  competency: 'Ownership & Initiative' | 'Conflict Resolution' | 'Delivering Under Pressure' | 'Technical Disagreement' | 'Handling Failure & Feedback';
  description: string;
  whatToLookFor: string[];
  starExample: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  redFlags: string[];
}

export interface WhiteboardProblem {
  id: string;
  title: string;
  targetRole: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Staff/Principal';
  scenario: string;
  functionalReqs: string[];
  nonFunctionalReqs: string[];
  defaultCapacity: string;
  keyComponents: string[];
  sampleArchitectureNotes: string;
}

export interface MockInterviewSession {
  id: string;
  targetJob: string;
  mode: 'behavioral' | 'whiteboard' | 'coding';
  question: string;
  userAnswer: string;
  score: number;
  verdict: string;
  feedback: string;
  timestamp: string;
}

