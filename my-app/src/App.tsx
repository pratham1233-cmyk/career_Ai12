import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout } from './services/firebase';
import { uploadToGoogleDrive, createGoogleSheet } from './services/googleWorkspace';
import {
  initialStudentProfile,
  initialSkills,
  initialLeetCodeData,
  initialCvAnalysis,
  initialCourses,
  initialQuestions,
  initialJobs,
  initialApplications,
  initialTrends,
  initialTimeline,
  initialRecruiterCandidates,
  initialNotifications,
} from './data/mockData';
import {
  UserRole,
  StudentProfile,
  SkillScore,
  LeetCodeData,
  CVAnalysisResult,
  Course,
  PracticeQuestion,
  Job,
  JobApplication,
  IndustryTrend,
  TimelineEvent,
  RecruiterCandidate,
  PlatformNotification,
} from './types/career';

// Components
import { Navbar } from './components/Navbar';
import { StudentCommandCenter } from './components/StudentCommandCenter';
import { CVAnalysisView } from './components/CVAnalysisView';
import { SmartCodingPracticeView } from './components/SmartCodingPracticeView';
import { IndustryTrendsView } from './components/IndustryTrendsView';
import { CourseRecommendationsView } from './components/CourseRecommendationsView';
import { JobDiscoveryView } from './components/JobDiscoveryView';
import { ApplicationTrackerView } from './components/ApplicationTrackerView';
import { ProgressTimelineView } from './components/ProgressTimelineView';
import { RecruiterDashboardView } from './components/RecruiterDashboardView';
import { WorkspaceExportModal } from './components/WorkspaceExportModal';
import { InterviewPreparationView } from './components/InterviewPreparationView';
import { Lock, Eye, EyeOff, ShieldCheck, X, KeyRound } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('command-center');

  // Recruiter Password Gate State
  const [isRecruiterUnlocked, setIsRecruiterUnlocked] = useState<boolean>(false);
  const [showRecruiterAuthModal, setShowRecruiterAuthModal] = useState<boolean>(false);
  const [recruiterPasswordInput, setRecruiterPasswordInput] = useState<string>('');
  const [recruiterAuthError, setRecruiterAuthError] = useState<string | null>(null);
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);

  // User & Auth State
  const [user, setUser] = useState<User | null>(null);

  // Platform Entities State
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(initialStudentProfile);
  const [skills, setSkills] = useState<SkillScore[]>(initialSkills);
  const [leetcodeData, setLeetcodeData] = useState<LeetCodeData>(initialLeetCodeData);
  const [cvAnalysis, setCvAnalysis] = useState<CVAnalysisResult>(initialCvAnalysis);
  const [interviewReadiness, setInterviewReadiness] = useState<number>(68);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [questions, setQuestions] = useState<PracticeQuestion[]>(initialQuestions);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [trends, setTrends] = useState<IndustryTrend[]>(initialTrends);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(initialTimeline);
  const [recruiterCandidates, setRecruiterCandidates] = useState<RecruiterCandidate[]>(initialRecruiterCandidates);
  const [notifications, setNotifications] = useState<PlatformNotification[]>(initialNotifications);
  const displayedStudentProfile = user
    ? {
        ...studentProfile,
        name: user.displayName || studentProfile.name,
        email: user.email || studentProfile.email,
        avatar: user.photoURL || studentProfile.avatar,
      }
    : studentProfile;

  // Google Workspace Export Modal State
  const [exportModalState, setExportModalState] = useState<{
    isOpen: boolean;
    type: 'drive' | 'sheets';
    title: string;
    description: string;
    itemCount?: number;
    isProcessing: boolean;
    resultUrl?: string;
    error: string | null;
    actionPayload?: () => Promise<any>;
  }>({
    isOpen: false,
    type: 'drive',
    title: '',
    description: '',
    isProcessing: false,
    resultUrl: undefined,
    error: null,
  });

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
      },
      () => {
        setUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setUser(res.user);
      }
    } catch (err: any) {
      console.error('Sign-in failure:', err);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    await logout();
    setUser(null);
  };

  // Handle Role Selection with Password Check for Recruiter
  const handleSelectRole = (role: UserRole) => {
    if (role === 'recruiter') {
      if (!isRecruiterUnlocked) {
        setRecruiterPasswordInput('');
        setRecruiterAuthError(null);
        setShowRecruiterAuthModal(true);
        return;
      }
      setActiveRole('recruiter');
      setActiveTab('recruiter-dashboard');
    } else {
      setActiveRole('student');
      setActiveTab('command-center');
    }
  };

  const handleCloseRecruiterAuth = () => {
    setShowRecruiterAuthModal(false);
    setRecruiterPasswordInput('');
    setRecruiterAuthError(null);
    setActiveRole('student');
    setActiveTab('command-center');
  };

  const handleVerifyRecruiterPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPassword = recruiterPasswordInput.trim();
    // Accepted default demo passwords
    if (cleanPassword === 'recruiter123' || cleanPassword === 'admin123' || cleanPassword === 'hire2026') {
      setIsRecruiterUnlocked(true);
      setShowRecruiterAuthModal(false);
      setActiveRole('recruiter');
      setActiveTab('recruiter-dashboard');
      setRecruiterAuthError(null);
    } else {
      setRecruiterAuthError('Incorrect password');
    }
  };

  const handleLockRecruiterMode = () => {
    setIsRecruiterUnlocked(false);
    setActiveRole('student');
    setActiveTab('command-center');
  };

  // Skill Score Boost (e.g. from practice engine)
  const handleSkillScoreBoost = (skillName: string, delta: number) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name.toLowerCase() === skillName.toLowerCase()) {
          const newScore = Math.min(100, s.score + delta);
          return {
            ...s,
            score: newScore,
            history: [...s.history, { date: 'Today', score: newScore }],
          };
        }
        return s;
      })
    );

    setStudentProfile((prev) => ({
      ...prev,
      careerReadiness: Math.min(100, prev.careerReadiness + 1),
    }));

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: `Skill Score Elevated: ${skillName}`,
        message: `Your verified ${skillName} score increased by +${delta} points after completed practice drills!`,
        type: 'practice',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  // Workspace integration exports
  const handleRequestDriveExport = (filename: string, content: string) => {
    setExportModalState({
      isOpen: true,
      type: 'drive',
      title: 'Export Evaluation Report to Google Drive',
      description: `Save "${filename}" directly into your Google Drive root directory.`,
      isProcessing: false,
      error: null,
      actionPayload: async () => {
        return await uploadToGoogleDrive(filename, content);
      },
    });
  };

  const handleRequestSheetsExport = (title: string, headers: string[], rows: (string | number)[][]) => {
    setExportModalState({
      isOpen: true,
      type: 'sheets',
      title: 'Export Data Spreadsheet to Google Sheets',
      description: `Create a formatted spreadsheet "${title}" containing ${rows.length} records.`,
      itemCount: rows.length,
      isProcessing: false,
      error: null,
      actionPayload: async () => {
        return await createGoogleSheet(title, headers, rows);
      },
    });
  };

  const handleExecuteExportModalConfirm = async () => {
    if (!exportModalState.actionPayload) return;
    setExportModalState((prev) => ({ ...prev, isProcessing: true, error: null }));
    try {
      const result = await exportModalState.actionPayload();
      setExportModalState((prev) => ({
        ...prev,
        isProcessing: false,
        resultUrl: result?.url || result?.webViewLink || 'https://drive.google.com',
      }));
    } catch (err: any) {
      setExportModalState((prev) => ({
        ...prev,
        isProcessing: false,
        error: err.message || 'Operation failed. Please verify Workspace access.',
      }));
    }
  };

  const handleApplyJob = (newApp: JobApplication) => {
    setApplications((prev) => [newApp, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'Application Submitted',
        message: `Successfully applied to ${newApp.jobTitle} at ${newApp.company}! Track status in Application Tracker.`,
        type: 'application',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-800 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar
        activeRole={activeRole}
        onSelectRole={handleSelectRole}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
        }}
        user={user}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        notifications={notifications}
        onMarkNotificationRead={(id) =>
          setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
        }
        isRecruiterUnlocked={isRecruiterUnlocked}
      />

      {/* Main View Port Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          {activeRole === 'recruiter' && (
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-700">Recruiter Session Active</span>
              <button
                onClick={handleLockRecruiterMode}
                className="text-slate-500 hover:text-slate-900 underline ml-2 transition"
              >
                (Lock & Return to Student)
              </button>
            </div>
          )}
        </div>

        {activeRole === 'student' ? (
          <>
            {activeTab === 'command-center' && (
              <StudentCommandCenter
                profile={displayedStudentProfile}
                skills={skills}
                leetcode={leetcodeData}
                cvAnalysis={cvAnalysis}
                topJobs={jobs}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'practice' && (
              <SmartCodingPracticeView
                questions={questions}
                skills={skills}
                onSkillScoreBoost={handleSkillScoreBoost}
              />
            )}

            {activeTab === 'interview-prep' && (
              <InterviewPreparationView
                targetJob={studentProfile.targetCareer + ' (e.g. Stripe, Datadog)'}
                interviewReadiness={interviewReadiness}
                onUpdateReadiness={(val) => setInterviewReadiness(val)}
                onRequestDriveExport={handleRequestDriveExport}
                onRequestSheetsExport={handleRequestSheetsExport}
              />
            )}

            {activeTab === 'courses' && (
              <CourseRecommendationsView
                courses={courses}
                targetCareer={studentProfile.targetCareer}
              />
            )}

            {activeTab === 'cv-analysis' && (
              <CVAnalysisView
                currentAnalysis={cvAnalysis}
                targetCareer={studentProfile.targetCareer}
                candidateName={displayedStudentProfile.name}
                candidateEmail={displayedStudentProfile.email}
                onUpdateAnalysis={(analysis) => setCvAnalysis(analysis)}
                onRequestDriveExport={handleRequestDriveExport}
              />
            )}

            {activeTab === 'trends' && (
              <IndustryTrendsView
                trends={trends}
                targetDomain="Software Development & Generative AI"
              />
            )}

            {activeTab === 'jobs' && (
              <JobDiscoveryView
                jobs={jobs}
                profile={displayedStudentProfile}
                skills={skills}
                leetcode={leetcodeData}
                onApplyJob={handleApplyJob}
                applications={applications}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'applications' && (
              <ApplicationTrackerView
                applications={applications}
                onUpdateStatus={(id, status) =>
                  setApplications((prev) =>
                    prev.map((a) => (a.id === id ? { ...a, status, lastUpdated: 'Today' } : a))
                  )
                }
                onRequestSheetsExport={handleRequestSheetsExport}
              />
            )}

            {activeTab === 'timeline' && <ProgressTimelineView timeline={timeline} />}
          </>
        ) : (
          <RecruiterDashboardView
            candidates={recruiterCandidates}
            jobs={jobs}
            onUpdateCandidateStatus={(id, status) =>
              setRecruiterCandidates((prev) =>
                prev.map((c) => (c.id === id ? { ...c, status } : c))
              )
            }
            onRequestSheetsExport={handleRequestSheetsExport}
          />
        )}
      </main>

      {/* Recruiter Password Authentication Modal */}
      {showRecruiterAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900">
                    Recruiter Portal Authentication
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Authorized hiring personnel access only
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseRecruiterAuth}
                className="text-slate-400 hover:text-slate-700 transition p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleVerifyRecruiterPassword} className="space-y-4">
              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-slate-800">
                  Enter Recruiter Access Password:
                </label>
                <div className="relative">
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    value={recruiterPasswordInput}
                    onChange={(e) => {
                      setRecruiterPasswordInput(e.target.value);
                      setRecruiterAuthError(null);
                    }}
                    autoFocus
                    placeholder="Enter password..."
                    className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-200 rounded-md text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-500 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {recruiterAuthError && (
                  <p className="text-rose-600 text-xs font-medium pt-1">
                    {recruiterAuthError}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseRecruiterAuth}
                  className="px-4 py-2 rounded-md border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
                >
                  Unlock Recruiter Mode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Workspace Google Drive & Sheets Confirmation Modal */}
      <WorkspaceExportModal
        isOpen={exportModalState.isOpen}
        onClose={() => setExportModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleExecuteExportModalConfirm}
        type={exportModalState.type}
        title={exportModalState.title}
        description={exportModalState.description}
        itemCount={exportModalState.itemCount}
        isProcessing={exportModalState.isProcessing}
        resultUrl={exportModalState.resultUrl}
        error={exportModalState.error}
      />
    </div>
  );
}
