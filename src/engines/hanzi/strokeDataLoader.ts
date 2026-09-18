/**
 * src/engines/hanzi/strokeDataLoader.ts
 * Pure Engine: Multi-tier stroke data loader and cacher for Hanzi Writer.
 * L1: In-Memory Map (0ms)
 * L2: Cold IndexedDB "hanzi_strokes" store via coldStorage.ts (<5ms)
 * L3: jsDelivr CDN fetch with AbortSignal timeout & JSON validation
 *
 * Strict TypeScript: Zero 'any'
 */

import { getStrokeCache, setStrokeCache } from '../storage/coldStorage';
import { HanziStrokeCacheRecord } from '../storage/types';

export interface HanziStrokeData {
  strokes: string[];
  medians: number[][][];
  radStrokes?: number[];
}

export type StrokeDataLoaderErrorCode =
  | 'INVALID_CHAR'
  | 'NETWORK_ERROR'
  | 'HTTP_ERROR'
  | 'MALFORMED_DATA'
  | 'NOT_FOUND'
  | 'OFFLINE'
  | 'ABORTED';

export class StrokeDataLoaderError extends Error {
  readonly code: StrokeDataLoaderErrorCode;
  readonly status?: number;

  constructor(message: string, code: StrokeDataLoaderErrorCode, status?: number) {
    super(message);
    this.name = 'StrokeDataLoaderError';
    this.code = code;
    this.status = status;
  }
}

export interface StrokeLoaderOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  fetchFn?: typeof fetch;
  cdnBaseUrl?: string;
}

// In-Memory L1 Cache for fast recall during active session
const memoryCache = new Map<string, HanziStrokeData>();

// In-Flight Promise Registry for request coalescing (prevents duplicate storage checks and fetches)
const inFlightRequests = new Map<string, Promise<HanziStrokeData>>();

const DEFAULT_CDN_BASE = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0';
const DEFAULT_TIMEOUT_MS = 5000;

/**
 * Normalizes and sanitizes single character input.
 * Extracts the first valid CJK character if a string is provided.
 */
export function sanitizeHanziChar(input: string): string {
  if (!input || typeof input !== 'string') {
    throw new StrokeDataLoaderError('Character input must be a non-empty string', 'INVALID_CHAR');
  }

  const trimmed = input.trim();
  if (trimmed.length === 0) {
    throw new StrokeDataLoaderError('Character input cannot be empty', 'INVALID_CHAR');
  }

  // Get first character code point (supporting surrogate pairs)
  const firstGlyph = Array.from(trimmed)[0];

  // Regex matches CJK Unified Ideographs, Extension A, and common CJK ranges
  const isCjk = /^[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]$/.test(firstGlyph);
  if (!isCjk) {
    throw new StrokeDataLoaderError(
      `Character "${firstGlyph}" is not a valid CJK Chinese character`,
      'INVALID_CHAR'
    );
  }

  return firstGlyph;
}

/**
 * Strict runtime type guard for HanziStrokeData.
 * Prevents corrupted cache entries or captive portal HTML injections.
 */
export function isHanziStrokeData(val: unknown): val is HanziStrokeData {
  if (typeof val !== 'object' || val === null) return false;
  const obj = val as Record<string, unknown>;

  if (!Array.isArray(obj.strokes) || obj.strokes.length === 0) return false;
  const validStrokes = obj.strokes.every((s) => typeof s === 'string' && s.length > 0);
  if (!validStrokes) return false;

  if (!Array.isArray(obj.medians) || obj.medians.length === 0) return false;
  const validMedians = obj.medians.every(
    (strokeMedians) =>
      Array.isArray(strokeMedians) &&
      strokeMedians.every(
        (point) =>
          Array.isArray(point) &&
          point.length === 2 &&
          typeof point[0] === 'number' &&
          typeof point[1] === 'number'
      )
  );

  return validMedians;
}

/**
 * Fetches raw stroke data from CDN with timeout, abort handling, and validation.
 */
export async function fetchStrokeFromCdn(
  char: string,
  options?: StrokeLoaderOptions
): Promise<HanziStrokeData> {
  const fetchImpl = options?.fetchFn ?? fetch;
  const baseUrl = options?.cdnBaseUrl ?? DEFAULT_CDN_BASE;
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const url = `${baseUrl}/${encodeURIComponent(char)}.json`;

  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | null = null;

  if (options?.signal) {
    if (options.signal.aborted) {
      throw new StrokeDataLoaderError('Request was aborted', 'ABORTED');
    }
    options.signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetchImpl(url, { signal: controller.signal });
    if (timer) clearTimeout(timer);

    if (response.status === 404) {
      throw new StrokeDataLoaderError(`Stroke data for character "${char}" was not found (404)`, 'NOT_FOUND', 404);
    }

    if (!response.ok) {
      throw new StrokeDataLoaderError(
        `Failed to fetch stroke data: HTTP ${response.status}`,
        'HTTP_ERROR',
        response.status
      );
    }

    let parsed: unknown;
    try {
      parsed = await response.json();
    } catch {
      throw new StrokeDataLoaderError(
        'Failed to parse stroke data response as JSON (possible captive portal or corrupt response)',
        'MALFORMED_DATA'
      );
    }

    if (!isHanziStrokeData(parsed)) {
      throw new StrokeDataLoaderError(
        'Stroke data payload does not match the required HanziStrokeData schema',
        'MALFORMED_DATA'
      );
    }

    return {
      strokes: parsed.strokes,
      medians: parsed.medians,
      radStrokes: Array.isArray(parsed.radStrokes) ? parsed.radStrokes : undefined,
    };
  } catch (err: unknown) {
    if (timer) clearTimeout(timer);

    if (err instanceof StrokeDataLoaderError) {
      throw err;
    }

    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        if (options?.signal?.aborted) {
          throw new StrokeDataLoaderError('Request was aborted by caller', 'ABORTED');
        }
        throw new StrokeDataLoaderError(
          `Request timed out after ${timeoutMs}ms`,
          'NETWORK_ERROR'
        );
      }
      if (err.message.includes('offline') || err.message.includes('Failed to fetch')) {
        throw new StrokeDataLoaderError(
          `Network offline or unreachable while fetching "${char}"`,
          'OFFLINE'
        );
      }
    }

    throw new StrokeDataLoaderError(
      `Unexpected error while loading stroke data for "${char}": ${String(err)}`,
      'NETWORK_ERROR'
    );
  }
}

/**
 * Loads stroke data through the multi-tier caching hierarchy:
 * 1. L1 Memory Cache
 * 2. In-flight request deduplication
 * 3. L2 IndexedDB Cold Storage
 * 4. L3 CDN Network Fetch + Backfill
 */
export async function loadStrokeData(
  charInput: string,
  options?: StrokeLoaderOptions
): Promise<HanziStrokeData> {
  const char = sanitizeHanziChar(charInput);

  if (options?.signal?.aborted) {
    throw new StrokeDataLoaderError('Request was aborted before execution', 'ABORTED');
  }

  // 1. Check L1 Memory Cache
  const memoryHit = memoryCache.get(char);
  if (memoryHit) {
    return memoryHit;
  }

  // 2. Check In-Flight Coalescing (encompasses both IDB check and CDN fetch)
  const existingRequest = inFlightRequests.get(char);
  if (existingRequest) {
    return existingRequest;
  }

  const loadPipelinePromise = (async () => {
    try {
      // 3. Check L2 IndexedDB Cold Storage
      try {
        const idbHit = await getStrokeCache(char);
        if (idbHit && isHanziStrokeData(idbHit)) {
          const formattedData: HanziStrokeData = {
            strokes: idbHit.strokes,
            medians: idbHit.medians,
          };
          memoryCache.set(char, formattedData);
          return formattedData;
        }
      } catch {
        // If IDB read fails, smoothly proceed to network tier
      }

      if (options?.signal?.aborted) {
        throw new StrokeDataLoaderError('Request was aborted after storage check', 'ABORTED');
      }

      // 4. L3 Network Fetch
      const strokeData = await fetchStrokeFromCdn(char, options);

      // Backfill L1 Memory Cache
      memoryCache.set(char, strokeData);

      // Backfill L2 IndexedDB Cold Storage (fire & forget)
      const recordToStore: HanziStrokeCacheRecord = {
        char,
        strokes: strokeData.strokes,
        medians: strokeData.medians,
        cached_at: Date.now(),
      };
      setStrokeCache(recordToStore).catch((e) => {
        console.warn('[Hanzero] Failed to backfill stroke data into IndexedDB:', e);
      });

      return strokeData;
    } finally {
      inFlightRequests.delete(char);
    }
  })();

  inFlightRequests.set(char, loadPipelinePromise);
  return loadPipelinePromise;
}

/**
 * Factory for HanziWriter's `charDataLoader` option.
 * Compatible with HanziWriter's `(char, onLoad, onError) => Promise<CharacterJson> | void`.
 */
export function createCharDataLoader(
  options?: StrokeLoaderOptions
): (
  char: string,
  onLoad: (data: HanziStrokeData) => void,
  onError: (err: unknown) => void
) => Promise<HanziStrokeData> {
  return async (char: string, onLoad: (data: HanziStrokeData) => void, onError: (err: unknown) => void) => {
    try {
      const data = await loadStrokeData(char, options);
      onLoad(data);
      return data;
    } catch (error) {
      onError(error);
      throw error;
    }
  };
}

/**
 * Testing utility: Clears in-memory caches and in-flight promises.
 */
export function _resetStrokeDataLoaderMemoryCacheForTesting(): void {
  memoryCache.clear();
  inFlightRequests.clear();
}
