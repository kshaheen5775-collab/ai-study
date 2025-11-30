
import React, { useState, useEffect } from 'react';
import { AIResponse, MCQ } from '../types';
import MathGraph from './MathGraph';
import { 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  BrainCircuit, 
  Check, 
  X, 
  ListChecks, 
  FileText, 
  AlignLeft, 
  Activity,
  Calculator,
  PenTool,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ResultsDisplayProps {
  data: AIResponse;
}

type TabType = 'overview' | 'mcq' | 'short' | 'long' | 'math' | 'paper' | 'guess';

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Interactive MCQ State
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    if (data.mcqs && data.mcqs.length > 0 && (!data.shortQuestions || data.shortQuestions.length === 0)) {
      setActiveTab('mcq');
    } else if (data.graphData && !data.mcqs) {
      setActiveTab('math');
    } else {
      setActiveTab('overview');
    }
  }, [data]);

  const handleMCQSelect = (questionIdx: number, option: string) => {
    if (showResults[questionIdx]) return; 
    setSelectedAnswers(prev => ({ ...prev, [questionIdx]: option }));
  };

  const checkAnswer = (questionIdx: number) => {
    setShowResults(prev => ({ ...prev, [questionIdx]: true }));
  };

  const getAvailableTabs = () => {
    const tabs: {id: TabType, label: string, icon: React.ReactNode}[] = [
      { id: 'overview', label: 'Overview', icon: <Activity className="w-4 h-4" /> }
    ];

    if (data.mcqs && data.mcqs.length > 0) {
      tabs.push({ id: 'mcq', label: 'MCQs', icon: <ListChecks className="w-4 h-4" /> });
    }
    if (data.shortQuestions && data.shortQuestions.length > 0) {
      tabs.push({ id: 'short', label: 'Short Qs', icon: <AlignLeft className="w-4 h-4" /> });
    }
    if (data.longQuestions && data.longQuestions.length > 0) {
      tabs.push({ id: 'long', label: 'Long Qs', icon: <FileText className="w-4 h-4" /> });
    }
    if (data.mathSolution || data.graphData) {
      tabs.push({ id: 'math', label: 'Math', icon: <Calculator className="w-4 h-4" /> });
    }
    if (data.paperCheck) {
      tabs.push({ id: 'paper', label: 'Report', icon: <CheckCircle2 className="w-4 h-4" /> });
    }
    if (data.guessPaper) {
      tabs.push({ id: 'guess', label: 'Guess Paper', icon: <Sparkles className="w-4 h-4" /> });
    }

    return tabs;
  };

  const tabs = getAvailableTabs();

  const renderMCQs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6 bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Practice MCQs
          </h3>
          <p className="text-sm text-slate-500 mt-1">Select an option and verify your knowledge immediately.</p>
        </div>
        <div className="text-center bg-white p-3 rounded-xl shadow-sm border border-yellow-100">
          <span className="block text-2xl font-extrabold text-yellow-600">{Object.keys(showResults).length}</span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Solved</span>
        </div>
      </div>

      <div className="grid gap-6">
        {data.mcqs?.map((mcq, idx) => {
          const isAnswered = showResults[idx];
          const selected = selectedAnswers[idx];
          const isCorrect = selected === mcq.correctAnswer;

          return (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow-card border border-transparent hover:border-slate-100 transition-all" dir="auto">
              <div className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-lg text-sm font-bold font-mono">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 mb-6 text-lg leading-relaxed">{mcq.question}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {mcq.options.map((opt, optIdx) => {
                      let buttonStyle = "bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100";
                      
                      if (selected === opt) {
                        buttonStyle = "bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500";
                      }

                      if (isAnswered) {
                        if (opt === mcq.correctAnswer) {
                          buttonStyle = "bg-green-100 border-green-500 text-green-900 ring-1 ring-green-500 font-medium";
                        } else if (selected === opt && selected !== mcq.correctAnswer) {
                          buttonStyle = "bg-red-50 border-red-300 text-red-900 ring-1 ring-red-300 opacity-70";
                        } else {
                          buttonStyle = "opacity-40 bg-slate-50 grayscale";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleMCQSelect(idx, opt)}
                          disabled={isAnswered}
                          className={`p-4 rounded-xl text-left border transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                        >
                          <span className="font-medium">{opt}</span>
                          {isAnswered && opt === mcq.correctAnswer && <Check className="w-5 h-5 text-green-700" />}
                          {isAnswered && selected === opt && selected !== mcq.correctAnswer && <X className="w-5 h-5 text-red-700" />}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswered && selected && (
                    <div className="mt-4 flex justify-end animate-fade-in">
                      <button 
                        onClick={() => checkAnswer(idx)}
                        className="bg-slate-900 text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                      >
                        Check
                      </button>
                    </div>
                  )}
                  
                  {isAnswered && (
                     <div className={`mt-4 p-4 rounded-xl text-sm font-medium flex items-start gap-3 animate-fade-in ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {isCorrect ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5"/> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5"/>}
                        <div className="flex-1">
                          <p className="font-bold mb-1">{isCorrect ? 'Correct Answer!' : 'Incorrect'}</p>
                          {!isCorrect && <p>The right answer is: <span className="font-bold">{mcq.correctAnswer}</span></p>}
                        </div>
                     </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderShortQuestions = () => (
    <div className="bg-white p-8 rounded-3xl shadow-card">
      <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        <div className="p-2 bg-teal-100 rounded-lg text-teal-600"><AlignLeft className="w-6 h-6" /></div>
        Short Questions
      </h3>
      <div className="grid gap-6">
        {data.shortQuestions?.map((sq, idx) => (
          <div key={idx} className="group relative pl-6 border-l-2 border-slate-200 hover:border-teal-400 transition-colors" dir="auto">
             <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-300 rounded-full group-hover:border-teal-400 transition-colors"></div>
            <p className="font-bold text-lg text-slate-800 mb-2">Q{idx + 1}: {sq.question}</p>
            <div className="bg-slate-50 p-4 rounded-xl text-slate-600 leading-relaxed border border-slate-100">
              {sq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLongQuestions = () => (
    <div className="bg-white p-8 rounded-3xl shadow-card">
       <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><FileText className="w-6 h-6" /></div>
        Detailed Explanations
      </h3>
      <div className="space-y-12">
        {data.longQuestions?.map((lq, idx) => (
          <div key={idx} className="group" dir="auto">
            <h4 className="font-bold text-xl text-slate-900 mb-4 flex gap-3">
              <span className="text-purple-600 opacity-60">#{idx+1}</span>
              {lq.question}
            </h4>
            <div className="prose prose-slate max-w-none text-slate-600 leading-loose bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              {lq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMath = () => (
    <div className="space-y-8">
      {data.graphData && (
        <div className="bg-white p-6 rounded-3xl shadow-card overflow-hidden">
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 px-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            Graph Visualization
          </h3>
          <div className="bg-slate-50 rounded-2xl p-2 border border-slate-100">
             <MathGraph data={data.graphData} />
          </div>
        </div>
      )}

      {data.mathSolution && (
        <div className="bg-white p-8 rounded-3xl shadow-card">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><BrainCircuit className="w-6 h-6" /></div>
            Step-by-Step Solution
          </h3>
          <div className="space-y-4" dir="auto">
            {data.mathSolution.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-slate-50/80 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white rounded-full text-blue-600 font-bold shadow-sm text-sm border border-blue-100">{idx + 1}</span>
                <span className="text-slate-800 text-lg py-0.5">{step}</span>
              </div>
            ))}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-xl shadow-blue-200">
              <span className="block text-xs uppercase tracking-widest text-blue-200 font-semibold mb-2">Final Answer</span>
              <span className="text-3xl font-bold tracking-tight" dir="ltr">{data.mathSolution.finalAnswer}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaperCheck = () => (
     <div className="bg-white p-8 rounded-3xl shadow-card">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-red-100 rounded-lg text-red-600"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Assessment Report</h3>
            <p className="text-slate-500 text-sm">Automated grading and feedback analysis</p>
          </div>
        </div>
        
        {data.paperCheck && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl border border-red-100 text-center">
                <span className="block text-xs uppercase tracking-wider text-red-400 font-bold mb-2">Obtained Marks</span>
                <span className="text-4xl font-black text-slate-900">{data.paperCheck.obtainedMarks}</span>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Total Marks</span>
                <span className="text-4xl font-black text-slate-900 opacity-60">{data.paperCheck.totalMarks}</span>
              </div>
            </div>
            
            <div className="mb-8" dir="auto">
              <h4 className="font-bold text-slate-800 mb-3">AI Feedback</h4>
              <p className="text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-200 leading-relaxed italic relative">
                <span className="absolute top-4 left-4 text-4xl text-slate-200 font-serif">"</span>
                <span className="relative z-10 px-4">{data.paperCheck.feedback}</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8" dir="auto">
              <div>
                <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Identified Mistakes
                </h4>
                <div className="bg-red-50/50 rounded-2xl p-1">
                  {data.paperCheck.mistakes.map((m, i) => (
                    <div key={i} className="flex gap-3 p-3 text-slate-700 text-sm border-b border-red-100 last:border-0">
                       <span className="text-red-400">•</span> {m}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Suggested Corrections
                </h4>
                <div className="bg-green-50/50 rounded-2xl p-1">
                  {data.paperCheck.corrections.map((c, i) => (
                    <div key={i} className="flex gap-3 p-3 text-slate-700 text-sm border-b border-green-100 last:border-0">
                       <span className="text-green-400">•</span> {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
  );

  const renderGuessPaper = () => (
    <div className="bg-white p-8 rounded-3xl shadow-card">
       <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Sparkles className="w-6 h-6" /></div>
        Exam Predictions
      </h3>

      {data.guessPaper && (
        <div dir="auto" className="space-y-8">
          <div>
            <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">High Priority Topics</h4>
            <div className="flex flex-wrap gap-2">
              {data.guessPaper.importantTopics.map((topic, i) => (
                <span key={i} className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border border-orange-200 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">Expected Questions</h4>
            <div className="grid gap-3">
              {data.guessPaper.expectedQuestions.map((q, i) => (
                <div key={i} className="flex gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all">
                   <span className="font-bold text-orange-500 bg-white w-6 h-6 rounded flex items-center justify-center text-xs shadow-sm border border-orange-100">{i+1}</span>
                   <span className="text-slate-800 font-medium">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
       <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
         {/* Abstract BG shapes */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
         <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -ml-10 -mb-10"></div>

        <div className="relative z-10" dir="auto">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg"><BookOpen className="w-6 h-6 text-indigo-300" /></div>
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {data.subject}
            </h2>
          </div>
          
          {data.topic && <p className="text-indigo-200 text-xl font-medium mb-6 pl-1">{data.topic}</p>}
          
          {data.generalExplanation && (
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 leading-relaxed text-slate-200 text-lg">
              {data.generalExplanation}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {data.mcqs && data.mcqs.length > 0 && (
           <button onClick={() => setActiveTab('mcq')} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
             <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-yellow-700 group-hover:scale-110 transition-transform">
               <ListChecks className="w-6 h-6"/>
             </div>
             <p className="text-3xl font-black text-slate-800 mb-1">{data.mcqs.length}</p>
             <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
               <span>MCQs</span>
               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
             </div>
           </button>
         )}
         {data.shortQuestions && data.shortQuestions.length > 0 && (
           <button onClick={() => setActiveTab('short')} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
             <div className="bg-teal-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-teal-700 group-hover:scale-110 transition-transform">
               <AlignLeft className="w-6 h-6"/>
             </div>
             <p className="text-3xl font-black text-slate-800 mb-1">{data.shortQuestions.length}</p>
             <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
               <span>Short Qs</span>
               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
             </div>
           </button>
         )}
         {data.longQuestions && data.longQuestions.length > 0 && (
           <button onClick={() => setActiveTab('long')} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
             <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-purple-700 group-hover:scale-110 transition-transform">
               <FileText className="w-6 h-6"/>
             </div>
             <p className="text-3xl font-black text-slate-800 mb-1">{data.longQuestions.length}</p>
              <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
               <span>Detailed Qs</span>
               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
             </div>
           </button>
         )}
         {(data.mathSolution || data.graphData) && (
           <button onClick={() => setActiveTab('math')} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
             <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-700 group-hover:scale-110 transition-transform">
               <Calculator className="w-6 h-6"/>
             </div>
             <p className="text-xl font-bold text-slate-800 mb-2 mt-1">View Solution</p>
             <div className="flex items-center justify-between text-slate-500 text-sm font-medium">
               <span>Math Analysis</span>
               <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
             </div>
           </button>
         )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
      {/* Floating Tabs */}
      <div className="sticky top-20 z-40 mb-8 flex justify-center">
         <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-slate-200/50 inline-flex flex-wrap gap-1 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                  ${activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
         </div>
      </div>

      {/* Content Area */}
      <div className="animate-fade-in-up min-h-[500px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'mcq' && renderMCQs()}
        {activeTab === 'short' && renderShortQuestions()}
        {activeTab === 'long' && renderLongQuestions()}
        {activeTab === 'math' && renderMath()}
        {activeTab === 'paper' && renderPaperCheck()}
        {activeTab === 'guess' && renderGuessPaper()}
      </div>
    </div>
  );
};

export default ResultsDisplay;
