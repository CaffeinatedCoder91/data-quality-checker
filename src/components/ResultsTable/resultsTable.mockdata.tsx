import type { QualityReport } from '../../types';

export const ResultsTableEmptyMockData: QualityReport = {
  totalRows: 10,
  issuesFound: 0,
  results: [],
};

export const ResultsTableWithIssuesMockData: QualityReport = {
  totalRows: 5,
  issuesFound: 3,
  results: [
    {
      row: 1,
      field: 'email',
      issue: 'Invalid email format',
      severity: 'high',
    },
    {
      row: 2,
      field: 'phone',
      issue: 'Missing phone number',
      severity: 'medium',
    },
    {
      row: 3,
      field: 'age',
      issue: 'Age is negative',
      severity: 'high',
    },
  ],
};
