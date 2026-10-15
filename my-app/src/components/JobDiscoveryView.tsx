import React, { useState } from 'react';
import { Job, StudentProfile, JobApplication, SkillScore, LeetCodeData } from '../types/career';
import {
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Building,
  Target,
  Send,
  X,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface JobDiscoveryViewProps {
  jobs: Job[];
  profile: StudentProfile;
  skills?: SkillScore[];
  leetcode?: LeetCodeData;
  onApplyJob: (app: JobApplication) => void;
  applications: JobApplication[];
  onNavigateTab: (tab: string) => void;
}

export const JobDiscoveryView: React.FC<JobDiscoveryViewProps> = ({
  jobs,
  profile,
  onApplyJob,
  applications,
  onNavigateTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [workplaceFilter, setWorkplaceFilter] = useState('All');
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'match' | 'standing' | 'practice' | 'prep'>(
    'match'
  );

  // Apply modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Team,\n\nI am writing to express my strong interest in this position. Based on my verified background in Python, distributed backend architectures, and strong problem-solving assessments, I believe my skill set aligns well with your engineering standards.`
  );

  // Filter jobs
  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesWorkplace =
      workplaceFilter === 'All' || j.workplaceType.toLowerCase() === workplaceFilter.toLowerCase();
    return matchesSearch && matchesWorkplace;
  });

  const getMatchScore = (job: Job) => {
    if (job.id === 'job_01') return 91;
    if (job.id === 'job_02') return 84;
    if (job.id === 'job_03') return 76;
    return 72;
  };

  const hasApplied = (jobId: string) => {
    return applications.some((a) => a.jobId === jobId);
  };

  const handleOpenJobModal = (job: Job) => {
    setSelectedJobForDetail(job);
    setActiveModalTab('match');
  };

  const handleConfirmApply = () => {
    if (!jobToApply) return;
    const newApp: JobApplication = {
      id: `app_${Date.now()}`,
      jobId: jobToApply.id,
      company: jobToApply.company,
      jobTitle: jobToApply.title,
      appliedDate: 'Just now',
      matchScore: getMatchScore(jobToApply),
      status: 'Applied',
      notes: coverLetter.slice(0, 120) + '...',
      lastUpdated: new Date().toLocaleDateString(),
    };
    onApplyJob(newApp);
    setIsApplyModalOpen(false);
    setJobToApply(null);
  };

  return (
    <div className="space-y-6">
      {/* Header - Classic */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium mb-1">
            <span>Opportunity Intelligence</span>
            <span> • </span>
            <span className="text-slate-800">{profile.targetCareer}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">Job Opportunities & Matching</h2>
          <p className="text-xs text-slate-600 mt-1">
            Direct comparison between candidate competency profile and open engineering job specifications.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 p-3.5 rounded-lg">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search role, company, or skill (e.g. Python, Docker, Stripe)..."
            className="w-full bg-slate-50 border border-slate-200 rounded pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div className="flex items-center space-x-1.5 text-xs">
          <span className="text-slate-500 font-medium mr-1">Workplace:</span>
          {['All', 'Remote', 'Hybrid', 'On-Site'].map((wp) => (
            <button
              key={wp}
              onClick={() => setWorkplaceFilter(wp)}
              className={`px-3 py-1 rounded font-medium transition ${
                workplaceFilter === wp
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {wp}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const matchScore = getMatchScore(job);
          const applied = hasApplied(job.id);

          return (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between transition hover:border-slate-300"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-10 h-10 rounded object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="font-serif font-bold text-slate-900 text-base leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-500">{job.company}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-semibold shrink-0 ${
                      matchScore >= 85
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : matchScore >= 75
                        ? 'bg-slate-100 text-slate-800 border border-slate-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {matchScore}% Match
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{job.location} ({job.workplaceType})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-800 font-mono font-medium">{job.salaryRange}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Required Skills Badges */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {job.requiredSkills.slice(0, 4).map((sk) => (
                    <span
                      key={sk}
                      className="px-2 py-0.5 rounded bg-slate-50 text-slate-700 text-[10px] font-mono border border-slate-200"
                    >
                      {sk}
                    </span>
                  ))}
                  {job.requiredSkills.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
                      +{job.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center space-x-2">
                <button
                  onClick={() => handleOpenJobModal(job)}
                  className="flex-1 py-1.5 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition"
                >
                  View Details
                </button>

                {applied ? (
                  <button
                    disabled
                    className="py-1.5 px-3 rounded bg-emerald-50 text-emerald-800 font-medium text-xs border border-emerald-200 flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Applied</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setJobToApply(job);
                      setIsApplyModalOpen(true);
                    }}
                    className="py-1.5 px-3.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition flex items-center space-x-1"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Job Detailed Intelligence Modal */}
      {selectedJobForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl text-slate-900 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3.5">
                <img
                  src={selectedJobForDetail.logo}
                  alt={selectedJobForDetail.company}
                  className="w-12 h-12 rounded object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">{selectedJobForDetail.title}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedJobForDetail.company} • {selectedJobForDetail.location} • {selectedJobForDetail.salaryRange}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobForDetail(null)}
                className="text-slate-400 hover:text-slate-800 p-1 rounded hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2 text-xs">
              <button
                onClick={() => setActiveModalTab('match')}
                className={`px-3 py-1.5 rounded transition ${
                  activeModalTab === 'match' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Match Breakdown
              </button>
              <button
                onClick={() => setActiveModalTab('standing')}
                className={`px-3 py-1.5 rounded transition ${
                  activeModalTab === 'standing' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standing Benchmark
              </button>
              <button
                onClick={() => setActiveModalTab('practice')}
                className={`px-3 py-1.5 rounded transition ${
                  activeModalTab === 'practice' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Skill Analysis
              </button>
              <button
                onClick={() => setActiveModalTab('prep')}
                className={`px-3 py-1.5 rounded transition ${
                  activeModalTab === 'prep' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                14-Day Plan
              </button>
            </div>

            {/* TAB 1: MATCH BREAKDOWN */}
            {activeModalTab === 'match' && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded p-4 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 font-medium">Match Score</span>
                    <h4 className="text-xl font-mono font-bold text-slate-900 mt-0.5">
                      {getMatchScore(selectedJobForDetail)}%
                    </h4>
                  </div>
                  <div className="text-right text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                    Highly Competitive
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-semibold text-slate-900 uppercase tracking-wide text-[11px]">Strong Matches:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python (86%)', 'SQL (79%)', 'REST APIs (63%)', 'Coding Drills (342 Solved)'].map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-semibold text-slate-900 uppercase tracking-wide text-[11px]">Identified Gaps:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Docker (42%)', 'AWS / Cloud Deployment', 'System Design (35%)'].map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                        ✕ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-1">
                  <span className="font-semibold text-slate-900">Experience Alignment:</span>
                  <p className="text-slate-600 leading-relaxed">
                    Role specifies 1-2 years experience. Candidate has 1 year hands-on project experience with Python and relational schemas.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: BENCHMARK */}
            {activeModalTab === 'standing' && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                    Applicant Benchmark (Anonymized Aggregate)
                  </span>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-slate-900">Estimated Candidate Standing:</h4>
                    <span className="text-xl font-mono font-bold text-slate-900">Top 18%</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Calibrated against {selectedJobForDetail.applicantCount} total applicants. Algorithmic problem volume and accuracy rank in the 82nd percentile.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p className="text-slate-500 text-[10px] font-sans">Skill Match</p>
                    <p className="text-base font-bold text-slate-900 mt-0.5">88%</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p className="text-slate-500 text-[10px] font-sans">Assessments</p>
                    <p className="text-base font-bold text-slate-900 mt-0.5">85%</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p className="text-slate-500 text-[10px] font-sans">Coding Drills</p>
                    <p className="text-base font-bold text-slate-900 mt-0.5">92%</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-200">
                    <p className="text-slate-500 text-[10px] font-sans">Relevant Exp</p>
                    <p className="text-base font-bold text-slate-900 mt-0.5">80%</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRACTICE */}
            {activeModalTab === 'practice' && (
              <div className="space-y-3 text-xs">
                <h4 className="font-semibold text-slate-900 uppercase text-[11px]">Skill Competency vs Target:</h4>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span>Python</span>
                    <span className="font-mono font-semibold text-slate-900">88% Competent</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span>SQL & Indexing</span>
                    <span className="font-mono font-semibold text-slate-900">81% Competent</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span>REST APIs</span>
                    <span className="font-mono font-semibold text-amber-700">63% Needs Practice</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded border border-slate-200">
                    <span>Docker & Containers</span>
                    <span className="font-mono font-semibold text-rose-700">42% Gap</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: 14-DAY PLAN */}
            {activeModalTab === 'prep' && (
              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-1">
                  <span className="font-semibold text-slate-900">Days 1-5: Cloud Infrastructure</span>
                  <p className="text-slate-600">Containerize sample microservice with multi-stage Docker build.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-1">
                  <span className="font-semibold text-slate-900">Days 6-10: Database Indexing</span>
                  <p className="text-slate-600">Complete 25 query optimization questions and explain plans.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-3.5 space-y-1">
                  <span className="font-semibold text-slate-900">Days 11-14: Mock System Whiteboard</span>
                  <p className="text-slate-600">Run 2 interactive rate limiter and caching architecture sessions.</p>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedJobForDetail(null)}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                Close Details
              </button>

              <button
                onClick={() => {
                  setJobToApply(selectedJobForDetail);
                  setSelectedJobForDetail(null);
                  setIsApplyModalOpen(true);
                }}
                className="px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition"
              >
                Apply for this Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct Application Submission Modal */}
      {isApplyModalOpen && jobToApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-lg p-6 shadow-xl text-slate-900 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900">Apply to {jobToApply.company}</h3>
                <p className="text-xs text-slate-500">{jobToApply.title} • Match: {getMatchScore(jobToApply)}%</p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
                <span className="text-slate-500">Candidate Submission Package:</span>
                <p className="text-slate-900 font-semibold">{profile.name} (CV: {profile.cvFileName})</p>
                <p className="text-slate-600 font-mono">Coding verification: 342 problems solved</p>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Introduction / Notes:
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApply}
                className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Application</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
