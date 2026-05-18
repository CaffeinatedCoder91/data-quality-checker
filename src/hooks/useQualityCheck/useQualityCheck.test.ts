import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQualityCheck } from './useQualityCheck';

describe('useQualityCheck', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with idle state', () => {
    const { result } = renderHook(() => useQualityCheck());

    expect(result.current.state).toBe('idle');
    expect(result.current.report).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('throws error when webhook URL is not configured', async () => {
    const { result } = renderHook(() => useQualityCheck());

    vi.stubEnv('VITE_N8N_WEBHOOK_URL', '');

    await act(async () => {
      await result.current.analyse([{ name: 'test' }]);
    });

    expect(result.current.state).toBe('error');
    expect(result.current.error).toContain('Webhook URL not configured');
  });

  it('handles successful API response', async () => {
    const { result } = renderHook(() => useQualityCheck());

    const mockN8NResponse = {
      summary: {
        totalRows: 1,
        totalIssues: 1,
      },
      findings: [
        {
          rowNumber: 1,
          issues: [
            {
              field: 'email',
              message: 'Invalid email format',
              severity: 'high' as const,
            },
          ],
        },
      ],
    };

    const expectedReport = {
      totalRows: 1,
      issuesFound: 1,
      results: [
        {
          row: 1,
          field: 'email',
          issue: 'Invalid email format',
          severity: 'high' as const,
        },
      ],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockN8NResponse),
      } as Response),
    );

    vi.stubEnv('VITE_N8N_WEBHOOK_URL', 'https://webhook.test');

    await act(async () => {
      await result.current.analyse([{ email: 'invalid' }]);
    });

    expect(result.current.state).toBe('success');
    expect(result.current.report).toEqual(expectedReport);
    expect(result.current.error).toBeNull();
  });

  it('handles API errors', async () => {
    const { result } = renderHook(() => useQualityCheck());

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as Response),
    );

    vi.stubEnv('VITE_N8N_WEBHOOK_URL', 'https://webhook.test');

    await act(async () => {
      await result.current.analyse([{ name: 'test' }]);
    });

    expect(result.current.state).toBe('error');
    expect(result.current.error).toBeTruthy();
    expect(result.current.report).toBeNull();
  });

  it('handles network errors', async () => {
    const { result } = renderHook(() => useQualityCheck());

    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    vi.stubEnv('VITE_N8N_WEBHOOK_URL', 'https://webhook.test');

    await act(async () => {
      await result.current.analyse([{ name: 'test' }]);
    });

    expect(result.current.state).toBe('error');
    expect(result.current.error).toContain('Network error');
  });
});
