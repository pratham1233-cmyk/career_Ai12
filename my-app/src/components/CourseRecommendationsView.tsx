import React, { useState } from 'react';
import { Course } from '../types/career';
import {
  BookOpen,
  Sparkles,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Play,
  ExternalLink,
  Video,
  CreditCard,
  Award,
  Filter,
} from 'lucide-react';

interface CourseRecommendationsViewProps {
  courses: Course[];
  targetCareer: string;
}

export const CourseRecommendationsView: React.FC<CourseRecommendationsViewProps> = ({
  courses: allCourses,
  targetCareer,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<string>(targetCareer || 'Software Developer');
  const [typeFilter, setTypeFilter] = useState<'all' | 'youtube' | 'paid'>('all');

  const availableCareerPaths = [
    'Software Developer',
    'Backend Systems',
    'AI & Machine Learning',
    'Cloud & DevOps',
    'Data Scientist',
  ];

  // Filter courses by career path and type
  const careerFilteredCourses = allCourses.filter((course) => {
    if (!course.careerPath) return true;
    return (
      course.careerPath.toLowerCase().includes(selectedCareer.toLowerCase()) ||
      selectedCareer.toLowerCase().includes(course.careerPath.toLowerCase())
    );
  });

  const displayedCourses = careerFilteredCourses.filter((course) => {
    if (typeFilter === 'all') return true;
    return course.type === typeFilter;
  });

  const youtubeCoursesCount = careerFilteredCourses.filter((c) => c.type === 'youtube').length;
  const paidCoursesCount = careerFilteredCourses.filter((c) => c.type === 'paid').length;

  return (
    <div className="space-y-6">
      {/* Header - Classic Editorial Design */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium mb-1 flex items-center space-x-2">
            <span>Curated Learning Curriculum</span>
            <span>•</span>
            <span className="text-slate-900 font-semibold">{selectedCareer}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Recommended Courses & Video Paths
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Curated high-impact learning resources for <span className="font-semibold text-slate-900">{selectedCareer}</span>. Access free comprehensive YouTube courses from top instructors and industry-recognized paid certification bootcamps.
          </p>
        </div>

        {/* Breakdown chips */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-md text-xs font-mono">
            <span className="text-red-700 font-semibold">{youtubeCoursesCount}</span>
            <span className="text-slate-500 ml-1">YouTube Free</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-md text-xs font-mono">
            <span className="text-slate-900 font-semibold">{paidCoursesCount}</span>
            <span className="text-slate-500 ml-1">Paid Certified</span>
          </div>
        </div>
      </div>

      {/* Career Path Selector */}
      <div className="bg-white border border-slate-200 p-3 rounded-lg space-y-2">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Select Career Path Curriculum:
        </span>
        <div className="flex flex-wrap gap-2">
          {availableCareerPaths.map((career) => {
            const isSelected = selectedCareer.toLowerCase() === career.toLowerCase();
            return (
              <button
                key={career}
                onClick={() => setSelectedCareer(career)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {career}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resource Type Filter Pills */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-slate-500 font-medium mr-1">Resource Type:</span>
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1 rounded transition ${
              typeFilter === 'all'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Resources ({careerFilteredCourses.length})
          </button>
          <button
            onClick={() => setTypeFilter('youtube')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded transition ${
              typeFilter === 'youtube'
                ? 'bg-red-700 text-white font-medium'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Free YouTube Courses ({youtubeCoursesCount})</span>
          </button>
          <button
            onClick={() => setTypeFilter('paid')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded transition ${
              typeFilter === 'paid'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Top Paid Courses ({paidCoursesCount})</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          Showing {displayedCourses.length} recommendation{displayedCourses.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedCourses.map((course) => {
          const isYouTube = course.type === 'youtube' || course.provider.toLowerCase().includes('youtube');

          return (
            <div
              key={course.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:border-slate-400 transition flex flex-col justify-between group"
            >
              <div>
                {/* Header Image & Tags */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Resource Type Badge */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    {isYouTube ? (
                      <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-600 text-white font-semibold text-[11px] shadow-sm">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        <span>YouTube Video Course</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-900 text-white font-semibold text-[11px] shadow-sm">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Paid Certification</span>
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded bg-white/95 text-slate-900 font-mono text-[11px] font-bold shadow-xs">
                      {course.price || (isYouTube ? 'Free on YouTube' : 'Paid')}
                    </span>
                  </div>

                  {/* Rating & Duration in overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center space-x-1 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-300 text-[11px]">
                        ({course.studentsCount > 1000 ? `${(course.studentsCount / 1000).toFixed(0)}k` : course.studentsCount} learners)
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs text-[11px]">
                      <Clock className="w-3 h-3 text-slate-300" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-5 space-y-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-600 uppercase tracking-wide">
                        {course.channelName || course.provider}
                      </span>
                      <span className="text-slate-500 font-medium">{course.difficulty}</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-slate-700 transition leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  {/* Why recommended */}
                  <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">Why Recommended: </span>
                    {course.whyRecommended}
                  </div>

                  {/* Skills Covered */}
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-medium">Skills Taught:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.skillsCovered.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button & Link */}
              <div className="p-5 pt-0">
                <a
                  href={course.url || 'https://www.youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md text-xs font-semibold transition ${
                    isYouTube
                      ? 'bg-red-700 hover:bg-red-800 text-white shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  {isYouTube ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Free on YouTube</span>
                      <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Enroll in Paid Course</span>
                      <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                    </>
                  )}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
