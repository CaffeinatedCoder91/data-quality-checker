import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SeverityBadge } from './SeverityBadge';
import { SeverityBadgeMockData } from './severityBadge.mockdata';

describe('SeverityBadge', () => {
  it('renders low severity badge', () => {
    const { getByText } = render(<SeverityBadge {...SeverityBadgeMockData.low} />);

    const badge = getByText('Low');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle('background-color: #3b82f6');
  });

  it('renders medium severity badge', () => {
    const { getByText } = render(<SeverityBadge {...SeverityBadgeMockData.medium} />);

    const badge = getByText('Medium');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle('background-color: #f97316');
  });

  it('renders high severity badge', () => {
    const { getByText } = render(<SeverityBadge {...SeverityBadgeMockData.high} />);

    const badge = getByText('High');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle('background-color: #ef4444');
  });

  it('has correct aria label', () => {
    const { getByLabelText } = render(<SeverityBadge {...SeverityBadgeMockData.high} />);

    const badge = getByLabelText('Severity: High');

    expect(badge).toBeInTheDocument();
  });
});
