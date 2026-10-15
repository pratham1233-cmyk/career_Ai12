import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, RefreshCw, User } from 'lucide-react';
import { sendCareerChatMessageApi } from '../services/aiApi';

interface AICareerAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  profileContext?: any;
}

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export const AICareerAssistantModal: React.FC<AICareerAssistantModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  profileContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation
  useEffect(() => {
    if (!isOpen) return;

    const initialGreeting: ChatMessage = {
      role: 'model',
      content: `Hello ${profileContext?.name || 'there'}! I am your Career Intelligence Advisor. I have synchronized your CV profile (82% ATS rating), recent algorithmic challenge results (342 solved), and skill competencies (Python 86%, SQL 79%, Docker 42%). How can I assist with your career targets today?`,
    };

    if (initialPrompt) {
      setMessages([
        initialGreeting,
        { role: 'user', content: initialPrompt },
      ]);
      triggerAiResponse(initialPrompt, [initialGreeting]);
    } else if (messages.length === 0) {
      setMessages([initialGreeting]);
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const triggerAiResponse = async (userQuery: string, currentHistory: ChatMessage[]) => {
    setIsLoading(true);
    try {
      const historyContext = currentHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const res = await sendCareerChatMessageApi(userQuery, historyContext, profileContext);
      setMessages((prev) => [...prev, { role: 'model', content: res.reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'Unable to reach the assistant at this moment. Please check network connection and try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const newMsg: ChatMessage = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    if (!customText) setInputText('');

    triggerAiResponse(textToSend, updatedMessages);
  };

  const suggestedPills = [
    'How do I bridge my Docker gap?',
    'What should I highlight for Stripe?',
    'How do I practice for system design whiteboard?',
    'Review my CV impact statements',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="bg-white border border-slate-200 rounded-lg w-full max-w-2xl h-[620px] flex flex-col shadow-xl overflow-hidden text-slate-900">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded bg-slate-900 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-slate-900 text-base">Career Intelligence Advisor</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500">
                Grounded in your real CV, problem history, and open applications
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'model' && (
                <div className="w-7 h-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded max-w-[85%] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-wrap'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3 text-slate-500 text-xs py-2">
              <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span>Formulating recommendation...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions */}
        <div className="px-4 py-2 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto no-scrollbar bg-slate-50">
          {suggestedPills.map((pill) => (
            <button
              key={pill}
              onClick={() => handleSendMessage(pill)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 text-[11px] whitespace-nowrap transition border border-slate-200"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-slate-100 bg-white flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Ask about your job match, weak topics, or next steps..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputText.trim()}
            className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-white transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
