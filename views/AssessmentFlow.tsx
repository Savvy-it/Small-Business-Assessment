
import React, { useState, useMemo } from 'react';
import { ASSESSMENT_FRAMEWORK } from '../data/assessment-framework';
import { AssessmentResponse, AssessmentSection, AssessmentQuestion } from '../types';
import { Card, Button, ProgressBar } from '../components/UI';

interface Props {
  onComplete: (responses: AssessmentResponse) => void;
}

const AssessmentFlow: React.FC<Props> = ({ onComplete }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Partial<AssessmentResponse>>({});

  const sections = ASSESSMENT_FRAMEWORK;
  const currentSection = sections[currentSectionIndex];

  // Logic to handle question responses
  const updateResponse = (category: string, questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof AssessmentResponse] || {}),
        [questionId]: value
      }
    }));
  };

  // Check if a question should be visible based on branching rules
  const visibleQuestions = useMemo(() => {
    return currentSection.questions.filter(q => {
      if (!q.visibilityRule) return true;
      return q.visibilityRule(responses);
    });
  }, [currentSection, responses]);

  // Validation: Are all required visible questions answered?
  const isSectionValid = useMemo(() => {
    return visibleQuestions.every(q => {
      if (!q.required) return true;
      const sectionData = responses[q.category as keyof AssessmentResponse] as any;
      const val = sectionData?.[q.id];
      return val !== undefined && val !== null && val !== '';
    });
  }, [visibleQuestions, responses]);

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete(responses as AssessmentResponse);
    }
  };

  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
            Step {currentSectionIndex + 1} of {sections.length}
          </h2>
          <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}% Complete</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <Card className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{currentSection.title}</h1>
        <p className="text-slate-500 mb-8 border-b border-slate-100 pb-4">{currentSection.description}</p>

        <div className="space-y-8">
          {visibleQuestions.map(q => (
            <div key={q.id} className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                {q.label} {q.required && <span className="text-rose-500">*</span>}
              </label>
              {q.hint && <p className="text-xs text-slate-400 italic">{q.hint}</p>}

              {q.type === 'number' && (
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  value={responses[q.category as keyof AssessmentResponse]?.[q.id] || ''}
                  onChange={(e) => updateResponse(q.category, q.id, parseInt(e.target.value))}
                />
              )}

              {q.type === 'rating' && (
                <div className="flex justify-between items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => updateResponse(q.category, q.id, val)}
                      className={`h-10 w-full rounded-md text-sm font-medium border transition-all ${
                        responses[q.category as keyof AssessmentResponse]?.[q.id] === val
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'choice' && (
                <div className="grid grid-cols-1 gap-2">
                  {q.options?.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateResponse(q.category, q.id, opt.value)}
                      className={`text-left px-4 py-3 rounded-lg border transition-all ${
                        responses[q.category as keyof AssessmentResponse]?.[q.id] === opt.value
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'multi-choice' && (
                <div className="grid grid-cols-1 gap-2">
                  {q.options?.map(opt => {
                    const currentValues = (responses[q.category as keyof AssessmentResponse]?.[q.id] || []) as any[];
                    const isSelected = currentValues.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => {
                          const nextValues = isSelected 
                            ? currentValues.filter(v => v !== opt.value)
                            : [...currentValues, opt.value];
                          updateResponse(q.category, q.id, nextValues);
                        }}
                        className={`text-left px-4 py-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === 'text' && (
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  rows={3}
                  value={responses[q.category as keyof AssessmentResponse]?.[q.id] || ''}
                  onChange={(e) => updateResponse(q.category, q.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleBack} disabled={currentSectionIndex === 0}>
          Back
        </Button>
        <Button 
          variant="primary" 
          onClick={handleNext} 
          disabled={!isSectionValid}
        >
          {currentSectionIndex === sections.length - 1 ? 'Finish Assessment' : 'Next Section'}
        </Button>
      </div>
    </div>
  );
};

export default AssessmentFlow;
