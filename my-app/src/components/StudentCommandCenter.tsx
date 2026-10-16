import React from 'react';
import {
  StudentProfile,
  SkillScore,
  LeetCodeData,
  CVAnalysisResult,
  Job,
  JobApplication,
} from '../types/career';
import {
  Compass,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FileText,
  Briefcase,
  Play,
  Sparkles,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

interface StudentCommandCenterProps {
  profile: StudentProfile;
  skills: SkillScore[];
  leetcode: LeetCodeData;
  cvAnalysis: CVAnalysisResult;
  topJobs: Job[];
  applications: JobApplication[];
  onNavigateTab: (tab: string) => void;
}

export const StudentCommandCenter: React.FC<StudentCommandCenterProps> = ({
  profile,
  skills,
  leetcode,
  cvAnalysis,
  topJobs,
  applications,
  onNavigateTab,
}) => {
  const completedSkillsCount = skills.filter((s) => s.score >= 75).length;
  const inProgressSkillsCount = skills.filter((s) => s.score >= 50 && s.score < 75).length;
  const remainingSkillsCount = skills.filter((s) => s.score < 50).length;

  return (
    <div className="space-y-8">
      {/* Hero / Overview Header - Classic Editorial Layout */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <span>Candidate Dashboard</span>
              <span>•</span>
              <span className="text-slate-700">Target Role: {profile.targetCareer}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Welcome back, {profile.name}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Your profile is synchronized with your verified CV, coding problem history, and current industry requirements for {profile.targetCareer}.
            </p>
          </div>

          {/* Master Readiness Gauge - Classic Crisp Presentation */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex items-center space-x-5 min-w-[260px]">
            <div className="relative flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#0f172a"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={213.6}
                  strokeDashoffset={213.6 - (213.6 * profile.careerReadiness) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold font-mono text-slate-900">{profile.careerReadiness}%</span>
                <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Index</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="text-slate-500 font-medium">Readiness Index</div>
              <div className="text-sm font-semibold text-slate-900">{profile.targetCareer}</div>
              <div className="flex items-center space-x-1 text-emerald-700 font-medium text-[11px]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+8% progress this month</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Performance Indicators */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-md p-3.5 flex items-center space-x-3">
            <div className="p-2 rounded bg-white text-slate-700 border border-slate-200">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">CV Evaluation</p>
              <p className="text-base font-bold font-mono text-slate-900">{cvAnalysis.overallScore}%</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('practice')}
            className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-md p-3.5 flex items-center space-x-3 cursor-pointer transition"
          >
            <div className="p-2 rounded bg-white text-slate-700 border border-slate-200">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Coding Drills</p>
              <p className="text-base font-bold font-mono text-slate-900">
                82% <span className="text-xs text-slate-500 font-normal">({leetcode.totalSolved} solved)</span>
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-md p-3.5 flex items-center space-x-3">
            <div className="p-2 rounded bg-white text-slate-700 border border-slate-200">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Market Percentile</p>
              <p className="text-base font-bold text-slate-900">Top 18%</p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('interview-prep')}
            className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-md p-3.5 flex items-center space-x-3 cursor-pointer transition"
          >
            <div className="p-2 rounded bg-white text-slate-700 border border-slate-200">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Interview Readiness</p>
              <p className="text-base font-bold font-mono text-slate-900 flex items-center space-x-1.5">
                <span>68%</span>
                <span className="text-[10px] text-slate-600 font-sans font-medium">→ Practice</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Core Pillars: Current Standing, Career Destination, Next Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pillar 1: Current Standing */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">1. Current Standing</h2>
              <span className="text-xs text-slate-500 font-mono">Status</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Verified Skills:</span>
                <span className="text-slate-900 font-semibold">{skills.length} Competencies</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded p-2">
                  <div className="text-slate-900 font-bold font-mono">{completedSkillsCount}</div>
                  <div className="text-[10px] text-slate-500">Mastered</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-2">
                  <div className="text-slate-900 font-bold font-mono">{inProgressSkillsCount}</div>
                  <div className="text-[10px] text-slate-500">In Progress</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-2">
                  <div className="text-slate-900 font-bold font-mono">{remainingSkillsCount}</div>
                  <div className="text-[10px] text-slate-500">Need Focus</div>
                </div>
              </div>

              {/* Top Skills Preview */}
              <div className="space-y-2 pt-2">
                {skills.slice(0, 4).map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 font-medium">{skill.name}</span>
                      <span className="text-slate-900 font-mono font-semibold">{skill.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-slate-800 h-full rounded-full transition-all duration-300"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 flex items-center justify-between mt-3 text-xs">
                <span className="text-slate-600">Coding Practice:</span>
                <span className="font-semibold text-slate-900 font-mono">
                  {leetcode.totalSolved} Problems ({leetcode.acceptanceRate}% Accuracy)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('practice')}
            className="mt-6 w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-800 transition"
          >
            <span>Practice Coding Challenges</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        {/* Pillar 2: Target Goals */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">2. Career Direction</h2>
              <span className="text-xs text-slate-500 font-mono">Targets</span>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 space-y-1">
                <div className="text-[11px] text-slate-500 font-medium">Target Role</div>
                <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>{profile.targetCareer}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                    ₹1.29Cr - ₹1.57Cr
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">Focused on distributed backend microservices and reliable APIs.</p>
              </div>

              {/* Target Job Openings Preview */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-slate-700">Active High-Match Opportunities:</div>
                {topJobs.slice(0, 2).map((job) => (
                  <div
                    key={job.id}
                    onClick={() => onNavigateTab('jobs')}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-md flex items-center justify-between cursor-pointer transition text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{job.title}</p>
                      <p className="text-slate-500">{job.company} • {job.workplaceType}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono font-semibold text-[11px]">
                      {job.id === 'job_01' ? '91%' : '84%'} Match
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateTab('applications')}
                className="w-full p-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md flex items-center justify-between text-left transition"
              >
                <span>
                  <span className="block text-xs font-semibold text-slate-900">Application Tracker</span>
                  <span className="block text-[11px] text-slate-600 mt-0.5">
                    {applications.length} {applications.length === 1 ? 'application' : 'applications'} in your pipeline
                  </span>
                </span>
                <ChevronRight className="w-4 h-4 text-indigo-700 shrink-0" />
              </button>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('jobs')}
            className="mt-6 w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-800 transition"
          >
            <span>Explore Target Jobs</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        {/* Pillar 3: Action Plan */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">3. Recommended Actions</h2>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Action Plan
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
                    <Target className="w-3.5 h-3.5 text-slate-700" />
                    <span>Daily Practice Plan</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Est. 25 mins</span>
                </div>
                <div className="space-y-1 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>• 5 REST API architecture questions</span>
                    <span className="text-slate-500 font-mono">63%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• 5 SQL index optimization questions</span>
                    <span className="text-slate-500 font-mono">79%</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-900 font-medium">
                    <span>• 3 Docker container challenges</span>
                    <span className="text-amber-700 font-mono">Focus Area (42%)</span>
                  </div>
                </div>
              </div>

              {/* Priority Course */}
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <BookOpen className="w-4 h-4 text-slate-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">Priority Course</p>
                    <p className="text-[11px] text-slate-500 truncate max-w-[150px]">Docker & Cloud Deployment</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('courses')}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] transition"
                >
                  Resume
                </button>
              </div>

              {/* CV Action Item */}
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">CV Improvement</p>
                    <p className="text-[11px] text-slate-500 truncate max-w-[150px]">Add production deployment metrics</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('cv-analysis')}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-[11px] transition"
                >
                  Review
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('practice')}
            className="mt-6 w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Practice Questions</span>
          </button>
        </div>
      </div>

      {/* Focus Area Advisory Note */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-md shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Advisory: Recursion & Containerization Need Attention
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Your recursion problem accuracy is <span className="font-semibold font-mono text-slate-900">54%</span> and Docker proficiency is evaluated at <span className="font-semibold font-mono text-slate-900">42%</span>. We recommend completing 15 focused drills before attempting company whiteboard assessments.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onNavigateTab('practice')}
            className="px-3.5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition"
          >
            Practice Weak Areas
          </button>
        </div>
      </div>
    </div>
  );
};
