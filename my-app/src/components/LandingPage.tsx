import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  FileText,
  Compass,
  TrendingUp,
  Briefcase,
  Users,
  CheckCircle2,
  HardDrive,
  FileSpreadsheet,
  Zap,
} from 'lucide-react';

interface LandingPageProps {
  onStartStudent: () => void;
  onStartRecruiter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartStudent,
  onStartRecruiter,
}) => {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section - Classic Editorial */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
          <span>Career Command Center & Talent Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
          Know Where You Stand.
          <br />
          Know What to Learn.
          <br />
          Know Your Next Move.
        </h1>

        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          An integrated platform synthesizing ATS CV analysis, adaptive coding drills, interview preparation, and real-time job market matching.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartStudent}
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition flex items-center justify-center space-x-2"
          >
            <span>Start Candidate Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStartRecruiter}
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-medium text-sm transition flex items-center justify-center space-x-2"
          >
            <Briefcase className="w-4 h-4 text-slate-600" />
            <span>Recruiter Pipeline</span>
          </button>
        </div>

        {/* Google Workspace Integration Callout Pill */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <HardDrive className="w-3.5 h-3.5 text-slate-600" />
            <span>Google Drive Resume Export</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
            <span>Google Sheets Pipeline Sync</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-slate-600" />
            <span>Grounded Market Trends</span>
          </div>
        </div>
      </section>

      {/* Product Principle: 3 Questions */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-slate-900">The Core Intelligence Principle</h2>
          <p className="text-xs text-slate-500 mt-1">Every student gets clear answers to three essential questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 text-slate-900 font-mono flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">Where Am I?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Objective diagnosis of current skill levels, verified problem solve counts, ATS CV scoring, and competitor percentile benchmarks.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 text-slate-900 font-mono flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">Where Do I Want To Go?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Targeted career tracks, salary benchmarks, and matching job postings aligned to target engineering roles.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-2">
            <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 text-slate-900 font-mono flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">What Should I Do Next?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adaptive daily practice drills calibrated to your weakest areas, targeted interview preparation, and direct applications.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-slate-900">Platform Capabilities</h2>
          <p className="text-xs text-slate-500 mt-1">A unified system for candidate growth and recruiter assessment</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-xs">
            <FileText className="w-5 h-5 text-slate-700" />
            <h4 className="font-serif font-bold text-slate-900 text-sm">CV & ATS Analysis</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant section-by-section scoring, missing detail identification, and targeted portfolio project recommendations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-xs">
            <Code2 className="w-5 h-5 text-slate-700" />
            <h4 className="font-serif font-bold text-slate-900 text-sm">Adaptive Coding Practice</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diagnostic engines that detect weak concepts and synthesize targeted drills across 10 programming languages.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-xs">
            <TrendingUp className="w-5 h-5 text-slate-700" />
            <h4 className="font-serif font-bold text-slate-900 text-sm">Live Industry Trends</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Grounded in live search data to deliver current hiring volume, in-demand frameworks, and compensation ranges.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-xs">
            <Compass className="w-5 h-5 text-slate-700" />
            <h4 className="font-serif font-bold text-slate-900 text-sm">Curated Course Catalog</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-yield free video courses and certified professional training bootcamps mapped directly to target engineering disciplines.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-xs">
            <Briefcase className="w-5 h-5 text-slate-700" />
            <h4 className="font-serif font-bold text-slate-900 text-sm">Job Matching & Standing</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Percentile rank comparison ("Top 18% of applicants") and actionable 14-day technical interview preparation plans.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-lg space-y-2 shadow-xs">
            <Users className="w-5 h-5 text-slate-700" />
            <h4 className="font-serif font-bold text-slate-900 text-sm">Recruiter AI Screening</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Objective, job-relevant candidate scoring, interview comparison tables, and exportable talent pipelines.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
