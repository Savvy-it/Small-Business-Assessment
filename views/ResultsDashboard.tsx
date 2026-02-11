
import React from 'react';
import { AssessmentResponse, AssessmentScores, Opportunity, RoadmapPhase } from '../types';
import { calculateScores } from '../lib/scoring-engine';
import { generateOpportunities, generateRoadmap } from '../lib/roadmap-generator';
import { Card, ScoreBadge, Button } from '../components/UI';

interface Props {
  responses: AssessmentResponse;
  onReset: () => void;
}

const ResultsDashboard: React.FC<Props> = ({ responses, onReset }) => {
  const scores = calculateScores(responses);
  const opportunities = generateOpportunities(responses, scores);
  const roadmap = generateRoadmap(opportunities);

  const exportData = () => {
    const data = JSON.stringify({ responses, scores, opportunities, roadmap }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessment-results-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Assessment Insights</h1>
          <p className="text-slate-500">Based on your organizational profile and technology readiness.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportData}>Export JSON</Button>
          <Button variant="secondary" onClick={onReset}>New Assessment</Button>
        </div>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <ScoreBadge score={scores.techMaturity} label="Tech Maturity" />
        <ScoreBadge score={scores.innovationReadiness} label="Innovation" />
        <ScoreBadge score={scores.dataHealth} label="Data Health" />
        <ScoreBadge score={scores.roiPotential} label="ROI Potential" />
        <ScoreBadge score={scores.executionRisk} label="Execution Risk" />
        <ScoreBadge score={scores.feasibilityScore} label="Feasibility" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Prioritized Strategic Opportunities
            </h2>
            <div className="space-y-4">
              {opportunities.map((opp) => (
                <div key={opp.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800">{opp.title}</h3>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      opp.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {opp.priority} Priority
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{opp.description}</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">{opp.category}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-semibold">{opp.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Strategic Implementation Roadmap
            </h2>
            <div className="relative border-l-2 border-indigo-100 ml-3 pl-8 space-y-8">
              {roadmap.map((phase, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">{phase.name}</h3>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{phase.duration}</span>
                  </div>
                  <ul className="space-y-2">
                    {phase.objectives.map((obj, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Profile Summary */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none">
            <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4">Maturity Snapshot</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Digital Readiness</span>
                  <span className="text-sm font-bold text-indigo-400">{scores.techMaturity}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${scores.techMaturity}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Execution Risk</span>
                  <span className="text-sm font-bold text-rose-400">{scores.executionRisk}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${scores.executionRisk}%` }} />
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-400 italic leading-relaxed">
                    This profile indicates a <strong>{scores.techMaturity > 60 ? 'Competitive' : scores.techMaturity > 30 ? 'Transformational' : 'Vulnerable'}</strong> market position. 
                    Recommended focus: {scores.techMaturity > 60 ? 'AI Optimization' : 'Foundation Building'}.
                </p>
            </div>
          </Card>

          <Card>
             <h3 className="text-slate-800 font-bold text-sm mb-4">Quick Wins Checklist</h3>
             <div className="space-y-3">
                {opportunities.filter(o => o.timeframe === 'Quick Win').map((o, idx) => (
                    <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                        <div className="mt-1 w-4 h-4 rounded border border-slate-300 group-hover:border-indigo-500 transition-colors" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900">{o.title}</span>
                    </label>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
