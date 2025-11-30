import React from 'react';
import { BookOpen, Calculator, PenTool, Activity, ListChecks, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Instant Study Notes",
    description: "Upload any PDF or image and get concise, easy-to-understand summaries and notes instantly."
  },
  {
    icon: <ListChecks className="w-6 h-6" />,
    title: "AI MCQ Generator",
    description: "Convert your study material into practice quizzes with detailed explanations for every answer."
  },
  {
    icon: <Calculator className="w-6 h-6" />,
    title: "Step-by-Step Math",
    description: "Stuck on a problem? Get detailed step-by-step solutions for Algebra, Calculus, and more."
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Smart Graph Plotting",
    description: "Visualize complex functions with interactive graphs generated directly from your equations."
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Automated Paper Checker",
    description: "Upload your solved test papers and get instant grading, feedback, and corrections."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Exam Prediction",
    description: "Our AI analyzes patterns to predict important topics and questions for your upcoming exams."
  }
];

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
        <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Capabilities</h2>
        <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Everything you need to master your studies
        </p>
        <p className="mt-4 text-xl text-slate-500">
          StudyBuddy AI combines multiple powerful tools into one seamless interface to supercharge your learning experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-card border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
            <div className="bg-indigo-50 w-14 h-14 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;