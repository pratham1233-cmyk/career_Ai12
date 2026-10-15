import React, { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { CVAnalysisResult } from '../types/career';
import { analyzeCvApi } from '../services/aiApi';
import { sampleCvText } from '../data/mockData';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle,
  AlertCircle,
  FolderGit2,
  GraduationCap,
  HardDrive,
  Award,
  Layers,
  RefreshCw,
} from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface CVAnalysisViewProps {
  currentAnalysis: CVAnalysisResult;
  targetCareer: string;
  candidateName: string;
  candidateEmail: string;
  onUpdateAnalysis: (analysis: CVAnalysisResult) => void;
  onRequestDriveExport: (filename: string, content: string) => void;
}

export const CVAnalysisView: React.FC<CVAnalysisViewProps> = ({
  currentAnalysis,
  targetCareer,
  candidateName,
  candidateEmail,
  onUpdateAnalysis,
  onRequestDriveExport,
}) => {
  const personalizedSampleCvText = sampleCvText
    .trim()
    .replace(/^ARJUN MEHTA/m, candidateName.toUpperCase())
    .replace('arjun.mehta@iitb.ac.in', candidateEmail);
  const previousSampleCvText = useRef(personalizedSampleCvText);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cvInputText, setCvInputText] = useState(personalizedSampleCvText);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setCvInputText((currentText) =>
      currentText === previousSampleCvText.current ? personalizedSampleCvText : currentText
    );
    previousSampleCvText.current = personalizedSampleCvText;
  }, [personalizedSampleCvText]);

  const handleCvFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!/\.(pdf|txt|md)$/i.test(file.name)) {
      setErrorMessage('Please upload a PDF, plain-text, or Markdown CV (.pdf, .txt, or .md).');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('The selected CV is larger than 20 MB. Please choose a smaller file.');
      return;
    }

    setIsReadingFile(true);
    setErrorMessage(null);
    try {
      let text: string;
      if (/\.pdf$/i.test(file.name)) {
        const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
        const pageTexts: string[] = [];
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const content = await page.getTextContent();
          const pageText = content.items
            .filter((item) => 'str' in item && typeof item.str === 'string')
            .map((item) => ('str' in item ? item.str : ''))
            .join(' ')
            .trim();
          if (pageText) pageTexts.push(pageText);
        }
        text = pageTexts.join('\n\n');
      } else {
        text = await file.text();
      }

      if (!text.trim()) {
        setErrorMessage(
          /\.pdf$/i.test(file.name)
            ? 'No selectable text was found in this PDF. If it is a scanned document, use an OCR-enabled PDF or upload a text/Markdown file.'
            : 'The selected CV file is empty.'
        );
        return;
      }
      setCvInputText(text);
      setUploadedFileName(file.name);
    } catch (error) {
      console.error('CV file upload failed:', error);
      setErrorMessage('Could not read the selected file. Check that it is a valid PDF, .txt, or .md file.');
    } finally {
      setIsReadingFile(false);
    }
  };

  const handleRunAnalysis = async () => {
    if (!cvInputText.trim()) return;
    setIsAnalyzing(true);
    setErrorMessage(null);
    try {
      const result = await analyzeCvApi(cvInputText, targetCareer);
      onUpdateAnalysis({
        ...result,
        analyzedAt: new Date().toLocaleDateString(),
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Analysis failed. Please check CV content.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExportToDrive = () => {
    const reportText = `
CAREERAI CV ANALYSIS REPORT
Generated on: ${currentAnalysis.analyzedAt || new Date().toLocaleDateString()}
Target Career: ${targetCareer}
Overall ATS Score: ${currentAnalysis.overallScore}%

SCORE BREAKDOWN:
- Skills: ${currentAnalysis.scoreBreakdown.skills}%
- Experience: ${currentAnalysis.scoreBreakdown.experience}%
- Projects: ${currentAnalysis.scoreBreakdown.projects}%
- Achievements: ${currentAnalysis.scoreBreakdown.achievements}%
- Formatting: ${currentAnalysis.scoreBreakdown.formatting}%

SUMMARY:
${currentAnalysis.summary}

MISSING INFORMATION IDENTIFIED:
${currentAnalysis.missingInformation.map((m) => `- ${m}`).join('\n')}

IMPROVEMENT OPPORTUNITIES:
${currentAnalysis.improvementOpportunities.map((o) => `- ${o}`).join('\n')}

RECOMMENDED PROJECTS TO BOOST SCORE:
${currentAnalysis.recommendedProjects
  .map(
    (p, i) =>
      `${i + 1}. ${p.title} (${p.techStack.join(', ')}) - Est. ${p.estimatedHours} hrs\n   Rationale: ${p.rationale}`
  )
  .join('\n')}
`;
    onRequestDriveExport(`CareerAI_CV_Analysis_${targetCareer.replace(/\s+/g, '_')}.txt`, reportText);
  };

  return (
    <div className="space-y-6">
      {/* Header - Classic Editorial */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium mb-1">
            <span>Resume Intelligence</span>
            <span> • </span>
            <span className="text-slate-800">{targetCareer}</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">CV & Resume Deep Analysis</h2>
          <p className="text-xs text-slate-600 mt-1">
            Evaluate keyword match rates, recruiter parsing fidelity, and concrete impact statements.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportToDrive}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-800 transition"
          >
            <HardDrive className="w-4 h-4 text-slate-600" />
            <span>Save Report to Drive</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Input / Upload + Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Upload & Text Input */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
                <Upload className="w-4 h-4 text-slate-600" />
                <span>Resume Input</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.md,application/pdf,text/plain,text/markdown"
                onChange={handleCvFileUpload}
                className="sr-only"
                aria-label="Upload a PDF or plain-text CV"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isReadingFile}
                className="px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-800 transition"
              >
                {isReadingFile ? 'Reading CV...' : 'Upload CV (.pdf, .txt, .md)'}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Signed in as <span className="font-medium text-slate-800">{candidateName}</span>
              {uploadedFileName && <> · Loaded: <span className="font-medium text-slate-800">{uploadedFileName}</span></>}
            </p>

            <div>
              <label className="block text-xs text-slate-500 mb-1.5">
                Paste or edit plain text resume:
              </label>
              <textarea
                value={cvInputText}
                onChange={(e) => {
                  setCvInputText(e.target.value);
                  setUploadedFileName(null);
                }}
                rows={14}
                className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-900 font-mono leading-relaxed focus:outline-none focus:border-slate-400 focus:bg-white resize-none"
                placeholder="Paste your CV text here..."
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !cvInputText.trim()}
              className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze CV</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Col: Scorecard & Section Performance */}
        <div className="lg:col-span-7 space-y-6">
          {/* Overall ATS Score Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Evaluation Index</p>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">Overall Resume Score</h3>
                <p className="text-xs text-slate-600 mt-1">{currentAnalysis.summary}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="w-20 h-20 rounded-md bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold font-mono text-slate-900">{currentAnalysis.overallScore}%</span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Grade B+</span>
                </div>
              </div>
            </div>

            {/* Section Breakdown Sliders */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                Section Breakdown
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700">Skills Alignment</span>
                    <span className="text-slate-900 font-mono font-bold">{currentAnalysis.scoreBreakdown.skills}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-800 h-full rounded-full"
                      style={{ width: `${currentAnalysis.scoreBreakdown.skills}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700">Experience Impact</span>
                    <span className="text-slate-900 font-mono font-bold">{currentAnalysis.scoreBreakdown.experience}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-800 h-full rounded-full"
                      style={{ width: `${currentAnalysis.scoreBreakdown.experience}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700">Project Quality</span>
                    <span className="text-slate-900 font-mono font-bold">{currentAnalysis.scoreBreakdown.projects}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-800 h-full rounded-full"
                      style={{ width: `${currentAnalysis.scoreBreakdown.projects}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700">Achievements</span>
                    <span className="text-slate-900 font-mono font-bold">{currentAnalysis.scoreBreakdown.achievements}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-800 h-full rounded-full"
                      style={{ width: `${currentAnalysis.scoreBreakdown.achievements}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-700">Structure & Formatting</span>
                    <span className="text-slate-900 font-mono font-bold">{currentAnalysis.scoreBreakdown.formatting}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-slate-800 h-full rounded-full"
                      style={{ width: `${currentAnalysis.scoreBreakdown.formatting}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Missing Information & Improvement Opportunities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Missing Information</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {currentAnalysis.missingInformation.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-slate-700" />
                <span>Improvement Opportunities</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {currentAnalysis.improvementOpportunities.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Projects to Elevate Profile */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
              <FolderGit2 className="w-4 h-4 text-slate-700" />
              <span>Recommended Portfolio Projects</span>
            </h4>

            <div className="space-y-3">
              {currentAnalysis.recommendedProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-md p-3.5 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 className="font-semibold text-slate-900 text-xs">{proj.title}</h5>
                    <span className="text-[11px] text-slate-500 font-mono">Est. {proj.estimatedHours} hours</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.rationale}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
