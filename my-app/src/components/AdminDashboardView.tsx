import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Briefcase,
  BookOpen,
  Code2,
  TrendingUp,
  Award,
  Settings,
  BarChart3,
  Layers,
  Database,
  Search,
  CheckCircle,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'jobs' | 'questions'>('analytics');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>System Administrator Control Center</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Platform Analytics & Governance</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor ecosystem metrics, adaptive learning health, recruiter velocity, and database collections.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {(['analytics', 'users', 'jobs', 'questions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row (Section 25) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 font-medium">Total Users</span>
          <p className="text-xl font-black text-white mt-1">42,850</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+18% this month</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 font-medium">Active Students</span>
          <p className="text-xl font-black text-indigo-400 mt-1">38,120</p>
          <span className="text-[10px] text-slate-500">89% of base</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 font-medium">Recruiters</span>
          <p className="text-xl font-black text-purple-400 mt-1">1,240</p>
          <span className="text-[10px] text-purple-300">420 Verified Orgs</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 font-medium">Live Jobs</span>
          <p className="text-xl font-black text-white mt-1">3,490</p>
          <span className="text-[10px] text-emerald-400">92% active match</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 font-medium">Questions Solved</span>
          <p className="text-xl font-black text-amber-400 mt-1">584,200</p>
          <span className="text-[10px] text-amber-300">Adaptive AI</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400 font-medium">Successful Hires</span>
          <p className="text-xl font-black text-emerald-400 mt-1">2,810</p>
          <span className="text-[10px] text-emerald-300">Avg. 18 days</span>
        </div>
      </div>

      {/* Analytics Visual Breakdown */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most Popular Programming Languages */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Most Popular Programming Languages</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">1. Python</span>
                  <span className="text-white font-bold">42% (17,900 learners)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">2. JavaScript / TypeScript</span>
                  <span className="text-white font-bold">28% (11,940 learners)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '28%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">3. SQL</span>
                  <span className="text-white font-bold">14% (5,980 learners)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '14%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">4. Go</span>
                  <span className="text-white font-bold">10% (4,280 learners)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">5. C++ & Rust</span>
                  <span className="text-white font-bold">6% (2,570 learners)</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '6%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Most Practiced Weak Topics */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Highest Adaptive Drill Volumes</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">1. Recursion & Tree Traversals</span>
                  <span className="text-rose-400 font-bold">54% Avg Accuracy</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '54%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">2. Dynamic Programming (1D & 2D)</span>
                  <span className="text-amber-400 font-bold">58% Avg Accuracy</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '58%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">3. SQL Window Functions & Index Plans</span>
                  <span className="text-blue-400 font-bold">71% Avg Accuracy</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '71%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300 font-medium">4. Docker & Microservices Architecture</span>
                  <span className="text-purple-400 font-bold">62% Avg Accuracy</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '62%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entity Tables Preview */}
      {activeTab !== 'analytics' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="font-bold text-white text-sm capitalize">Manage {activeTab} Records</h4>
            <span className="text-slate-400">Database Collection Synced</span>
          </div>
          <p className="text-slate-300">
            CRUD management interface for {activeTab}. Admins can modify requirements, update question banks, seed courses, or archive postings.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-400 text-[11px]">
            Ready for real-time Firestore collection mapping: /{activeTab}
          </div>
        </div>
      )}
    </div>
  );
};
