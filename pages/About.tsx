
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 animate-fade-in-up">
        <div>
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase mb-2">Our Mission</h2>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Revolutionizing Education through AI</h1>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            At StudyBuddy AI, we believe that every student deserves a personalized tutor available 24/7. 
            Traditional education methods often can't keep up with individual learning paces and styles.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            We built this platform to bridge that gap using cutting-edge Generative AI. Whether you need to visualize a math problem, 
            understand complex physics concepts, or get feedback on your essay, StudyBuddy is here to help you succeed.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl transform rotate-3 opacity-20"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Team working" 
               className="rounded-xl w-full h-auto object-cover"
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
