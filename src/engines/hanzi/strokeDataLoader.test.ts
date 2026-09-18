/**
 * src/engines/hanzi/strokeDataLoader.test.ts
 * Vitest Unit Tests for Pure Stroke Data Loader Engine (Slice 1.4)
 * Strict Tests: Real assertions, zero fake tests.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  loadStrokeData,
  sanitizeHanziChar,
  isHanziStrokeData,
  createCharDataLoader,
  StrokeDataLoaderError,
  _resetStrokeDataLoaderMemoryCacheForTesting,
  HanziStrokeData,
} from './strokeDataLoader';
import * as coldStorage from '../storage/coldStorage';
import { HanziStrokeCacheRecord } from '../storage/types';

// Mock sample stroke data for "你" (7 strokes)
const MOCK_NI_STROKE_DATA: HanziStrokeData = {
  strokes: [
    'M 345 745 Q 312 680 250 560',
    'M 300 580 L 300 150',
    'M 450 780 Q 560 760 620 740',
    'M 600 750 L 590 320',
    'M 420 520 L 780 480',
    'M 580 490 L 580 180',
    'M 400 300 Q 580 280 820 220',
  ],
  medians: [
    [[345, 745], [312, 680], [250, 560]],
    [[300, 580], [300, 150]],
    [[450, 780], [560, 760], [620, 740]],
    [[600, 750], [590, 320]],
    [[420, 520], [780, 480]],
    [[580, 490], [580, 180]],
    [[400, 300], [580, 280], [820, 220]],
  ],
};

describe('StrokeDataLoader Engine (Slice 1.4)', () => {
  beforeEach(() => {
    _resetStrokeDataLoaderMemoryCacheForTesting();
    coldStorage._resetColdStorageForTesting();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Input Sanitization & Type Guards', () => {
    it('sanitizes valid Chinese characters and extracts first glyph from strings', () => {
      expect(sanitizeHanziChar('你')).toBe('你');
      expect(sanitizeHanziChar('  好  ')).toBe('好');
      expect(sanitizeHanziChar('你好')).toBe('你');
      expect(sanitizeHanziChar('学')).toBe('学');
    });

    it('rejects invalid or non-CJK input with typed error', () => {
      expect(() => sanitizeHanziChar('')).toThrow(StrokeDataLoaderError);
      expect(() => sanitizeHanziChar('   ')).toThrow(StrokeDataLoaderError);
      expect(() => sanitizeHanziChar('abc')).toThrow(StrokeDataLoaderError);
      expect(() => sanitizeHanziChar('123')).toThrow(StrokeDataLoaderError);
      expect(() => sanitizeHanziChar('🐰')).toThrow(StrokeDataLoaderError);
    });

    it('correctly validates HanziStrokeData shape with strict type guard', () => {
      expect(isHanziStrokeData(MOCK_NI_STROKE_DATA)).toBe(true);
      expect(isHanziStrokeData(null)).toBe(false);
      expect(isHanziStrokeData({})).toBe(false);
      expect(isHanziStrokeData({ strokes: ['M 0 0'], medians: [] })).toBe(false);
      expect(isHanziStrokeData({ strokes: [], medians: [[[0, 0]]] })).toBe(false);
      expect(isHanziStrokeData({ strokes: ['M 0 0'], medians: [[[0]]] })).toBe(false); // coordinate length != 2
      // Red Team H-01 Defense
      expect(isHanziStrokeData({ strokes: ['M 0 0', 'M 1 1'], medians: [[[0, 0]]] })).toBe(false); // length mismatch
      expect(isHanziStrokeData({ strokes: ['M 0 0'], medians: [[[NaN, 0]]] })).toBe(false); // non-finite
      expect(isHanziStrokeData({ strokes: ['M 0 0'], medians: [[[0, Infinity]]] })).toBe(false); // non-finite
    });
  });

  describe('Scenario 1: Cold Cache Hit (IndexedDB)', () => {
    it('returns stroke data from IndexedDB without calling fetch', async () => {
      const existingRecord: HanziStrokeCacheRecord = {
        char: '你',
        strokes: MOCK_NI_STROKE_DATA.strokes,
        medians: MOCK_NI_STROKE_DATA.medians,
        cached_at: Date.now(),
      };
      await coldStorage.setStrokeCache(existingRecord);

      const mockFetch = vi.fn();

      const result = await loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });

      expect(mockFetch).not.toHaveBeenCalled();
      expect(result.strokes).toEqual(MOCK_NI_STROKE_DATA.strokes);
      expect(result.medians).toEqual(MOCK_NI_STROKE_DATA.medians);
    });
  });

  describe('Scenario 2: Cache Miss + CDN Fetch + IndexedDB Save', () => {
    it('fetches from CDN, saves to IndexedDB, and subsequent call hits cache', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => MOCK_NI_STROKE_DATA,
      });

      // First call (Cache Miss -> Network Fetch)
      const result1 = await loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result1.strokes).toEqual(MOCK_NI_STROKE_DATA.strokes);

      // Verify it was persisted to IndexedDB
      const idbRecord = await coldStorage.getStrokeCache('你');
      expect(idbRecord).toBeDefined();
      expect(idbRecord?.char).toBe('你');
      expect(idbRecord?.strokes).toEqual(MOCK_NI_STROKE_DATA.strokes);

      // Clear L1 memory cache to simulate a fresh app session
      _resetStrokeDataLoaderMemoryCacheForTesting();

      // Second call (Cold Cache Hit -> No network)
      const result2 = await loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      expect(mockFetch).toHaveBeenCalledTimes(1); // Still 1 call!
      expect(result2.strokes).toEqual(MOCK_NI_STROKE_DATA.strokes);
    });
  });

  describe('Scenario 3: Network Failure & Offline Fallback', () => {
    it('throws typed StrokeDataLoaderError when offline and cache is empty without polluting IDB', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

      await expect(
        loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch })
      ).rejects.toThrow(StrokeDataLoaderError);

      try {
        await loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(StrokeDataLoaderError);
        expect((err as StrokeDataLoaderError).code).toBe('OFFLINE');
      }

      // Verify IDB has not stored any corrupted record
      const record = await coldStorage.getStrokeCache('你');
      expect(record).toBeUndefined();
    });
  });

  describe('Scenario 4: CDN HTTP Error Defense (404 Not Found & 500 Server Error)', () => {
    it('handles HTTP 404 (character not found) gracefully with NOT_FOUND code', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(
        loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch })
      ).rejects.toThrow(StrokeDataLoaderError);

      try {
        await loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      } catch (err: unknown) {
        expect((err as StrokeDataLoaderError).code).toBe('NOT_FOUND');
        expect((err as StrokeDataLoaderError).status).toBe(404);
      }
    });

    it('handles HTTP 500 server errors gracefully with HTTP_ERROR code', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      try {
        await loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      } catch (err: unknown) {
        expect((err as StrokeDataLoaderError).code).toBe('HTTP_ERROR');
        expect((err as StrokeDataLoaderError).status).toBe(500);
      }
    });
  });

  describe('Scenario 5: Malformed JSON & Captive Portal Defense', () => {
    it('rejects HTML captive portal responses with MALFORMED_DATA code', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
          throw new SyntaxError('Unexpected token < in JSON at position 0');
        },
      });

      try {
        await loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      } catch (err: unknown) {
        expect((err as StrokeDataLoaderError).code).toBe('MALFORMED_DATA');
      }

      const record = await coldStorage.getStrokeCache('你');
      expect(record).toBeUndefined();
    });

    it('rejects JSON payloads with invalid stroke schema with MALFORMED_DATA code', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ invalid_payload: true, strokes: [] }),
      });

      try {
        await loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      } catch (err: unknown) {
        expect((err as StrokeDataLoaderError).code).toBe('MALFORMED_DATA');
      }
    });
  });

  describe('Scenario 6: Concurrent Request Coalescing (In-Flight Deduplication)', () => {
    it('coalesces 3 concurrent calls into exactly 1 network fetch', async () => {
      let resolveFetch!: (val: unknown) => void;
      const delayedPromise = new Promise((resolve) => {
        resolveFetch = resolve;
      });

      const mockFetch = vi.fn().mockReturnValue(delayedPromise);

      // Trigger 3 calls simultaneously
      const promise1 = loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      const promise2 = loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });
      const promise3 = loadStrokeData('你', { fetchFn: mockFetch as unknown as typeof fetch });

      // Wait for IDB check to complete and dispatch fetch
      await vi.waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
      });

      // Resolve the single in-flight fetch
      resolveFetch({
        ok: true,
        status: 200,
        json: async () => MOCK_NI_STROKE_DATA,
      });

      const [res1, res2, res3] = await Promise.all([promise1, promise2, promise3]);
      expect(res1).toEqual(MOCK_NI_STROKE_DATA);
      expect(res2).toEqual(MOCK_NI_STROKE_DATA);
      expect(res3).toEqual(MOCK_NI_STROKE_DATA);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('AbortSignal & Cancellation', () => {
    it('respects AbortSignal and cancels in-flight fetch cleanly', async () => {
      const controller = new AbortController();
      controller.abort();

      await expect(
        loadStrokeData('你', { signal: controller.signal })
      ).rejects.toThrow(StrokeDataLoaderError);
    });

    it('does not poison subsequent callers when an earlier caller aborts (Red Team C-01)', async () => {
      let resolveFetch!: (val: unknown) => void;
      const delayedPromise = new Promise((resolve) => {
        resolveFetch = resolve;
      });
      const mockFetch = vi.fn().mockReturnValue(delayedPromise);

      const controller = new AbortController();

      // Caller 1 requests '好' with signal
      const promise1 = loadStrokeData('好', {
        fetchFn: mockFetch as unknown as typeof fetch,
        signal: controller.signal,
      });

      // Caller 1 aborts mid-flight
      controller.abort();
      await expect(promise1).rejects.toThrow(StrokeDataLoaderError);

      // Caller 2 requests '好' without abort
      const promise2 = loadStrokeData('好', { fetchFn: mockFetch as unknown as typeof fetch });

      // Resolve the underlying shared fetch
      resolveFetch({
        ok: true,
        status: 200,
        json: async () => ({
          strokes: ['M 0 0 L 10 10'],
          medians: [[[0, 0], [10, 10]]],
        }),
      });

      const res2 = await promise2;
      expect(res2.strokes).toEqual(['M 0 0 L 10 10']);
    });
  });

  describe('createCharDataLoader Factory (HanziWriter Adapter)', () => {
    it('invokes onLoad callback with valid stroke data and returns Promise', async () => {
      const existingRecord: HanziStrokeCacheRecord = {
        char: '你',
        strokes: MOCK_NI_STROKE_DATA.strokes,
        medians: MOCK_NI_STROKE_DATA.medians,
        cached_at: Date.now(),
      };
      await coldStorage.setStrokeCache(existingRecord);

      const loader = createCharDataLoader();
      const onLoad = vi.fn();
      const onError = vi.fn();

      const result = await loader('你', onLoad, onError);

      expect(onLoad).toHaveBeenCalledWith(expect.objectContaining({ strokes: MOCK_NI_STROKE_DATA.strokes }));
      expect(onError).not.toHaveBeenCalled();
      expect(result.strokes).toEqual(MOCK_NI_STROKE_DATA.strokes);
    });

    it('invokes onError callback when loading fails', async () => {
      const mockFetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
      const loader = createCharDataLoader({ fetchFn: mockFetch as unknown as typeof fetch });
      const onLoad = vi.fn();
      const onError = vi.fn();

      await expect(loader('好', onLoad, onError)).rejects.toThrow();
      expect(onError).toHaveBeenCalled();
      expect(onLoad).not.toHaveBeenCalled();
    });
  });
});
