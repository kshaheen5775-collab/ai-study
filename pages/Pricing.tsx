import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Essential tools for casual learners.",
    features: [
      "5 AI generations per day",
      "Basic Math Solver",
      "Standard Study Notes",
      "Community Support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Perfect for serious students preparing for exams.",
    features: [
      "Unlimited AI generations",
      "Advanced Paper Checker",
      "Detailed Math Steps & Graphs",
      "Priority Processing",
      "Export to PDF"
    ],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For study groups and classrooms.",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Collaborative Workspaces",
      "Shared Custom Quizzes",
      "Admin Dashboard"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
        <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Pricing</h2>
        <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Plans for every student
        </p>
        <p className="mt-4 text-xl text-slate-500">
          Choose the perfect plan to unlock your full academic potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div key={index} className={`relative bg-white rounded-3xl shadow-card border ${plan.popular ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50' : 'border-slate-200'} p-8 flex flex-col animate-fade-in-up`} style={{animationDelay: `${index * 150}ms`}}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
              <p className="text-slate-500 text-sm mt-2">{plan.description}</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                <span className="text-slate-500 ml-1">{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-sm text-slate-600">{feature}</p>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 px-6 rounded-xl font-bold transition-all ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;