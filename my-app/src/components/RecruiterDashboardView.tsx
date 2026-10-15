import React, { useState } from 'react';
import { RecruiterCandidate, Job } from '../types/career';
import { screenCandidateApi } from '../services/aiApi';
import {
  Briefcase,
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Mail,
  Calendar,
  FileSpreadsheet,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Code2,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface RecruiterDashboardViewProps {
  candidates: RecruiterCandidate[];
  jobs: Job[];
  onUpdateCandidateStatus: (id: string, status: RecruiterCandidate['status']) => void;
  onRequestSheetsExport: (title: string, headers: string[], rows: (string | number)[][]) => void;
}

export const RecruiterDashboardView: React.FC<RecruiterDashboardViewProps> = ({
  candidates: initialCandidates,
  jobs,
  onUpdateCandidateStatus,
  onRequestSheetsExport,
}) => {
  const [candidatesList, setCandidatesList] = useState<RecruiterCandidate[]>(initialCandidates);
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('job_01');
  const [selectedCandidate, setSelectedCandidate] = useState<RecruiterCandidate | null>(null);
  const [isScreeningAi, setIsScreeningAi] = useState(false);
  const [screeningEvaluation, setScreeningEvaluation] = useState<any | null>(null);

  const activeJob = jobs.find((j) => j.id === selectedJobFilter) || jobs[0];

  const handleExportCandidatesToSheets = () => {
    const headers = [
      'Candidate Name',
      'Email',
      'Match Score (%)',
      'CV ATS Score (%)',
      'Coding Score (%)',
      'Assessment Score (%)',
      'Challenges Solved',
      'Status',
      'Key Strengths',
    ];
    const rows = candidatesList.map((c) => [
      c.name,
      c.email,
      `${c.matchScore}%`,
      `${c.cvScore}%`,
      `${c.codingScore}%`,
      `${c.assessmentScore}%`,
      c.leetcodeCount,
      c.status,
      c.strongPoints.join(', '),
    ]);
    onRequestSheetsExport(`CareerAI_Recruiter_Pipeline_${activeJob.company}`, headers, rows);
  };

  const handleRunAiScreening = async (cand: RecruiterCandidate) => {
    setIsScreeningAi(true);
    try {
      const evaluation = await screenCandidateApi(cand, {
        title: activeJob.title,
        requiredSkills: activeJob.requiredSkills,
        experienceReq: activeJob.experienceYearsReq,
      });
      setScreeningEvaluation(evaluation);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScreeningAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header - Classic */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium mb-1">
            <span>Talent Acquisition</span>
            <span> • </span>
            <span className="text-slate-800">{activeJob.company}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">Candidate Screening & Pipeline</h2>
          <p className="text-xs text-slate-600 mt-1">
            Candidate qualification pipeline calibrated by coding assessments, ATS parsing, and demonstrated skills.
          </p>
        </div>

        <button
          onClick={handleExportCandidatesToSheets}
          className="flex items-center space-x-2 px-3.5 py-2 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-800 transition"
        >
          <FileSpreadsheet className="w-4 h-4 text-slate-600" />
          <span>Export Pipeline to Sheets</span>
        </button>
      </div>

      {/* Role Selector & Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <span className="text-slate-500">Active Pipeline</span>
          <p className="text-xl font-mono font-bold text-slate-900 mt-1">{candidatesList.length} Candidates</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <span className="text-slate-500">High Match (&gt;85%)</span>
          <p className="text-xl font-mono font-bold text-slate-900 mt-1">3 Candidates</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <span className="text-slate-500">Interviews Scheduled</span>
          <p className="text-xl font-mono font-bold text-slate-900 mt-1">4</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
          <span className="text-slate-500">Offers Extended</span>
          <p className="text-xl font-mono font-bold text-slate-900 mt-1">2</p>
        </div>
      </div>

      {/* Candidate Pipeline Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs">
          <h3 className="font-semibold text-slate-900 text-sm">
            Applicants for: <span className="font-bold">{activeJob.title}</span> ({activeJob.company})
          </h3>
          <span className="text-slate-500 font-mono">{candidatesList.length} Candidates</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 sm:px-6">Candidate</th>
                <th className="py-3 px-4">Match</th>
                <th className="py-3 px-4">CV Score</th>
                <th className="py-3 px-4">Coding Score</th>
                <th className="py-3 px-4">Problems Solved</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {candidatesList.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center space-x-3">
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        className="w-8 h-8 rounded object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{cand.name}</p>
                        <p className="text-slate-500 text-[11px]">{cand.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        cand.matchScore >= 90
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : cand.matchScore >= 80
                          ? 'bg-slate-100 text-slate-800 border border-slate-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {cand.matchScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">{cand.cvScore}%</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">{cand.codingScore}%</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">{cand.leetcodeCount} problems</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {cand.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => {
                          setSelectedCandidate(cand);
                          setScreeningEvaluation(null);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition"
                      >
                        Inspect
                      </button>

                      <button
                        onClick={() => onUpdateCandidateStatus(cand.id, 'Interview')}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                        title="Invite to Interview"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Deep Screening Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white border border-slate-200 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl text-slate-900 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3.5">
                <img
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.name}
                  className="w-12 h-12 rounded object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-500">{selectedCandidate.role} • {selectedCandidate.email}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Profile Overview Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-slate-500 text-[10px] font-sans">Match Score</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{selectedCandidate.matchScore}%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-slate-500 text-[10px] font-sans">CV ATS Score</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{selectedCandidate.cvScore}%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-slate-500 text-[10px] font-sans">Coding Score</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{selectedCandidate.codingScore}%</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-slate-500 text-[10px] font-sans">Problems Solved</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{selectedCandidate.leetcodeCount}</p>
              </div>
            </div>

            {/* Candidate Strengths & Improvement Areas */}
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-slate-900 uppercase tracking-wide text-[11px]">Strong Points:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.strongPoints.map((sp) => (
                    <span key={sp} className="px-2.5 py-1 rounded bg-slate-50 text-slate-800 border border-slate-200 font-medium">
                      ✓ {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-slate-900 uppercase tracking-wide text-[11px]">Improvement Opportunities:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.improvementAreas.map((ia) => (
                    <span key={ia} className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                      ✕ {ia}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Screening Rationale */}
            <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                  <span>AI Screening Evaluation</span>
                </span>
                {!screeningEvaluation && (
                  <button
                    onClick={() => handleRunAiScreening(selectedCandidate)}
                    disabled={isScreeningAi}
                    className="text-xs text-slate-700 hover:text-slate-900 underline font-medium"
                  >
                    {isScreeningAi ? 'Evaluating...' : 'Run Real-Time Evaluation'}
                  </button>
                )}
              </div>

              <p className="text-slate-600 leading-relaxed">
                {screeningEvaluation
                  ? screeningEvaluation.advisorySummary
                  : 'Candidate demonstrates strong algorithmic foundations with verified problem-solving experience (342 problems solved, high accuracy). High proficiency in Python and SQL indexing matches backend microservice criteria.'}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    onUpdateCandidateStatus(selectedCandidate.id, 'Rejected');
                    setSelectedCandidate(null);
                  }}
                  className="px-3.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-rose-700 font-medium text-xs transition border border-slate-200"
                >
                  Reject
                </button>

                <button
                  onClick={() => {
                    onUpdateCandidateStatus(selectedCandidate.id, 'Assessment');
                    setSelectedCandidate(null);
                  }}
                  className="px-3.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs transition border border-slate-200"
                >
                  Invite to Assessment
                </button>

                <button
                  onClick={() => {
                    onUpdateCandidateStatus(selectedCandidate.id, 'Interview');
                    setSelectedCandidate(null);
                  }}
                  className="px-3.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition"
                >
                  Invite to Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
