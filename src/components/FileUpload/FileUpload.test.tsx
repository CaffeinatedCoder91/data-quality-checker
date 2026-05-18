import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { FileUpload } from './FileUpload';
import {
  FileUploadMockData,
  FileUploadWithSelectedFileMockData,
  FileUploadWithErrorMockData,
} from './fileUpload.mockdata';

describe('FileUpload', () => {
  it('renders upload form', () => {
    const { getByText } = render(<FileUpload {...FileUploadMockData} />);

    expect(getByText('Upload CSV File')).toBeInTheDocument();
    expect(getByText('Drag and drop your CSV file here')).toBeInTheDocument();
  });

  it('disables analyse button when no file is selected', () => {
    const { getByRole } = render(<FileUpload {...FileUploadMockData} />);

    const analyseButton = getByRole('button', { name: 'Analyse' });

    expect(analyseButton).toBeDisabled();
  });

  it('enables analyse button when file is selected', () => {
    const { getByRole } = render(<FileUpload {...FileUploadWithSelectedFileMockData} />);

    const analyseButton = getByRole('button', { name: 'Analyse' });

    expect(analyseButton).not.toBeDisabled();
  });

  it('shows selected filename', () => {
    const { getByText } = render(<FileUpload {...FileUploadWithSelectedFileMockData} />);

    expect(getByText('Selected: test.csv')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    const { getByRole } = render(<FileUpload {...FileUploadMockData} isLoading={true} />);

    const analyseButton = getByRole('button', { name: 'Analysing...' });

    expect(analyseButton).toBeDisabled();
  });

  it('displays error message', () => {
    const { getByText } = render(<FileUpload {...FileUploadWithErrorMockData} />);

    expect(getByText('File size too large')).toBeInTheDocument();
  });

  it('calls onSubmit when analyse button is clicked', () => {
    const handleSubmit = vi.fn();
    const { getByRole } = render(
      <FileUpload {...FileUploadWithSelectedFileMockData} onSubmit={handleSubmit} />
    );

    const analyseButton = getByRole('button', { name: 'Analyse' });
    fireEvent.click(analyseButton);

    expect(handleSubmit).toHaveBeenCalledOnce();
  });

  it('calls onFileSelect when file is selected via input', () => {
    const handleFileSelect = vi.fn();
    const { container } = render(
      <FileUpload {...FileUploadMockData} onFileSelect={handleFileSelect} />
    );

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const testFile = new File(['test'], 'test.csv', { type: 'text/csv' });

    fireEvent.change(fileInput, { target: { files: [testFile] } });

    expect(handleFileSelect).toHaveBeenCalledWith(testFile);
  });
});
