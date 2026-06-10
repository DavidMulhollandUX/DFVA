// compass/app/src/compass/marketDataService.ts
import type { AssessmentResult } from './assessmentService';
import { getFieldForCourse, scoreOutcomeEvidence, scoreLabourMarketDurability, MARKET_DATA, type MarketFieldData } from './marketData';

export interface MarketEnrichedResult extends AssessmentResult {
  marketData?: MarketFieldData;
  outcomeEvidenceScore?: number;
  labourMarketDurability?: number;
}

export function enrichWithMarketData(result: AssessmentResult): MarketEnrichedResult {
  const field = getFieldForCourse(result.courseCode?.toLowerCase() ?? '');
  const data = MARKET_DATA[field];

  if (!data) return result;

  const outcomeScore = scoreOutcomeEvidence(field);
  const durabilityScore = scoreLabourMarketDurability(field);

  // Update D10 with evidence-based score and rationale
  const dims = result.dimensions.map(d => {
    if (d.label.includes('Outcome')) {
      return {
        ...d,
        score: outcomeScore,
        rationale: `Employment: ${(data.employmentRate * 100).toFixed(0)}% full-time (GOS 2024), Median salary: $${(data.medianSalary / 1000).toFixed(0)}K, 3yr: ${(data.employmentRate3yr * 100).toFixed(0)}%. ${data.occupationDemand === 'SHORTAGE' ? 'JSA Skills Shortage.' : data.occupationDemand === 'RECRUITMENT_DIFFICULTY' ? 'JSA Recruitment Difficulty.' : ''}`,
      };
    }
    return d;
  });

  // Recalculate total score
  const newScore = dims.reduce((sum, d) => sum + d.score, 0);

  return {
    ...result,
    dimensions: dims,
    score: newScore,
    marketData: data,
    outcomeEvidenceScore: outcomeScore,
    labourMarketDurability: durabilityScore,
    reportJson: {
      ...result.reportJson,
      market: {
        field: data.field,
        employmentRate: data.employmentRate,
        medianSalary: data.medianSalary,
        employmentRate3yr: data.employmentRate3yr,
        medianSalary3yr: data.medianSalary3yr,
        internationalEmploymentRate: data.internationalEmploymentRate,
        internationalMedianSalary: data.internationalMedianSalary,
        occupationDemand: data.occupationDemand,
        aiExposure: data.aiExposure,
        sources: data.sources,
        year: data.year,
      },
    },
  };
}
