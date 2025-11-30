import React from 'react';
import { Sparkles, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
           <Link to="/" className="flex items-center gap-2 mb-4 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">StudyBuddy AI</span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            Empowering students with next-generation AI tools for smarter, faster learning. Join thousands of students achieving their academic goals.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link to="/features" className="hover:text-indigo-600 transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Testimonials</a></li>
          </ul>
        </div>
         <div>
          <h4 className="font-bold text-slate-900 mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        <div>
           <h4 className="font-bold text-slate-900 mb-4">Connect</h4>
           <div className="flex gap-4">
             <a href="#" className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all hover:scale-110">
                <Twitter className="w-4 h-4" />
             </a>
             <a href="#" className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all hover:scale-110">
               <Github className="w-4 h-4" />
             </a>
             <a href="#" className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all hover:scale-110">
               <Linkedin className="w-4 h-4" />
             </a>
           </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} StudyBuddy AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;