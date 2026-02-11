
import React, { useState } from 'react';
import AssessmentFlow from './views/AssessmentFlow';
import ResultsPage from './app/results/page';
import { AssessmentResponse } from './types';
import { Button } from './components/UI';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'assessment' | 'results'>('landing');
  const [responses, setResponses] = useState<AssessmentResponse | null>(null);

  const startAssessment = () => setView('assessment');
  const completeAssessment = (data: AssessmentResponse) => {
    setResponses(data);
    setView('results');
  };
  const resetApp = () => {
    setResponses(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Only show if not in results view (ResultsPage has its own header) */}
      {view !== 'results' && (
        <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2" onClick={resetApp} style={{ cursor: 'pointer' }}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944V21m0-18.056L3.056 9.122A11.954 11.954 0 0012 21.248a11.954 11.954 0 008.944-12.126L12 2.944z" />
                </svg>
              </div>
              <span className="font-bold text-slate-900 tracking-tight">VantageAssess</span>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
              <span className="hover:text-indigo-600 cursor-pointer">Framework</span>
              <span className="hover:text-indigo-600 cursor-pointer">Scoring</span>
              <span className="hover:text-indigo-600 cursor-pointer">Resources</span>
            </div>
          </div>
        </nav>
      )}

      <main className="animate-in fade-in duration-500">
        {view === 'landing' && (
          <div className="max-w-5xl mx-auto py-20 px-6 text-center">
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              2024 Small Business Intelligence
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Scale your business with <span className="text-indigo-600">precision.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Our dynamic assessment engine evaluates your tech maturity, innovation readiness, 
              and AI potential to deliver a data-driven 12-month roadmap.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button onClick={startAssessment} className="text-lg px-10 py-4">Start Assessment</Button>
              <Button variant="outline" className="text-lg px-10 py-4">View Sample Report</Button>
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: 'Dynamic Branching', desc: 'Questions adapt in real-time based on company size and industry complexity.' },
                { title: 'Composite Scoring', desc: 'Algorithmic evaluation of tech stacks, risk factors, and ROI potential.' },
                { title: 'Automated Roadmaps', desc: 'Instantly generate prioritized quick wins and long-term strategic initiatives.' }
              ].map((feature, i) => (
                <div key={i} className="p-6 bg-white border border-slate-200 rounded-2xl">
                  <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'assessment' && (
          <AssessmentFlow onComplete={completeAssessment} />
        )}

        {view === 'results' && responses && (
          <ResultsPage responses={responses} onReset={resetApp} />
        )}
      </main>

      {view !== 'results' && (
        <footer className="border-t border-slate-200 bg-white py-10 mt-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm">© 2024 VantageAssess Systems. All rights reserved.</p>
            <div className="flex gap-8 text-slate-400 text-sm">
              <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-600 cursor-pointer">Support</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
