/**
 * Global type definitions for the application
 * These types are auto-imported throughout the app
 */

/**
 * Generic API response wrapper
 * Used to standardize all API responses
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  status: 'success' | 'error';
}

/**
 * API Error structure
 */
export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

/**
 * Loading state for async operations
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Result type for operations that can fail
 * Inspired by Rust's Result type
 */
export type Result<T, E = ApiError> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
