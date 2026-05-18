import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders loading spinner', () => {
    const { getByText } = render(<LoadingSpinner />);

    expect(getByText('Analysing your data...')).toBeInTheDocument();
  });

  it('renders spinner animation element', () => {
    const { container } = render(<LoadingSpinner />);

    const spinner = container.querySelector('.loading-spinner');

    expect(spinner).toBeInTheDocument();
  });

  it('has aria-live region for accessibility', () => {
    const { container } = render(<LoadingSpinner />);

    const liveRegion = container.querySelector('[aria-live="polite"]');

    expect(liveRegion).toBeInTheDocument();
  });

  it('announces loading state to screen readers', () => {
    const { container } = render(<LoadingSpinner />);

    const liveRegion = container.querySelector('[aria-busy="true"]');

    expect(liveRegion).toBeInTheDocument();
  });
});
