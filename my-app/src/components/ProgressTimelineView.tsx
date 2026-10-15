import React from 'react';
import { TimelineEvent } from '../types/career';
import {
  FileText,
  Target,
  Code2,
  Award,
  Send,
  CheckCircle2,
  Briefcase,
  Sparkles,
} from 'lucide-react';

interface ProgressTimelineViewProps {
  timeline: TimelineEvent[];
}

export const ProgressTimelineView: React.FC<ProgressTimelineViewProps> = ({ timeline }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-4 h-4" />;
      case 'Target':
        return <Target className="w-4 h-4" />;
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      case 'Award':
        return <Award className="w-4 h-4" />;
      case 'Send':
        return <Send className="w-4 h-4" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>End-to-End Progression Lifecycle</span>
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mt-1">Student Career Journey Timeline</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          From Discover → Learn → Practice → Measure → Improve → Apply → Get Hired.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-8">
          {timeline.map((item, idx) => {
            let statusDot = 'bg-slate-800 border-slate-700 text-slate-400';
            if (item.status === 'done') {
              statusDot = 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30';
            } else if (item.status === 'current') {
              statusDot = 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/50 animate-pulse';
            }

            return (
              <div key={item.id} className="relative pl-6 sm:pl-8 group">
                {/* Node Dot */}
                <div
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${statusDot}`}
                >
                  {getIcon(item.icon)}
                </div>

                {/* Content Card */}
                <div className="bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-lg space-y-1.5 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-sm font-bold text-white">{item.title}</span>
                    <span className="text-[11px] font-mono text-indigo-400 font-semibold">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
