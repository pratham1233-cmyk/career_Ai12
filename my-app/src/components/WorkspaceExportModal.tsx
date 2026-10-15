import React from 'react';
import { FileSpreadsheet, HardDrive, AlertCircle, X, Check, ExternalLink } from 'lucide-react';

interface WorkspaceExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  type: 'drive' | 'sheets';
  title: string;
  description: string;
  itemCount?: number;
  isProcessing: boolean;
  resultUrl?: string;
  error?: string | null;
}

export const WorkspaceExportModal: React.FC<WorkspaceExportModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  title,
  description,
  itemCount,
  isProcessing,
  resultUrl,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md p-6 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2.5 rounded-xl ${
                type === 'drive'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {type === 'drive' ? <HardDrive className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">{title}</h3>
              <p className="text-xs text-slate-400">
                {type === 'drive' ? 'Google Drive Integration' : 'Google Sheets Integration'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">{description}</p>

          {itemCount !== undefined && (
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">Total Records to Export</span>
              <span className="text-sm font-semibold text-white px-2.5 py-0.5 bg-slate-700 rounded-md">
                {itemCount} items
              </span>
            </div>
          )}

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-amber-300/90">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              This operation will create a new {type === 'drive' ? 'file in your Google Drive' : 'Google Sheet'} with
              permission from your connected account.
            </span>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-300">
              {error}
            </div>
          )}

          {resultUrl && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-medium">
                <Check className="w-4 h-4" />
                <span>Exported successfully!</span>
              </div>
              <a
                href={resultUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
              >
                <span>Open in {type === 'drive' ? 'Google Drive' : 'Google Sheets'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50"
          >
            {resultUrl ? 'Close' : 'Cancel'}
          </button>
          {!resultUrl && (
            <button
              onClick={onConfirm}
              disabled={isProcessing}
              className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition flex items-center space-x-2 ${
                type === 'drive'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              } disabled:opacity-50`}
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : (
                <span>Confirm & Create</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
