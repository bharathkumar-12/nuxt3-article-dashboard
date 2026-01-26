/**
 * Generic API Composable
 *
 * Provides a reusable, type-safe wrapper around useFetch with:
 * - Automatic error handling
 * - Request/response transformation
 * - Retry logic
 * - SSR-safe caching
 */

import type { UseFetchOptions } from 'nuxt/app';
import type { ApiError, Result } from '~/types/common';

/**
 * Configuration options for useAPI
 */
interface UseApiOptions<T, R = T> {
  /** Transform the response data */
  transform?: (data: T) => R;
  /** Default value to return on error */
  defaultValue?: R;
  /** Number of retry attempts on failure */
  retries?: number;
  /** Delay between retries in ms */
  retryDelay?: number;
  /** Cache key for SSR/client deduplication */
  key?: string;
  /** Whether to execute immediately */
  immediate?: boolean;
  /** Watch sources that trigger refetch */
  watch?: UseFetchOptions<T>['watch'];
}

/**
 * Standard error messages for different failure scenarios
 */
const ERROR_MESSAGES = {
  NETWORK_ERROR:
    'Unable to connect to the server. Please check your internet connection.',
  TIMEOUT: 'The request timed out. Please try again.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected server error occurred. Please try again later.',
  PARSE_ERROR: 'Failed to parse the server response.',
  UNKNOWN: 'An unexpected error occurred.',
} as const;

/**
 * Create a standardized API error
 */
function createApiError(
  message: string,
  code: string,
  statusCode: number,
  details?: Record<string, unknown>,
): ApiError {
  return {
    message,
    code,
    statusCode,
    details,
  };
}

/**
 * Map HTTP status codes to error messages
 */
function getErrorFromStatus(statusCode: number): {
  message: string;
  code: string;
} {
  if (statusCode === 404) {
    return {
      message: ERROR_MESSAGES.NOT_FOUND ?? 'Not found',
      code: 'NOT_FOUND',
    };
  }
  if (statusCode >= 500) {
    return {
      message: ERROR_MESSAGES.SERVER_ERROR ?? 'Server error',
      code: 'SERVER_ERROR',
    };
  }
  if (statusCode === 408) {
    return { message: ERROR_MESSAGES.TIMEOUT ?? 'Timeout', code: 'TIMEOUT' };
  }
  return {
    message: ERROR_MESSAGES.UNKNOWN ?? 'Unknown error',
    code: 'UNKNOWN',
  };
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generic API composable for type-safe data fetching
 *
 * @example
 * ```ts
 * const { data, pending, error, execute } = useAPI<RawData, CleanData>(
 *   '/api/articles',
 *   {
 *     transform: (raw) => mapToCleanData(raw),
 *     defaultValue: [],
 *   }
 * )
 * ```
 */
export function useAPI<TResponse, TTransformed = TResponse>(
  url: string | (() => string),
  options: UseApiOptions<TResponse, TTransformed> = {},
) {
  const {
    transform,
    defaultValue,
    retries = 0,
    retryDelay = 1000,
    key,
    immediate = true,
    watch: watchSources,
  } = options;

  const config = useRuntimeConfig();

  // Build the full URL
  const buildUrl = (): string => {
    const path = typeof url === 'function' ? url() : url;
    // If it's already a full URL, use it directly
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // If it's an internal API route (starts with /api), use it directly
    if (path.startsWith('/api')) {
      return path;
    }
    // Otherwise, prepend the base URL (for external APIs)
    return `${config.public.apiBase}${path}`;
  };

  // Generate cache key
  const cacheKey = key || `api-${typeof url === 'function' ? 'dynamic' : url}`;

  // Internal retry counter
  let retryCount = 0;

  // The main fetch
  const {
    data,
    pending,
    error: fetchError,
    status,
    execute: originalExecute,
    refresh,
  } = useFetch<TResponse>(buildUrl, {
    key: cacheKey,
    immediate,
    watch: watchSources,
    // Don't throw on error - we handle it ourselves
    ignoreResponseError: true,
    onResponseError: async ({ response }) => {
      // Handle retry logic
      if (retryCount < retries && response.status >= 500) {
        retryCount++;
        await sleep(retryDelay * retryCount);
        await refresh();
      }
    },
  });

  // Computed transformed data
  const transformedData = computed<TTransformed | null>(() => {
    if (data.value === null || data.value === undefined) {
      return defaultValue ?? null;
    }

    try {
      if (transform) {
        return transform(data.value as TResponse);
      }
      return data.value as unknown as TTransformed;
    } catch (e) {
      console.error('[useAPI] Transform error:', e);
      return defaultValue ?? null;
    }
  });

  // Computed error state
  const error = computed<ApiError | null>(() => {
    if (!fetchError.value) return null;

    const err = fetchError.value;

    // Handle network errors
    if (err.message?.includes('fetch') || err.message?.includes('network')) {
      return createApiError(
        ERROR_MESSAGES.NETWORK_ERROR ?? 'Network error',
        'NETWORK_ERROR',
        0,
      );
    }

    // Handle HTTP errors
    const statusCode = (err as { statusCode?: number }).statusCode || 500;
    const { message, code } = getErrorFromStatus(statusCode);

    return createApiError(message, code, statusCode, {
      originalMessage: err.message,
    });
  });

  // Result wrapper for cleaner consumption
  const result = computed<Result<TTransformed>>(() => {
    if (error.value) {
      return { success: false, error: error.value };
    }
    if (transformedData.value !== null) {
      return { success: true, data: transformedData.value };
    }
    // Still loading or no data
    if (defaultValue !== undefined) {
      return { success: true, data: defaultValue };
    }
    return {
      success: false,
      error: createApiError('No data available', 'NO_DATA', 0),
    };
  });

  // Enhanced execute with reset
  const execute = async (): Promise<Result<TTransformed>> => {
    retryCount = 0;
    await originalExecute();
    return result.value;
  };

  // Boolean helpers
  const isLoading = computed(() => pending.value);
  const isError = computed(() => error.value !== null);
  const isSuccess = computed(
    () => !pending.value && !error.value && data.value !== null,
  );
  const isEmpty = computed(() => {
    if (pending.value) return false;
    if (error.value) return false;
    if (transformedData.value === null) return true;
    if (Array.isArray(transformedData.value))
      return transformedData.value.length === 0;
    return false;
  });

  return {
    // Raw data
    rawData: data,
    // Transformed data
    data: transformedData,
    // States
    pending,
    isLoading,
    isError,
    isSuccess,
    isEmpty,
    // Error
    error,
    // Status
    status,
    // Result wrapper
    result,
    // Actions
    execute,
    refresh,
  };
}

/**
 * Type-safe GET request
 */
export function useGet<TResponse, TTransformed = TResponse>(
  url: string | (() => string),
  options?: UseApiOptions<TResponse, TTransformed>,
) {
  return useAPI<TResponse, TTransformed>(url, options);
}

// Note: POST/PUT/DELETE operations would be implemented using $fetch directly
// or via server API routes with proper type definitions. The usePost function
// is omitted here due to Nuxt's strict typed routes requiring proper method
// definitions for each route.
