import React from 'react';
import { JobApplication } from '../types/career';
import {
  Clock,
} from 'lucide-react';

interface ApplicationTrackerViewProps {
  applications: JobApplication[];
  onUpdateStatus: (id: string, status: JobApplication['status']) => void;
}

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  applications,
  onUpdateStatus,
}) => {
  const statuses: JobApplication['status'][] = [
    'Applied',
    'Under Review',
    'Shortlisted',
    'Assessment',
    'Interview',
    'Final Interview',
    'Offer',
    'Hired',
    'Rejected',
  ];

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'Offer':
      case 'Hired':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-bold';
      case 'Interview':
      case 'Final Interview':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30 font-bold';
      case 'Shortlisted':
      case 'Assessment':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-semibold';
      case 'Rejected':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hiring Pipeline Lifecycle</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Application Tracker</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor interview progression and recruiter milestones.
          </p>
        </div>
      </div>

      {/* Applications Table Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Company</th>
                <th className="py-3.5 px-4">Position</th>
                <th className="py-3.5 px-4">AI Match</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Applied Date</th>
                <th className="py-3.5 px-4">Progress Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center font-bold text-indigo-300">
                        {app.company[0]}
                      </div>
                      <span className="font-bold text-white text-sm">{app.company}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-200">{app.jobTitle}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                      {app.matchScore}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{app.appliedDate}</td>
                  <td className="py-4 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value as any)}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
