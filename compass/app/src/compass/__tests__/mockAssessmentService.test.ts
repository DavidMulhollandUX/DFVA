import { describe, it, expect } from 'vitest';
import { MockAssessmentService } from '../mockAssessmentService';

describe('MockAssessmentService', () => {
  const service = new MockAssessmentService();

  it('matches known program by URL', async () => {
    const result = await service.assess('https://handbook.unimelb.edu.au/2025/courses/b-des');
    expect(result.programName).toBe('Bachelor of Design');
    expect(result.score).toBe(18);
    expect(result.riskBand).toBe('HIGH RISK');
    expect(result.dimensions).toHaveLength(11);
    expect(result.courseCode).toBe('B-DES');
  });

  it('matches MC-IS by URL', async () => {
    const result = await service.assess('https://handbook.unimelb.edu.au/2025/courses/mc-is');
    expect(result.programName).toBe('Master of Information Systems');
    expect(result.score).toBe(20);
    expect(result.riskBand).toBe('MODERATE RISK');
  });

  it('matches case-insensitive URL', async () => {
    const result = await service.assess('HTTPS://HANDBOOK.UNIMELB.EDU.AU/2025/COURSES/B-DES');
    expect(result.programName).toBe('Bachelor of Design');
  });

  it('falls back for unknown URL', async () => {
    const result = await service.assess('https://example.com/courses/xyz');
    expect(result.riskBand).toBe('HIGH RISK');
    expect(result.score).toBe(18);
    expect(result.programName).toContain('Program at');
    expect(result.reportJson.assessmentMarkdown).toContain('Pending');
  });

  it('extracts course code from URL', async () => {
    const result = await service.assess('https://handbook.unimelb.edu.au/2025/courses/mc-cs');
    expect(result.courseCode).toBe('MC-CS');
  });

  it('sets reportJson with correct slugs', async () => {
    const result = await service.assess('https://handbook.unimelb.edu.au/2025/courses/b-des');
    expect(result.reportJson.assessmentSlug).toBe('dfva-b-des');
    expect(result.reportJson.marketSlug).toBe('dfva-market-b-des');
    expect(result.reportJson.recommendSlug).toBe('dfva-recommend-b-des');
  });

  it('unknown URL returns 11 dimensions', async () => {
    const result = await service.assess('https://unknown.university.edu/courses/test');
    expect(result.dimensions).toHaveLength(11);
    expect(result.dimensions[0]).toHaveProperty('label');
    expect(result.dimensions[0]).toHaveProperty('score');
    expect(result.dimensions[0]).toHaveProperty('max');
  });
});
