import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useBundleState } from '../hooks/useBundleState';

describe('useBundleState Custom Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with seed quantities matching design', () => {
    const { result } = renderHook(() => useBundleState());
    expect(result.current.quantities['wyze-cam-v4:white']).toBe(1);
    expect(result.current.quantities['wyze-cam-pan-v3:white']).toBe(2);
  });

  it('calculates totals, compare-at prices, and bundle savings correctly', () => {
    const { result } = renderHook(() => useBundleState());
    expect(result.current.totals.totalActive).toBe('188.91');
    expect(parseFloat(result.current.totals.totalOriginal)).toBeGreaterThan(200);
    expect(parseFloat(result.current.totals.totalSavings)).toBeGreaterThan(40);
  });

  it('tracks variants independently when updated', () => {
    const { result } = renderHook(() => useBundleState());

    act(() => {
      // Add 1 of Black variant for Wyze Cam v4
      result.current.updateQuantity('wyze-cam-v4:black', 1);
    });

    // White variant quantity remains 1 while Black is now 1
    expect(result.current.quantities['wyze-cam-v4:white']).toBe(1);
    expect(result.current.quantities['wyze-cam-v4:black']).toBe(1);
  });

  it('saves state to localStorage and restores configuration', () => {
    const { result } = renderHook(() => useBundleState());

    act(() => {
      result.current.saveBundle();
    });

    const stored = localStorage.getItem('wyze_bundle_config_v1');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored);
    expect(parsed.quantities['wyze-cam-v4:white']).toBe(1);
  });
});
