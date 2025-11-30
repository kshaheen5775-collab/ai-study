import React, { useState, useRef } from 'react';
import { AppMode, AIResponse } from '../types';
import { generateStudyContent } from '../services/geminiService';
import ResultsDisplay from '../components/ResultsDisplay';
import { 
  Upload, 
  FileText, 
  Loader2, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  PenTool, 
  ListChecks, 
  Activity, 
  X,
  Zap
} from 'lucide-react';

const Home: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.STUDY_GEN);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText && !selectedFile) {
      setError("Please enter text or upload an image/PDF.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let base64Data: string | null = null;
      let mimeType: string | null = null;

      if (selectedFile && filePreview) {
         base64Data = filePreview.split(',')[1];
         mimeType = selectedFile.type;
      }

      const response = await generateStudyContent(inputText, base64Data, mimeType, mode);
      setResult(response);
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      setError("Failed to generate content. Please try again or check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setSelectedFile(null);
    setFilePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getModeDetails = (m: AppMode) => {
    switch (m) {
      case AppMode.STUDY_GEN: 
        return { icon: <BookOpen className="w-5 h-5" />, label: "Study Material", desc: "Notes & summaries" };
      case AppMode.MCQ_GEN: 
        return { icon: <ListChecks className="w-5 h-5" />, label: "MCQ Generator", desc: "Create quizzes" };
      case AppMode.MATH_SOLVER: 
        return { icon: <Calculator className="w-5 h-5" />, label: "Math Solver", desc: "Step-by-step help" };
      case AppMode.GRAPH_GEN: 
        return { icon: <Activity className="w-5 h-5" />, label: "Graph Plotter", desc: "Visualize functions" };
      case AppMode.PAPER_CHECKER: 
        return { icon: <PenTool className="w-5 h-5" />, label: "Paper Checker", desc: "Grading & Feedback" };
      case AppMode.GUESS_PAPER: 
        return { icon: <Sparkles className="w-5 h-5" />, label: "Guess Paper", desc: "Important topics" };
      default: 
        return { icon: <BookOpen className="w-5 h-5" />, label: "Study", desc: "General help" };
    }
  };

  const getPlaceholder = () => {
    switch (mode) {
      case AppMode.MATH_SOLVER: return "Type a math problem (e.g. Solve 2x + 5 = 15) or upload a photo of your homework...";
      case AppMode.GRAPH_GEN: return "Enter a function to visualize (e.g. y = sin(x) * x)...";
      case AppMode.MCQ_GEN: return "Paste your study notes, topic name, or upload a chapter PDF to generate quizzes...";
      case AppMode.PAPER_CHECKER: return "Upload a clear image of your solved paper or typed answer for grading...";
      default: return "What do you want to learn today? Type a topic or question...";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Section */}
      {!result && (
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-6">
            <Zap className="w-3 h-3" />
            <span>Powered by Gemini 2.0 Flash</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            Unlock Your Potential <br className="hidden md:block"/> with <span className="text-indigo-600 relative inline-block">
              AI Intelligence
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-500 leading-relaxed">
            The smartest way to study. Generate quizzes, solve complex math, check papers, and master any subject in seconds.
          </p>
        </div>
      )}

      {/* Tool Selector */}
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 transition-all duration-500 ${result ? 'scale-95 opacity-80 hover:opacity-100 hover:scale-100' : ''}`}>
        {(Object.values(AppMode) as AppMode[]).map((m) => {
          const details = getModeDetails(m);
          const isActive = mode === m;
          return (
            <button
              key={m}
              onClick={() => { setMode(m); setResult(null); setError(null); }}
              className={`relative group flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-center h-full
                ${isActive 
                  ? 'bg-indigo-50/80 border-indigo-500 ring-1 ring-indigo-500 shadow-md transform -translate-y-1' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-card hover:-translate-y-1'
                }`}
            >
              <div className={`p-3 rounded-full mb-3 transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                {details.icon}
              </div>
              <h3 className={`font-bold text-sm mb-1 ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>{details.label}</h3>
              <p className="text-xs text-slate-500 leading-tight hidden md:block">{details.desc}</p>
              
              {isActive && (
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Input Area */}
      <div className={`transition-all duration-500 ease-in-out ${result ? '' : 'max-w-4xl mx-auto'}`}>
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-white p-2 md:p-3 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full p-4 md:p-6 bg-transparent text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none min-h-[140px]"
                dir="auto"
              />
              
              {filePreview && (
                <div className="mx-4 md:mx-6 mb-2 inline-flex items-center gap-3 p-2 bg-indigo-50 border border-indigo-100 rounded-xl pr-4 animate-fade-in">
                  {selectedFile?.type.includes('image') ? (
                    <img src={filePreview} alt="Upload" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-indigo-900 truncate max-w-[150px]">{selectedFile?.name}</span>
                    <span className="text-[10px] text-indigo-600 uppercase">Ready to upload</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleClear}
                    className="ml-2 p-1 hover:bg-indigo-200 rounded-full text-indigo-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 md:px-6 pb-2 md:pb-4">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer group/upload flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-slate-600 hover:text-indigo-600">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </label>
                <span className="text-xs text-slate-400 hidden sm:inline-block">Supports PDF, JPG, PNG</span>
              </div>

              <div className="flex items-center gap-3">
                {inputText && (
                  <button type="button" onClick={handleClear} className="text-sm text-slate-400 hover:text-slate-600 px-3 py-2 font-medium transition-colors">
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || (!inputText && !selectedFile)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all transform active:scale-95
                    ${loading || (!inputText && !selectedFile)
                      ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-glow hover:translate-y-[-1px]'
                    }`}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  <span>{loading ? "Thinking..." : "Generate"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm flex items-center gap-3 animate-fade-in">
             <div className="bg-red-100 p-1.5 rounded-full"><X className="w-4 h-4 text-red-600" /></div>
             {error}
          </div>
        )}
      </div>

      <div ref={resultsRef} className="mt-12 scroll-mt-24">
         {result && (
           <ResultsDisplay data={result} />
         )}
      </div>
    </div>
  );
};

export default Home;