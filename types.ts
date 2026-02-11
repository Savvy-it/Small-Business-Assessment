
export type QuestionType = 'choice' | 'multi-choice' | 'number' | 'text' | 'rating';

export interface AssessmentQuestion {
  id: string;
  label: string;
  type: QuestionType;
  options?: { label: string; value: any; weight?: number }[];
  hint?: string;
  category: keyof AssessmentResponse;
  required?: boolean;
  visibilityRule?: (responses: Partial<AssessmentResponse>) => boolean;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentResponse {
  companyProfile: Record<string, any>;
  operations: Record<string, any>;
  technology: Record<string, any>;
  readiness: Record<string, any>;
  aiAutomation: Record<string, any>;
  customerExperience: Record<string, any>;
  financials: Record<string, any>;
  compliance: Record<string, any>;
}

export interface AssessmentScores {
  techMaturity: number;
  innovationReadiness: 'Low' | 'Medium' | 'High';
  dataHealth: number;
  executionRisk: number;
  roiPotential: number;
  feasibilityScore: number;
}

export interface Opportunity {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  description: string;
  timeframe: 'Quick Win' | 'Strategic';
}

export interface RoadmapPhase {
  name: string;
  duration: string;
  objectives: string[];
}
