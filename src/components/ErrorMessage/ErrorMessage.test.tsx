import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';
import { ErrorMessageMockData, ErrorMessageNetworkErrorMockData } from './errorMessage.mockdata';

describe('ErrorMessage', () => {
  it('renders error message', () => {
    const { getByText } = render(<ErrorMessage {...ErrorMessageMockData} />);

    expect(getByText('Analysis Failed')).toBeInTheDocument();
    expect(getByText(ErrorMessageMockData.message)).toBeInTheDocument();
  });

  it('shows retry suggestion', () => {
    const { getByText } = render(<ErrorMessage {...ErrorMessageMockData} />);

    expect(getByText('Please try uploading your file again.')).toBeInTheDocument();
  });

  it('displays different error messages', () => {
    const { getByText } = render(<ErrorMessage {...ErrorMessageNetworkErrorMockData} />);

    expect(getByText(ErrorMessageNetworkErrorMockData.message)).toBeInTheDocument();
  });

  it('has alert role for accessibility', () => {
    const { getByRole } = render(<ErrorMessage {...ErrorMessageMockData} />);

    const alert = getByRole('alert');

    expect(alert).toBeInTheDocument();
  });

  it('renders error icon', () => {
    const { getByText } = render(<ErrorMessage {...ErrorMessageMockData} />);

    const icon = getByText('⚠️');

    expect(icon).toBeInTheDocument();
  });
});
