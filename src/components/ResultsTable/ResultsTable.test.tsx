import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ResultsTable } from './ResultsTable';
import { ResultsTableEmptyMockData, ResultsTableWithIssuesMockData } from './resultsTable.mockdata';

describe('ResultsTable', () => {
  it('renders success message when no issues found', () => {
    const { getByText } = render(<ResultsTable report={ResultsTableEmptyMockData} />);

    expect(getByText('No Issues Found')).toBeInTheDocument();
    expect(getByText(/passed all quality checks/)).toBeInTheDocument();
  });

  it('renders summary with correct row and issue counts', () => {
    const { getByText } = render(<ResultsTable report={ResultsTableWithIssuesMockData} />);

    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
  });

  it('renders results table with all columns', () => {
    const { getByText } = render(<ResultsTable report={ResultsTableWithIssuesMockData} />);

    expect(getByText('Row')).toBeInTheDocument();
    expect(getByText('Field')).toBeInTheDocument();
    expect(getByText('Issue')).toBeInTheDocument();
    expect(getByText('Severity')).toBeInTheDocument();
  });

  it('displays all issues in table rows', () => {
    const { getByText } = render(<ResultsTable report={ResultsTableWithIssuesMockData} />);

    expect(getByText('Invalid email format')).toBeInTheDocument();
    expect(getByText('Missing phone number')).toBeInTheDocument();
    expect(getByText('Age is negative')).toBeInTheDocument();
  });

  it('renders row numbers correctly', () => {
    const { getByText } = render(<ResultsTable report={ResultsTableWithIssuesMockData} />);

    expect(getByText('Row 1')).toBeInTheDocument();
    expect(getByText('Row 2')).toBeInTheDocument();
    expect(getByText('Row 3')).toBeInTheDocument();
  });

  it('displays field names', () => {
    const { getByText } = render(<ResultsTable report={ResultsTableWithIssuesMockData} />);

    expect(getByText('email')).toBeInTheDocument();
    expect(getByText('phone')).toBeInTheDocument();
    expect(getByText('age')).toBeInTheDocument();
  });

  it('renders severity badges for each issue', () => {
    const { getAllByText } = render(<ResultsTable report={ResultsTableWithIssuesMockData} />);

    const highSeverityBadges = getAllByText('High');
    const mediumSeverityBadges = getAllByText('Medium');

    expect(highSeverityBadges).toHaveLength(2);
    expect(mediumSeverityBadges).toHaveLength(1);
  });

  it('has proper table structure for accessibility', () => {
    const { container } = render(<ResultsTable report={ResultsTableWithIssuesMockData} />);

    const table = container.querySelector('table');
    const thead = container.querySelector('thead');
    const tbody = container.querySelector('tbody');

    expect(table).toBeInTheDocument();
    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();
  });
});
