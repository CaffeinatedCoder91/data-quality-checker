import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFileUpload } from './useFileUpload';

describe('useFileUpload', () => {
  it('initializes with empty state', () => {
    const { result } = renderHook(() => useFileUpload());

    expect(result.current.file).toBeNull();
    expect(result.current.parsedData).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('rejects non-CSV files', async () => {
    const { result } = renderHook(() => useFileUpload());

    const textFile = new File(['content'], 'test.txt', { type: 'text/plain' });

    await act(async () => {
      await result.current.handleFileSelect(textFile);
    });

    expect(result.current.file).toBeNull();
    expect(result.current.error).toBe('Please select a valid CSV file');
  });

  it('rejects files larger than 1MB', async () => {
    const { result } = renderHook(() => useFileUpload());

    const largeFile = new File(['x'.repeat(1024 * 1024 + 1)], 'large.csv', {
      type: 'text/csv',
    });

    await act(async () => {
      await result.current.handleFileSelect(largeFile);
    });

    expect(result.current.file).toBeNull();
    expect(result.current.error).toBe('File is too large (maximum 1MB)');
  });

  it('parses valid CSV file', async () => {
    const { result } = renderHook(() => useFileUpload());

    const csvContent = 'name,age\nJohn,25\nJane,30';
    const csvFile = new File([csvContent], 'test.csv');

    await act(async () => {
      await result.current.handleFileSelect(csvFile);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.file).toBe(csvFile);
    expect(result.current.parsedData).toHaveLength(2);
    expect(result.current.parsedData[0]).toEqual({ name: 'John', age: '25' });
    expect(result.current.parsedData[1]).toEqual({ name: 'Jane', age: '30' });
  });

  it('handles CSV with no data rows gracefully', async () => {
    const { result } = renderHook(() => useFileUpload());

    const csvFileWithOnlyHeaders = new File(['name,age'], 'test.csv');

    await act(async () => {
      await result.current.handleFileSelect(csvFileWithOnlyHeaders);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.file).toBe(csvFileWithOnlyHeaders);
    expect(result.current.parsedData).toEqual([]);
  });
});
