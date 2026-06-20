import { describe, it, expect } from 'vitest';
import {
  normalizeSeekCategory,
  normalizeAdzunaCategory,
  mapJsaIviToField,
  SEEK_CATEGORY_MAP,
  ADZUNA_CATEGORY_MAP,
  JSA_IVI_MAP,
} from '../signalNormalizer';

describe('normalizeSeekCategory', () => {
  it('maps "Information & Communication Technology" to "IT"', () => {
    expect(normalizeSeekCategory('Information & Communication Technology')).toBe('IT');
  });

  it('maps "Engineering" to "Engineering"', () => {
    expect(normalizeSeekCategory('Engineering')).toBe('Engineering');
  });

  it('maps "Healthcare & Medical" to "Health"', () => {
    expect(normalizeSeekCategory('Healthcare & Medical')).toBe('Health');
  });

  it('maps "Accounting" to "Business"', () => {
    expect(normalizeSeekCategory('Accounting')).toBe('Business');
  });

  it('maps "Legal" to "Law"', () => {
    expect(normalizeSeekCategory('Legal')).toBe('Law');
  });

  it('maps "Education & Training" to "Education"', () => {
    expect(normalizeSeekCategory('Education & Training')).toBe('Education');
  });

  it('maps unknown categories to "Other"', () => {
    expect(normalizeSeekCategory('Some Unknown Category')).toBe('Other');
  });

  it('handles case-insensitive matching', () => {
    expect(normalizeSeekCategory('information & communication technology')).toBe('IT');
  });

  it('handles null/undefined gracefully', () => {
    expect(normalizeSeekCategory(null as unknown as string)).toBe('Other');
    expect(normalizeSeekCategory(undefined as unknown as string)).toBe('Other');
  });
});

describe('normalizeAdzunaCategory', () => {
  it('maps "IT Jobs" to "IT"', () => {
    expect(normalizeAdzunaCategory('IT Jobs')).toBe('IT');
  });

  it('maps "Engineering Jobs" to "Engineering"', () => {
    expect(normalizeAdzunaCategory('Engineering Jobs')).toBe('Engineering');
  });

  it('maps unknown categories to "Other"', () => {
    expect(normalizeAdzunaCategory('Unknown Category')).toBe('Other');
  });

  it('handles null/undefined gracefully', () => {
    expect(normalizeAdzunaCategory(null as unknown as string)).toBe('Other');
  });
});

describe('mapJsaIviToField', () => {
  it('maps "Professionals" to "Business"', () => {
    expect(mapJsaIviToField('Professionals')).toBe('Business');
  });

  it('maps "Technicians and Trades Workers" to "Engineering"', () => {
    expect(mapJsaIviToField('Technicians and Trades Workers')).toBe('Engineering');
  });

  it('maps unknown groups to "Other"', () => {
    expect(mapJsaIviToField('Unknown Group')).toBe('Other');
  });

  it('handles null/undefined gracefully', () => {
    expect(mapJsaIviToField(null as unknown as string)).toBe('Other');
  });
});

describe('Mapping completeness', () => {
  it('SEEK category map has entries for all 11 DFVA fields', () => {
    const mappedFields = new Set(Object.values(SEEK_CATEGORY_MAP));
    const dfvaFields = [
      'IT', 'Engineering', 'Health', 'Business', 'Architecture',
      'Creative Arts', 'Education', 'Law', 'Science', 'Agriculture', 'Other',
    ];
    for (const field of dfvaFields) {
      expect(mappedFields.has(field)).toBe(true);
    }
  });

  it('Adzuna category map has no duplicate field mappings', () => {
    const values = Object.values(ADZUNA_CATEGORY_MAP);
    expect(values.length).toBe(new Set(values).size);
  });

  it('JSA IVI map covers all expected ANZSCO major groups', () => {
    const expectedGroups = [
      'Managers',
      'Professionals',
      'Technicians and Trades Workers',
      'Community and Personal Service Workers',
      'Clerical and Administrative Workers',
      'Sales Workers',
      'Machinery Operators and Drivers',
      'Labourers',
    ];
    for (const group of expectedGroups) {
      expect(JSA_IVI_MAP[group]).toBeDefined();
    }
  });
});
