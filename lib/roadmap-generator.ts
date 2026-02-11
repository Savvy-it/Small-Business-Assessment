
import { AssessmentResponse, AssessmentScores, Opportunity, RoadmapPhase } from '../types';

export function generateOpportunities(responses: AssessmentResponse, scores: AssessmentScores): Opportunity[] {
  const opportunities: Opportunity[] = [];

  if (scores.techMaturity < 50) {
    opportunities.push({
      id: 'opp1',
      title: 'Modernize Cloud Infrastructure',
      priority: 'High',
      category: 'Infrastructure',
      description: 'Your current cloud maturity is low. Migrating legacy workloads can reduce costs and increase agility.',
      timeframe: 'Strategic'
    });
  }

  if (responses.aiAutomation?.currentAutomation?.includes('none')) {
    opportunities.push({
      id: 'opp2',
      title: 'Deploy Low-Code Workflow Automation',
      priority: 'High',
      category: 'Operations',
      description: 'Implement tools like Zapier to connect fragmented processes and save 10+ hours per week.',
      timeframe: 'Quick Win'
    });
  }

  if (scores.dataHealth < 60) {
    opportunities.push({
      id: 'opp3',
      title: 'Data Governance Initiative',
      priority: 'Medium',
      category: 'Data',
      description: 'Clean and centralize operational data to prepare for advanced AI implementation.',
      timeframe: 'Strategic'
    });
  }

  if (responses.compliance?.regulatoryBurden === 'heavy' && scores.techMaturity < 70) {
    opportunities.push({
      id: 'opp4',
      title: 'Security Compliance Audit',
      priority: 'High',
      category: 'Compliance',
      description: 'Strengthen cybersecurity protocols to meet industry standards and mitigate risk.',
      timeframe: 'Quick Win'
    });
  }

  return opportunities;
}

export function generateRoadmap(opportunities: Opportunity[]): RoadmapPhase[] {
  const quickWins = opportunities.filter(o => o.timeframe === 'Quick Win');
  const strategic = opportunities.filter(o => o.timeframe === 'Strategic');

  return [
    {
      name: 'Phase 1: Stabilization',
      duration: '0 - 3 Months',
      objectives: quickWins.map(o => o.title).slice(0, 3) || ['Foundation assessment']
    },
    {
      name: 'Phase 2: Scale',
      duration: '4 - 9 Months',
      objectives: strategic.map(o => o.title).slice(0, 2) || ['Infrastructure optimization']
    },
    {
      name: 'Phase 3: Innovation',
      duration: '10 - 12+ Months',
      objectives: ['Advanced AI Pilot', 'Automated Predictive Analytics']
    }
  ];
}
