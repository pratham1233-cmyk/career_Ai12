import React, { useState } from 'react';
import { IndustryTrend } from '../types/career';
import { fetchLiveTrendsApi } from '../services/aiApi';
import {
  TrendingUp,
  Search,
  Globe,
  Sparkles,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Code2,
  Briefcase,
  Zap,
} from 'lucide-react';

interface IndustryTrendsViewProps {
  trends: IndustryTrend[];
  targetDomain: string;
}

export const IndustryTrendsView: React.FC<IndustryTrendsViewProps> = ({
  trends: initialTrends,
  targetDomain,
}) => {
  const [trendsList, setTrendsList] = useState<IndustryTrend[]>(initialTrends);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('Real-time sync ready');

  const handleRefreshLiveTrends = async () => {
    setIsLoadingLive(true);
    try {
      const result = await fetchLiveTrendsApi(targetDomain || 'Software Development & AI');
      if (result.trends && result.trends.length > 0) {
        setTrendsList(result.trends);
      }
      if (result.groundingSources) {
        setGroundingSources(result.groundingSources);
      }
      if (result.webQueries) {
        setSearchQueries(result.webQueries);
      }
      setLastUpdated(`Updated just now (${new Date().toLocaleTimeString()}) via Google Search`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingLive(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Search Grounded Market Intel</span>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Current Tech Industry Trends</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time market growth indicators, emerging technologies, and in-demand skills grounded in live search data.
          </p>
        </div>

        <button
          onClick={handleRefreshLiveTrends}
          disabled={isLoadingLive}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/25 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLive ? 'animate-spin' : ''}`} />
          <span>{isLoadingLive ? 'Querying Google Search...' : 'Refresh Live Trends (Search Grounding)'}</span>
        </button>
      </div>

      {/* Google Search Grounding Verification Pill */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center space-x-3 text-xs text-slate-300">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2 font-bold text-white">
              <span>Google Search Grounding Active</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                gemini-3.8-flash + googleSearch
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{lastUpdated}</p>
          </div>
        </div>

        {searchQueries.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {searchQueries.slice(0, 2).map((query, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 text-[10px] font-mono border border-slate-700/60"
              >
                🔍 "{query}"
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Trends Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trendsList.map((trend) => {
          let popClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
          if (trend.popularity === 'Extremely High') {
            popClass = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
          }

          return (
            <div
              key={trend.id || trend.name}
              className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 shadow-xl transition space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${popClass}`}>
                    {trend.popularity} Popularity
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5">{trend.name}</h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-emerald-400 font-mono">
                    {trend.growthIndicator}
                  </span>
                  <p className="text-[10px] text-slate-500">Market Demand</p>
                </div>
              </div>

              {/* Why It Matters */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-300">Why It Matters:</span>
                <p className="text-xs text-slate-400 leading-relaxed">{trend.whyItMatters}</p>
              </div>

              {/* Related Jobs */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Related Roles:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {trend.relatedJobs?.map((job) => (
                    <span
                      key={job}
                      className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[11px] border border-slate-700/60"
                    >
                      {job}
                    </span>
                  ))}
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Required Skills:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {trend.requiredSkills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 text-[10px] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations Box */}
              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                {trend.recommendedCourses && trend.recommendedCourses.length > 0 && (
                  <div className="flex items-start space-x-2 text-slate-300">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-purple-300">Learning:</strong> {trend.recommendedCourses.join(', ')}
                    </span>
                  </div>
                )}
                {trend.recommendedPractice && (
                  <div className="flex items-start space-x-2 text-slate-300">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-amber-300">Practice:</strong> {trend.recommendedPractice}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
