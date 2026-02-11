
import React from 'react';
import { RoadmapPhase } from '../types';

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ phases }) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px] relative pt-12">
        {/* Time Axis Header */}
        <div className="flex border-b border-slate-100 mb-8 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="w-1/4">Q1 (Months 1-3)</div>
          <div className="w-1/4">Q2 (Months 4-6)</div>
          <div className="w-1/4">Q3 (Months 7-9)</div>
          <div className="w-1/4">Q4 (Months 10-12)</div>
        </div>

        {/* The Timeline Track */}
        <div className="relative h-2 bg-slate-100 rounded-full mb-12">
           <div className="absolute inset-0 bg-indigo-500/10 rounded-full" />
        </div>

        {/* Phase Blocks */}
        <div className="grid grid-cols-12 gap-4 relative">
          {phases.map((phase, idx) => {
            // Heuristic positioning based on phase index
            const colStart = idx === 0 ? "col-start-1" : idx === 1 ? "col-start-4" : "col-start-9";
            const colSpan = idx === 0 ? "col-span-3" : idx === 1 ? "col-span-5" : "col-span-4";
            const color = idx === 0 ? "bg-indigo-600" : idx === 1 ? "bg-blue-500" : "bg-emerald-500";
            const lightColor = idx === 0 ? "bg-indigo-50" : idx === 1 ? "bg-blue-50" : "bg-emerald-50";

            return (
              <div key={idx} className={`${colStart} ${colSpan} relative group`}>
                {/* Visual Connection to Track */}
                <div className={`absolute -top-[52px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm ${color} z-10`} />
                
                {/* Phase Bar */}
                <div className={`h-1.5 rounded-full mb-6 ${color} opacity-20`} />

                {/* Content Card */}
                <div className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${lightColor} border-white shadow-sm`}>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{phase.name}</h4>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${color} text-white`}>
                      {phase.duration}
                    </span>
                  </div>
                  
                  <ul className="space-y-3">
                    {phase.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
                        <span className="text-xs text-slate-700 font-medium leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Annotation for Phase Gap */}
                {idx < phases.length - 1 && (
                  <div className="absolute top-[30%] -right-4 w-8 h-px bg-slate-200 hidden lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Mobile Indicator */}
      <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
        <svg className="w-4 h-4 text-slate-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Scroll to view full roadmap</span>
      </div>
    </div>
  );
};
