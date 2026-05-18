import { useState } from 'react';
import type { CSVRow } from '../../types';
import { parseCSV } from '../../utils/csvParser';

interface UseFileUploadResult {
  file: File | null;
  parsedData: CSVRow[];
  handleFileSelect: (selectedFile: File) => Promise<void>;
  reset: () => void;
  error: string | null;
}

export function useFileUpload(): UseFileUploadResult {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<CSVRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File): Promise<void> => {
    setError(null);

    const hasValidExtension = selectedFile.name.toLowerCase().endsWith('.csv');

    if (!hasValidExtension) {
      setError('Please select a valid CSV file');
      return;
    }

    if (selectedFile.size > 1024 * 1024) {
      setError('File is too large (maximum 1MB)');
      return;
    }

    try {
      const data = await parseCSV(selectedFile);
      setFile(selectedFile);
      setParsedData(data);
    } catch {
      setError('Failed to parse CSV file. Please check the format.');
      setFile(null);
      setParsedData([]);
    }
  };

  const reset = (): void => {
    setFile(null);
    setParsedData([]);
    setError(null);
  };

  return {
    file,
    parsedData,
    handleFileSelect,
    reset,
    error,
  };
}
