
import React, { useState } from 'react';
import { AssessmentResponse, Opportunity } from '../../types';
import { calculateScores } from '../../lib/scoring-engine';
import { generateOpportunities, generateRoadmap } from '../../lib/roadmap-generator';
import { Card, ScoreCard, Button, Modal } from '../../components/UI';
import { RoadmapTimeline } from '../../components/RoadmapTimeline';

interface ResultsPageProps {
  responses: AssessmentResponse;
  onReset: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ responses, onReset }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const scores = calculateScores(responses);
  const opportunities = generateOpportunities(responses, scores);
  const roadmap = generateRoadmap(opportunities);

  const quickWins = opportunities.filter(o => o.timeframe === 'Quick Win');

  const handleExport = () => {
    const data = JSON.stringify({
      assessmentDate: new Date().toISOString(),
      scores,
      opportunities,
      roadmap,
      responses
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Business_Assessment_${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Opportunity Detail Modal */}
      <Modal 
        isOpen={!!selectedOpportunity} 
        onClose={() => setSelectedOpportunity(null)}
        title="Opportunity Details"
      >
        {selectedOpportunity && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{selectedOpportunity.title}</h3>
              <div className="flex gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  selectedOpportunity.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {selectedOpportunity.priority} Priority
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                  {selectedOpportunity.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                  {selectedOpportunity.timeframe}
                </span>
              </div>
            </div>
            
            <div className="prose prose-slate">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Description</h4>
              <p className="text-slate-700 leading-relaxed text-lg">
                {selectedOpportunity.description}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Strategic Impact</h4>
              <p className="text-sm text-slate-600 italic">
                Implementation of this initiative is estimated to improve your overall Tech Maturity score by significantly reducing operational friction and enhancing data accessibility.
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                <span>Assessment</span>
                <span>/</span>
                <span className="text-indigo-600 font-medium">Results Dashboard</span>
              </nav>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Business Transformation Strategy
              </h1>
              <p className="mt-2 text-slate-500 text-lg max-w-2xl">
                A comprehensive analysis of your digital maturity and a tactical roadmap for the next 12 months.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExport} className="hidden md:flex">
                Export Data
              </Button>
              <Button variant="primary" onClick={onReset}>
                Restart Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* Core Metrics Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Key Performance Indicators</h2>
            <span className="text-sm text-slate-400">Calculated from {Object.keys(responses).length} data categories</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScoreCard 
              title="Technology Maturity" 
              value={scores.techMaturity} 
              description="Infrastructure strength and cloud adoption levels."
              trend={scores.techMaturity > 50 ? 'up' : 'stable'}
            />
            <ScoreCard 
              title="Data Health Index" 
              value={scores.dataHealth} 
              description="Quality, accessibility, and governance of business data."
            />
            <ScoreCard 
              title="Execution Risk" 
              value={scores.executionRisk} 
              description="Potential friction points in implementing change."
              trend={scores.executionRisk > 60 ? 'down' : 'stable'}
            />
            <ScoreCard 
              title="ROI Potential" 
              value={scores.roiPotential} 
              description="Expected efficiency gains from automation."
              trend="up"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Insights Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Visual Roadmap */}
            <Card className="overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Strategic Roadmap: 12-Month Outlook
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Phased implementation schedule based on your current feasibility score ({scores.feasibilityScore}%).</p>
                </div>
              </div>
              
              <RoadmapTimeline phases={roadmap} />
            </Card>

            {/* Opportunity Matrix */}
            <Card className="overflow-hidden p-0">
              <div className="bg-slate-900 text-white p-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
                  </svg>
                  Prioritized Opportunities
                </h2>
                <p className="text-slate-400 text-sm mt-1">High-impact actions ranked by urgency and feasibility.</p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {opportunities.length > 0 ? (
                    opportunities.map((opp, idx) => (
                      <div 
                        key={opp.id} 
                        className="flex gap-6 pb-6 border-b border-slate-100 last:border-0 last:pb-0 cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
                        onClick={() => setSelectedOpportunity(opp)}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {idx + 1}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{opp.title}</h3>
                            <div className="flex gap-2">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                opp.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {opp.priority}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                                {opp.timeframe}
                              </span>
                            </div>
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4">{opp.description}</p>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                            Click to View Details
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400">
                      No critical opportunities identified at this stage.
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Analytics */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-indigo-600 text-white border-none">
              <h3 className="text-indigo-200 font-bold uppercase tracking-widest text-xs mb-4">Readiness Verdict</h3>
              <div className="mb-6">
                <div className="text-4xl font-black mb-1">{scores.innovationReadiness}</div>
                <div className="text-indigo-200 text-sm">Innovation Readiness Level</div>
              </div>
              <div className="p-4 bg-indigo-700/50 rounded-xl text-sm leading-relaxed text-indigo-50 border border-indigo-500/30">
                {scores.innovationReadiness === 'High' 
                  ? "Your organization is primed for rapid digital scaling. Focus on cutting-edge AI integration." 
                  : scores.innovationReadiness === 'Medium'
                  ? "Moderate foundation. Focus on cleaning data pipelines before pursuing complex automation."
                  : "Caution required. Strengthen core infrastructure and leadership alignment before investing in high-risk tech."}
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-slate-800 mb-4">Quick Win Checklist</h3>
              <div className="space-y-4">
                {quickWins.length > 0 ? quickWins.map((win) => (
                  <div key={win.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer" onClick={() => setSelectedOpportunity(win)}>
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center text-indigo-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{win.title}</span>
                  </div>
                )) : (
                  <p className="text-xs text-slate-400 italic">Focus on foundation building first.</p>
                )}
              </div>
              <Button variant="outline" className="w-full mt-6 text-xs py-2" disabled>View Task Details</Button>
            </Card>

            <Card className="bg-slate-100 border-dashed border-2 border-slate-300">
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Executive Summary</h4>
                <p className="text-xs text-slate-500 mb-4">A complete deep-dive report for your board of directors.</p>
                <Button variant="secondary" className="w-full text-xs" disabled>Generate PDF (Premium)</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
