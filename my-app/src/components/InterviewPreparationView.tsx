import React, { useState } from 'react';
import { Job, BehavioralQuestion, WhiteboardProblem, MockInterviewSession } from '../types/career';
import { initialBehavioralQuestions, initialWhiteboardProblems } from '../data/mockData';
import { evaluateInterviewAnswerApi, critiqueSystemDesignApi } from '../services/aiApi';
import confetti from 'canvas-confetti';
import {
  Mic,
  MessageSquare,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Send,
  HardDrive,
  FileSpreadsheet,
  Award,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Clock,
  Database,
  Server,
  Cpu,
  Workflow,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface InterviewPreparationViewProps {
  targetJob: string;
  interviewReadiness: number;
  onUpdateReadiness: (newReadiness: number) => void;
  onRequestDriveExport: (filename: string, content: string) => void;
  onRequestSheetsExport: (title: string, headers: string[], rows: (string | number)[][]) => void;
}

export const InterviewPreparationView: React.FC<InterviewPreparationViewProps> = ({
  targetJob,
  interviewReadiness,
  onUpdateReadiness,
  onRequestDriveExport,
  onRequestSheetsExport,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'mock' | 'behavioral' | 'whiteboard'>('mock');

  // Live Mock Interview State
  const [mockMode, setMockMode] = useState<'behavioral' | 'technical'>('behavioral');
  const [currentMockQuestionIndex, setCurrentMockQuestionIndex] = useState<number>(0);
  
  const technicalMockQuestions = [
    'How would you handle cache stampedes and database failovers in a high-throughput microservices architecture?',
    'Explain how you would design an idempotent payment processing API to handle network retries without duplicate charges.',
    'How would you diagnose and resolve a severe memory leak in a long-running backend service worker?',
    'Walk me through the trade-offs between optimistic locking vs. pessimistic locking in PostgreSQL transactions.',
    'How would you architect a distributed rate-limiting middleware that scales reliably across multiple application servers?',
    'What strategy would you use to migrate a monolithic SQL database to distributed microservices with zero downtime?',
  ];

  const currentQuestionsPool =
    mockMode === 'behavioral'
      ? initialBehavioralQuestions.map((q) => q.question)
      : technicalMockQuestions;

  const [currentMockQuestion, setCurrentMockQuestion] = useState<string>(
    initialBehavioralQuestions[0].question
  );
  const [userAnswerText, setUserAnswerText] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);

  const handleNextMockQuestion = () => {
    const nextIdx = (currentMockQuestionIndex + 1) % currentQuestionsPool.length;
    setCurrentMockQuestionIndex(nextIdx);
    setCurrentMockQuestion(currentQuestionsPool[nextIdx]);
    setUserAnswerText('');
    setEvaluationResult(null);
  };

  // Behavioral Questions state
  const [selectedCompetency, setSelectedCompetency] = useState<string>('All');
  const [expandedBqId, setExpandedBqId] = useState<string | null>(initialBehavioralQuestions[0].id);

  // Technical Whiteboard state
  const [selectedWbProblem, setSelectedWbProblem] = useState<WhiteboardProblem>(
    initialWhiteboardProblems[0]
  );
  const [selectedComponents, setSelectedComponents] = useState<string[]>([
    'Client Applications (Web / Mobile)',
    'Global DNS / CDN / Cloudflare',
    'API Gateway (Kong / Envoy)',
    'Distributed Cache (Redis Cluster with Redis Sentinel)',
    'Rate Limiter Worker Service (Go / Python)',
    'Configuration Store (PostgreSQL / DynamoDB)',
  ]);
  const [capacityAssumptions, setCapacityAssumptions] = useState<string>(
    initialWhiteboardProblems[0].defaultCapacity
  );
  const [architectureNotes, setArchitectureNotes] = useState<string>(
    initialWhiteboardProblems[0].sampleArchitectureNotes
  );
  const [isCritiquingWb, setIsCritiquingWb] = useState<boolean>(false);
  const [whiteboardCritique, setWhiteboardCritique] = useState<any | null>(null);

  const availableComponentsBank = [
    'Client Applications (Web / Mobile)',
    'Global DNS / CDN / Cloudflare',
    'Load Balancer (Nginx / AWS ALB)',
    'API Gateway (Kong / Envoy)',
    'Authentication & Token Service (JWT/OAuth)',
    'Distributed Cache (Redis Cluster with Redis Sentinel)',
    'Application Microservices (Go / Python)',
    'Message Broker / Event Log (Apache Kafka)',
    'Async Worker Pool (Celery / Background Tasks)',
    'Relational Database (PostgreSQL with Read Replicas)',
    'Distributed NoSQL Store (DynamoDB / Cassandra)',
    'Object Storage (AWS S3 / GCP Cloud Storage)',
    'Dead Letter Queue (DLQ)',
    'Observability & OpenTelemetry Metrics',
  ];

  const handleToggleComponent = (comp: string) => {
    setSelectedComponents((prev) =>
      prev.includes(comp) ? prev.filter((c) => c !== comp) : [...prev, comp]
    );
  };

  const handleRunAnswerEvaluation = async () => {
    if (!userAnswerText.trim() || isEvaluating) return;
    setIsEvaluating(true);
    try {
      const res = await evaluateInterviewAnswerApi(
        targetJob,
        currentMockQuestion,
        mockMode === 'behavioral' ? 'Behavioral (STAR)' : 'Technical Architecture',
        userAnswerText
      );
      setEvaluationResult(res);

      if (res.score >= 80) {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.7 },
        });
        onUpdateReadiness(Math.min(100, interviewReadiness + 3));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRunSystemDesignCritique = async () => {
    setIsCritiquingWb(true);
    try {
      const res = await critiqueSystemDesignApi(
        selectedWbProblem.title,
        selectedComponents,
        capacityAssumptions,
        architectureNotes
      );
      setWhiteboardCritique(res);
      if (res.scalabilityScore >= 80) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
        onUpdateReadiness(Math.min(100, interviewReadiness + 4));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCritiquingWb(false);
    }
  };

  const handleExportEvaluationToDrive = () => {
    if (!evaluationResult) return;
    const content = `
CAREERAI MOCK INTERVIEW EVALUATION
Target Job: ${targetJob}
Date: ${new Date().toLocaleDateString()}
Prompt: ${currentMockQuestion}
Candidate Response: ${userAnswerText}

Overall Score: ${evaluationResult.score}%
Hiring Verdict: ${evaluationResult.verdict}

STAR METHOD BREAKDOWN:
- Situation: ${evaluationResult.starBreakdown?.situation}%
- Task: ${evaluationResult.starBreakdown?.task}%
- Action: ${evaluationResult.starBreakdown?.action}%
- Result: ${evaluationResult.starBreakdown?.result}%

KEY STRENGTHS:
${evaluationResult.strengths?.map((s: string) => `- ${s}`).join('\n')}

AREAS TO POLISH:
${evaluationResult.areasToImprove?.map((a: string) => `- ${a}`).join('\n')}

POLISHED MODEL EXAMPLE:
${evaluationResult.polishedExample}

INTERVIEWER FEEDBACK:
${evaluationResult.interviewerFeedback}
`;
    onRequestDriveExport(`CareerAI_Interview_Evaluation_${Date.now()}.txt`, content);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Classic Layout */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium mb-1">
            <span>Interview Preparation</span>
            <span> • </span>
            <span className="text-slate-800">{targetJob}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Interview Readiness & Practice
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Conduct targeted mock interviews, review vetted STAR behavioral responses, and solve technical whiteboard problems.
          </p>
        </div>

        {/* Readiness Metric */}
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg flex items-center space-x-4 shrink-0">
          <div>
            <div className="flex items-center justify-between text-xs space-x-3">
              <span className="text-slate-500 font-medium">Readiness Score</span>
              <span className="text-slate-900 font-bold font-mono">{interviewReadiness}%</span>
            </div>
            <div className="w-28 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-slate-900 h-full rounded-full transition-all duration-500"
                style={{ width: `${interviewReadiness}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
            Verified
          </span>
        </div>
      </div>

      {/* Subtab Navigation - Classic Clean Pills */}
      <div className="flex items-center space-x-1 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveSubTab('mock')}
          className={`flex items-center space-x-2 px-4 py-2.5 font-medium border-b-2 transition ${
            activeSubTab === 'mock'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Interactive Mock Interview</span>
        </button>

        <button
          onClick={() => setActiveSubTab('behavioral')}
          className={`flex items-center space-x-2 px-4 py-2.5 font-medium border-b-2 transition ${
            activeSubTab === 'behavioral'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Behavioral Question Bank</span>
        </button>

        <button
          onClick={() => setActiveSubTab('whiteboard')}
          className={`flex items-center space-x-2 px-4 py-2.5 font-medium border-b-2 transition ${
            activeSubTab === 'whiteboard'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>System Design & Architecture</span>
        </button>
      </div>

      {/* SUBTAB 1: LIVE AI MOCK INTERVIEW */}
      {activeSubTab === 'mock' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Question & Input */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-500">Interview Mode:</span>
                  <div className="inline-flex rounded-md bg-slate-100 p-0.5 border border-slate-200">
                    <button
                      onClick={() => {
                        setMockMode('behavioral');
                        setCurrentMockQuestion(initialBehavioralQuestions[0].question);
                        setEvaluationResult(null);
                      }}
                      className={`px-2.5 py-1 rounded text-xs transition ${
                        mockMode === 'behavioral'
                          ? 'bg-white text-slate-900 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Behavioral (STAR)
                    </button>
                    <button
                      onClick={() => {
                        setMockMode('technical');
                        setCurrentMockQuestion(
                          'How would you handle cache stampedes and database failovers in a high-throughput microservices architecture?'
                        );
                        setEvaluationResult(null);
                      }}
                      className={`px-2.5 py-1 rounded text-xs transition ${
                        mockMode === 'technical'
                          ? 'bg-white text-slate-900 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Technical Systems
                    </button>
                  </div>
                </div>

                <span className="text-xs text-slate-500 font-mono">Role: {targetJob}</span>
              </div>

              {/* Active Prompt Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                    <Mic className="w-3.5 h-3.5" />
                    <span>Interviewer Question:</span>
                    <span className="font-mono text-slate-400 font-normal">
                      ({currentMockQuestionIndex + 1}/{currentQuestionsPool.length})
                    </span>
                  </div>

                  <button
                    onClick={handleNextMockQuestion}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-medium text-xs transition shadow-2xs"
                    title="Load another interview question"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-500" />
                    <span>Another Question</span>
                  </button>
                </div>
                <h3 className="text-base font-serif font-bold text-slate-900 leading-relaxed">
                  "{currentMockQuestion}"
                </h3>
              </div>

              {/* Candidate Answer Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <label className="font-medium text-slate-700">
                    Your Response (Situation, Task, Action, Result):
                  </label>
                  <span className="font-mono">{userAnswerText.length} characters</span>
                </div>

                <textarea
                  value={userAnswerText}
                  onChange={(e) => setUserAnswerText(e.target.value)}
                  rows={8}
                  placeholder="Outline your response clearly:
- Situation: Set the business context and constraints
- Task: Define your core ownership
- Action: Outline key technical decisions and trade-offs
- Result: Conclude with measurable impact..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-3.5 text-xs sm:text-sm text-slate-900 font-sans leading-relaxed focus:outline-none focus:border-slate-400 focus:bg-white resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() =>
                    setUserAnswerText(
                      `In my previous internship at Bengaluru Tech Labs, we experienced severe P99 latency spikes during peak traffic when users queried filtered order histories (Situation). My task was to identify the root cause in the PostgreSQL data layer and implement a resilient caching strategy without causing data staleness (Task). I analyzed query execution plans using EXPLAIN ANALYZE, added targeted composite B-Tree indexes on (merchant_id, created_at), and implemented a Redis cache with write-through invalidation and a 15-minute TTL (Action). As a result, our P99 read latency dropped from 840ms to 42ms (a 95% reduction), and our database handled 15,000 requests/sec with zero downtime (Result).`
                    )
                  }
                  className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4"
                >
                  Load Sample STAR Response
                </button>

                <button
                  onClick={handleRunAnswerEvaluation}
                  disabled={isEvaluating || !userAnswerText.trim()}
                  className="flex items-center space-x-2 px-5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Evaluating Response...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Evaluate with AI Rubric</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Scorecard & Feedback */}
          <div className="lg:col-span-5 space-y-4">
            {evaluationResult ? (
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
                {/* Score Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Evaluation Score
                    </span>
                    <h4 className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
                      {evaluationResult.score}/100
                    </h4>
                  </div>

                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold uppercase ${
                      evaluationResult.verdict === 'Strong Hire' || evaluationResult.verdict === 'Hire'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {evaluationResult.verdict}
                  </span>
                </div>

                {/* STAR Method Breakdown Sliders */}
                {evaluationResult.starBreakdown && (
                  <div className="space-y-2 text-xs">
                    <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
                      STAR Method Criteria:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500">Situation</span>
                          <span className="text-slate-900 font-mono font-bold">
                            {evaluationResult.starBreakdown.situation}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-slate-800 h-full rounded-full"
                            style={{ width: `${evaluationResult.starBreakdown.situation}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500">Task</span>
                          <span className="text-slate-900 font-mono font-bold">
                            {evaluationResult.starBreakdown.task}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-slate-800 h-full rounded-full"
                            style={{ width: `${evaluationResult.starBreakdown.task}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500">Action</span>
                          <span className="text-slate-900 font-mono font-bold">
                            {evaluationResult.starBreakdown.action}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-slate-800 h-full rounded-full"
                            style={{ width: `${evaluationResult.starBreakdown.action}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500">Result</span>
                          <span className="text-slate-900 font-mono font-bold">
                            {evaluationResult.starBreakdown.result}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-slate-800 h-full rounded-full"
                            style={{ width: `${evaluationResult.starBreakdown.result}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Strengths & Improvements */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Key Strengths:</span>
                    </span>
                    <ul className="mt-1 space-y-1 text-slate-600">
                      {evaluationResult.strengths?.map((s: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-slate-400">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements You Can Make */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-md p-3.5 space-y-2">
                    <span className="font-semibold text-amber-950 flex items-center space-x-1.5 text-xs">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Improvements You Can Make in Your Answer:</span>
                    </span>
                    <ul className="space-y-1.5 text-slate-700 text-xs">
                      {evaluationResult.areasToImprove && evaluationResult.areasToImprove.length > 0 ? (
                        evaluationResult.areasToImprove.map((a: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <span className="text-amber-600 font-bold">•</span>
                            <span className="leading-relaxed">{a}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-600">
                          Add quantitative metrics and highlight specific trade-offs considered.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Modified & Ideal Answer Model */}
                {evaluationResult.polishedExample && (
                  <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                        <span>Modified & Ideal Answer Model:</span>
                      </span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        High Impact
                      </span>
                    </div>
                    <p className="text-slate-800 leading-relaxed italic bg-white p-3 rounded border border-slate-200">
                      "{evaluationResult.polishedExample}"
                    </p>
                  </div>
                )}

                {/* Another Question Action & Drive Export */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleNextMockQuestion}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition shadow-xs"
                  >
                    <span>Practice Another Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleExportEvaluationToDrive}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-medium transition"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-slate-600" />
                    <span>Save Evaluation to Google Drive</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-3">
                <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 text-slate-700 mx-auto flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">Evaluation Rubric</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit your response to generate an objective STAR assessment, scoring breakdown, and feedback calibrated for {targetJob}.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: BEHAVIORAL QUESTIONS STAR BANK */}
      {activeSubTab === 'behavioral' && (
        <div className="space-y-6">
          {/* Competency Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 p-3 rounded-lg text-xs">
            <span className="text-slate-500 font-medium mr-1">Filter by Competency:</span>
            {[
              'All',
              'Ownership & Initiative',
              'Technical Disagreement',
              'Handling Failure & Feedback',
              'Delivering Under Pressure',
            ].map((comp) => (
              <button
                key={comp}
                onClick={() => setSelectedCompetency(comp)}
                className={`px-3 py-1 rounded text-xs transition ${
                  selectedCompetency === comp
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {comp}
              </button>
            ))}
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-3">
            {initialBehavioralQuestions
              .filter((bq) => selectedCompetency === 'All' || bq.competency === selectedCompetency)
              .map((bq) => {
                const isExpanded = expandedBqId === bq.id;

                return (
                  <div
                    key={bq.id}
                    className="bg-white border border-slate-200 rounded-lg overflow-hidden transition"
                  >
                    <div
                      onClick={() => setExpandedBqId(isExpanded ? null : bq.id)}
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/50"
                    >
                      <div className="space-y-1 pr-4">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200">
                            {bq.competency}
                          </span>
                        </div>
                        <h3 className="text-base font-serif font-bold text-slate-900">{bq.question}</h3>
                        <p className="text-xs text-slate-500">{bq.description}</p>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentMockQuestion(bq.question);
                            setMockMode('behavioral');
                            setActiveSubTab('mock');
                          }}
                          className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition flex items-center space-x-1"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Practice</span>
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-6 pt-0 border-t border-slate-100 space-y-4 text-xs">
                        {/* What Interviewers Look For & Red Flags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                          <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-2">
                            <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Key Assessment Criteria:</span>
                            </span>
                            <ul className="space-y-1 text-slate-600">
                              {bq.whatToLookFor.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-1.5">
                                  <span className="text-slate-400">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-2">
                            <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
                              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                              <span>Common Red Flags:</span>
                            </span>
                            <ul className="space-y-1 text-slate-600">
                              {bq.redFlags.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-1.5">
                                  <span className="text-slate-400">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* STAR Model Response Breakdown */}
                        <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
                          <span className="font-semibold text-slate-900 flex items-center space-x-1.5 text-xs">
                            <Award className="w-4 h-4 text-slate-700" />
                            <span>Vetted STAR Response Structure:</span>
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                            <div className="p-3 bg-white rounded border border-slate-200">
                              <span className="font-semibold text-slate-900 block mb-1">
                                [S] Situation:
                              </span>
                              <p className="leading-relaxed">{bq.starExample.situation}</p>
                            </div>

                            <div className="p-3 bg-white rounded border border-slate-200">
                              <span className="font-semibold text-slate-900 block mb-1">
                                [T] Task:
                              </span>
                              <p className="leading-relaxed">{bq.starExample.task}</p>
                            </div>

                            <div className="p-3 bg-white rounded border border-slate-200">
                              <span className="font-semibold text-slate-900 block mb-1">
                                [A] Action:
                              </span>
                              <p className="leading-relaxed">{bq.starExample.action}</p>
                            </div>

                            <div className="p-3 bg-white rounded border border-slate-200">
                              <span className="font-semibold text-slate-900 block mb-1">
                                [R] Result:
                              </span>
                              <p className="leading-relaxed">{bq.starExample.result}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: TECHNICAL WHITEBOARD & SYSTEM DESIGN */}
      {activeSubTab === 'whiteboard' && (
        <div className="space-y-6">
          {/* Problem Selector Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {initialWhiteboardProblems.map((prob) => {
              const isSelected = selectedWbProblem.id === prob.id;

              return (
                <div
                  key={prob.id}
                  onClick={() => {
                    setSelectedWbProblem(prob);
                    setCapacityAssumptions(prob.defaultCapacity);
                    setArchitectureNotes(prob.sampleArchitectureNotes);
                    setWhiteboardCritique(null);
                  }}
                  className={`p-4 rounded-lg border cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-50 border-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase">
                      <span className="text-slate-600">{prob.difficulty}</span>
                      <span className="text-slate-400 font-mono">System Design</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-slate-900">{prob.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{prob.scenario}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-700">
                    <span>{prob.targetRole}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Whiteboard Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Architecture Canvas & Components */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
                <div className="space-y-1 pb-3 border-b border-slate-100">
                  <h3 className="text-lg font-serif font-bold text-slate-900">{selectedWbProblem.title}</h3>
                  <p className="text-xs text-slate-600">{selectedWbProblem.scenario}</p>
                </div>

                {/* Component Selector Canvas */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 uppercase tracking-wide">
                      Select Architectural Components:
                    </span>
                    <span className="text-slate-600 font-mono">{selectedComponents.length} Selected</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded">
                    {availableComponentsBank.map((comp) => {
                      const isSelected = selectedComponents.includes(comp);

                      return (
                        <button
                          key={comp}
                          onClick={() => handleToggleComponent(comp)}
                          className={`px-2.5 py-1 rounded text-xs transition border flex items-center space-x-1.5 ${
                            isSelected
                              ? 'bg-slate-900 border-slate-900 text-white font-medium'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <Server className="w-3 h-3 text-slate-400" />
                          <span>{comp}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Capacity Assumptions */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
                    Scale & Capacity Assumptions:
                  </label>
                  <input
                    type="text"
                    value={capacityAssumptions}
                    onChange={(e) => setCapacityAssumptions(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white font-mono"
                  />
                </div>

                {/* Architecture Decisions & Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
                    Architecture Notes & Trade-Offs:
                  </label>
                  <textarea
                    value={architectureNotes}
                    onChange={(e) => setArchitectureNotes(e.target.value)}
                    rows={8}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs font-mono text-slate-800 focus:outline-none focus:border-slate-400 focus:bg-white resize-none leading-relaxed"
                  />
                </div>

                {/* Action Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleRunSystemDesignCritique}
                    disabled={isCritiquingWb}
                    className="flex items-center space-x-2 px-5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition disabled:opacity-50"
                  >
                    {isCritiquingWb ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Evaluating System Design...</span>
                      </>
                    ) : (
                      <>
                        <Workflow className="w-3.5 h-3.5" />
                        <span>Run Scalability Evaluation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: AI Critique Scorecard */}
            <div className="lg:col-span-5 space-y-4">
              {whiteboardCritique ? (
                <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        System Scalability Score
                      </span>
                      <h4 className="text-2xl font-serif font-bold text-slate-900 mt-0.5">
                        {whiteboardCritique.scalabilityScore}%
                      </h4>
                    </div>

                    <span className="px-2.5 py-1 rounded text-xs font-medium uppercase bg-slate-100 text-slate-800 border border-slate-200">
                      Resilience: {whiteboardCritique.resilienceRating}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {whiteboardCritique.summary}
                  </p>

                  {/* Bottlenecks Identified */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Identified Bottlenecks & Failure Modes:</span>
                    </span>
                    <ul className="space-y-1 text-slate-600">
                      {whiteboardCritique.bottlenecks?.map((b: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-slate-400">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architectural Strengths */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-slate-900 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Architectural Strengths:</span>
                    </span>
                    <ul className="space-y-1 text-slate-600">
                      {whiteboardCritique.architecturalStrengths?.map((s: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-slate-400">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs space-y-1.5">
                    <span className="font-semibold text-slate-900">Architecture Recommendations:</span>
                    <ul className="space-y-1 text-slate-600">
                      {whiteboardCritique.recommendations?.map((r: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-slate-400">→</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-3">
                  <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 text-slate-700 mx-auto flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-slate-900 text-base">Architecture Analysis</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Select your architecture building blocks, state capacity assumptions, and run the critique to test fault tolerance and latency bottlenecks.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
