
import { AssessmentResponse, AssessmentScores } from '../types';

export function calculateScores(responses: AssessmentResponse): AssessmentScores {
  // 1. Tech Maturity (0-100)
  const cloud = (responses.technology?.cloudUsage || 0) * 10;
  const supportScore = responses.technology?.itSupport === 'internal' ? 100 : responses.technology?.itSupport === 'msp' ? 80 : 20;
  const techMaturity = Math.round((cloud + supportScore) / 2);

  // 2. Innovation Readiness (Low / Medium / High)
  const budgetWeight = responses.readiness?.changeBudget === 'high' ? 10 : responses.readiness?.changeBudget === 'med' ? 6 : 0;
  const leadershipWeight = (responses.readiness?.leadershipAlignment || 0);
  const totalReadiness = budgetWeight + leadershipWeight;
  let innovationReadiness: 'Low' | 'Medium' | 'High' = 'Low';
  if (totalReadiness > 15) innovationReadiness = 'High';
  else if (totalReadiness > 8) innovationReadiness = 'Medium';

  // 3. Data Health Index (0-100)
  const dataQuality = (responses.aiAutomation?.dataQuality || 0) * 10;
  const dataHealth = dataQuality;

  // 4. Execution Risk Index (0-100, higher is riskier)
  // Risk increases with low tech maturity and low leadership alignment
  const executionRisk = Math.max(0, 100 - (techMaturity * 0.6 + (leadershipWeight * 10) * 0.4));

  // 5. ROI Potential (0-100)
  // Higher potential if current automation is low but data quality is high
  const currentAuto = (responses.aiAutomation?.currentAutomation || []).includes('none') ? 100 : 40;
  const roiPotential = Math.round((currentAuto * 0.7) + (dataQuality * 0.3));

  // 6. Feasibility Score
  const feasibilityScore = Math.round((techMaturity + (20 - (executionRisk / 5)) * 5) / 2);

  return {
    techMaturity,
    innovationReadiness,
    dataHealth,
    executionRisk,
    roiPotential,
    feasibilityScore
  };
}
