/**
 * API Response Models
 * These represent the raw shape of data from the API
 * They are intentionally permissive to handle partial/malformed responses
 */

/**
 * Raw author from API - may have missing fields
 */
export interface ApiAuthorResponse {
  id?: string | number;
  name?: string;
  email?: string;
  avatar?: string | null;
  profile_image?: string | null; // alternative field name
}

/**
 * Raw category from API
 */
export interface ApiCategoryResponse {
  id?: string | number;
  name?: string;
  slug?: string;
}

/**
 * Raw article from API - handles various field naming conventions
 */
export interface ApiArticleResponse {
  id?: string | number;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  summary?: string | null; // alternative to excerpt
  description?: string | null; // alternative to excerpt
  content?: string;
  body?: string; // alternative to content
  author?: ApiAuthorResponse | string | null;
  author_name?: string | null; // inline author name
  category?: ApiCategoryResponse | string | null;
  category_name?: string | null;
  tags?: string[] | string | null;
  featured_image?: string | null;
  featuredImage?: string | null;
  image?: string | null;
  thumbnail?: string | null;
  status?: string;
  view_count?: number;
  viewCount?: number;
  views?: number;
  reading_time?: number;
  readingTime?: number;
  published_at?: string | null;
  publishedAt?: string | null;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

/**
 * Root API response structure
 * The API might return data in different shapes
 */
export interface ApiArticlesRootResponse {
  // Array at root
  articles?: ApiArticleResponse[];
  // Alternative naming
  data?: ApiArticleResponse[] | { articles?: ApiArticleResponse[] };
  // Direct array (when API returns [...])
  items?: ApiArticleResponse[];
  // Pagination info if present
  meta?: {
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
  };
  pagination?: {
    currentPage?: number;
    perPage?: number;
    total?: number;
    lastPage?: number;
  };
}

/**
 * Single article response
 */
export interface ApiArticleDetailResponse {
  article?: ApiArticleResponse;
  data?: ApiArticleResponse;
  related?: ApiArticleResponse[];
  related_articles?: ApiArticleResponse[];
}

/**
 * Type guard to check if response is array
 */
export function isApiArticleArray(data: unknown): data is ApiArticleResponse[] {
  return Array.isArray(data);
}

/**
 * Type guard for root response object
 */
export function isApiRootResponse(
  data: unknown,
): data is ApiArticlesRootResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    ('articles' in data || 'data' in data || 'items' in data)
  );
}
