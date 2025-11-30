import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-indigo-600';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              StudyBuddy AI
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className={`text-sm font-medium transition-colors ${isActive('/features')}`}>Features</Link>
            <Link to="/pricing" className={`text-sm font-medium transition-colors ${isActive('/pricing')}`}>Pricing</Link>
            <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about')}`}>About</Link>
            <Link to="/signin">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-slate-900/20 hover:-translate-y-0.5">
                Sign In
              </button>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4 animate-fade-in shadow-xl absolute w-full left-0 top-16 z-50">
          <Link to="/features" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-600 font-medium hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-lg">Features</Link>
          <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-600 font-medium hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-lg">Pricing</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-slate-600 font-medium hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-lg">About</Link>
          <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md mt-2">Sign In</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;