/**
 * Domain Model Mappers
 * Transform raw API responses into clean, typed domain models
 * Handle missing/malformed data gracefully
 */

import type {
  Article,
  ArticleAuthor,
  ArticleCategory,
  ArticleDetail,
  ArticleListItem,
  ArticleStatus,
} from '~/types/article';
import type {
  ApiArticleResponse,
  ApiAuthorResponse,
  ApiCategoryResponse,
  ApiArticleDetailResponse,
} from '../api/article.api';
import { isApiArticleArray, isApiRootResponse } from '../api/article.api';

/**
 * Default values for when data is missing
 */
const DEFAULTS = {
  author: {
    id: 'unknown',
    name: 'Unknown Author',
    email: 'unknown@example.com',
  } as ArticleAuthor,
  category: {
    id: 'uncategorized',
    name: 'Uncategorized',
    slug: 'uncategorized',
  } as ArticleCategory,
  article: {
    title: 'Untitled Article',
    excerpt: '',
    content: '',
    tags: [] as string[],
    status: 'draft' as ArticleStatus,
    viewCount: 0,
    readingTime: 1,
  },
} as const;

/**
 * Safely parse a date string
 */
function parseDate(dateString: string | null | undefined): Date | null {
  if (!dateString) return null;
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Safely parse a date with fallback to current date
 */
function parseDateWithFallback(dateString: string | null | undefined): Date {
  const parsed = parseDate(dateString);
  return parsed ?? new Date();
}

/**
 * Generate a unique ID if missing
 */
function ensureId(id: string | number | undefined): string {
  if (id === undefined || id === null) {
    return `generated-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
  return String(id);
}

/**
 * Generate a slug from title if missing
 */
function generateSlug(title: string, id: string): string {
  if (!title) return `article-${id}`;
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract excerpt from content if missing
 */
function extractExcerpt(content: string, maxLength = 160): string {
  if (!content) return '';
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Calculate reading time from content
 */
function calculateReadingTime(content: string): number {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}

/**
 * Validate and normalize article status
 */
function normalizeStatus(status: string | undefined): ArticleStatus {
  const validStatuses: ArticleStatus[] = ['draft', 'published', 'archived'];
  const normalized = status?.toLowerCase() as ArticleStatus;
  return validStatuses.includes(normalized) ? normalized : 'draft';
}

/**
 * Parse tags from various formats
 */
function parseTags(tags: string[] | string | null | undefined): string[] {
  if (!tags) return [];
  if (Array.isArray(tags))
    return tags.filter((tag) => typeof tag === 'string' && tag.length > 0);
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }
  return [];
}

/**
 * Map API author to domain author
 */
export function mapApiAuthorToDomain(
  apiAuthor: ApiAuthorResponse | string | null | undefined,
  fallbackName?: string | null,
): ArticleAuthor {
  // Handle string author (just name)
  if (typeof apiAuthor === 'string') {
    return {
      ...DEFAULTS.author,
      name: apiAuthor,
    };
  }

  // Handle null/undefined
  if (!apiAuthor) {
    return fallbackName
      ? { ...DEFAULTS.author, name: fallbackName }
      : DEFAULTS.author;
  }

  // Handle object author
  return {
    id: ensureId(apiAuthor.id),
    name: apiAuthor.name || fallbackName || DEFAULTS.author.name,
    email: apiAuthor.email || DEFAULTS.author.email,
    avatar: apiAuthor.avatar || apiAuthor.profile_image || undefined,
  };
}

/**
 * Map API category to domain category
 */
export function mapApiCategoryToDomain(
  apiCategory: ApiCategoryResponse | string | null | undefined,
  fallbackName?: string | null,
): ArticleCategory {
  // Handle string category (just name)
  if (typeof apiCategory === 'string') {
    return {
      id: generateSlug(apiCategory, 'cat'),
      name: apiCategory,
      slug: generateSlug(apiCategory, 'cat'),
    };
  }

  // Handle null/undefined
  if (!apiCategory) {
    return fallbackName
      ? {
          id: generateSlug(fallbackName, 'cat'),
          name: fallbackName,
          slug: generateSlug(fallbackName, 'cat'),
        }
      : DEFAULTS.category;
  }

  // Handle object category
  const name = apiCategory.name || DEFAULTS.category.name;
  return {
    id: ensureId(apiCategory.id),
    name,
    slug: apiCategory.slug || generateSlug(name, ensureId(apiCategory.id)),
  };
}

/**
 * Map API article to domain Article (full model)
 */
export function mapApiArticleToDomain(apiArticle: ApiArticleResponse): Article {
  const id = ensureId(apiArticle.id);
  const title = apiArticle.title || DEFAULTS.article.title;
  const content =
    apiArticle.content || apiArticle.body || DEFAULTS.article.content;
  const excerpt =
    apiArticle.excerpt ||
    apiArticle.summary ||
    apiArticle.description ||
    extractExcerpt(content);

  return {
    id,
    title,
    slug: apiArticle.slug || generateSlug(title, id),
    excerpt,
    content,
    author: mapApiAuthorToDomain(apiArticle.author, apiArticle.author_name),
    category: mapApiCategoryToDomain(
      apiArticle.category,
      apiArticle.category_name,
    ),
    tags: parseTags(apiArticle.tags),
    featuredImage:
      apiArticle.featured_image ||
      apiArticle.featuredImage ||
      apiArticle.image ||
      apiArticle.thumbnail ||
      undefined,
    status: normalizeStatus(apiArticle.status),
    viewCount:
      apiArticle.view_count || apiArticle.viewCount || apiArticle.views || 0,
    readingTime:
      apiArticle.reading_time ||
      apiArticle.readingTime ||
      calculateReadingTime(content),
    publishedAt: parseDate(apiArticle.published_at || apiArticle.publishedAt),
    createdAt: parseDateWithFallback(
      apiArticle.created_at || apiArticle.createdAt,
    ),
    updatedAt: parseDateWithFallback(
      apiArticle.updated_at || apiArticle.updatedAt,
    ),
  };
}

/**
 * Map API article to ArticleListItem (lighter model for lists)
 */
export function mapApiArticleToListItem(
  apiArticle: ApiArticleResponse,
): ArticleListItem {
  const full = mapApiArticleToDomain(apiArticle);

  return {
    id: full.id,
    title: full.title,
    slug: full.slug,
    excerpt: full.excerpt,
    author: {
      id: full.author.id,
      name: full.author.name,
      avatar: full.author.avatar,
    },
    category: full.category,
    featuredImage: full.featuredImage,
    status: full.status,
    readingTime: full.readingTime,
    publishedAt: full.publishedAt,
  };
}

/**
 * Map API article to ArticleDetail (with related articles)
 */
export function mapApiArticleToDetail(
  apiResponse: ApiArticleDetailResponse | ApiArticleResponse,
): ArticleDetail {
  // Handle wrapped response
  const articleData =
    'article' in apiResponse && apiResponse.article
      ? apiResponse.article
      : 'data' in apiResponse &&
          apiResponse.data &&
          !Array.isArray(apiResponse.data)
        ? (apiResponse.data as ApiArticleResponse)
        : (apiResponse as ApiArticleResponse);

  const article = mapApiArticleToDomain(articleData);

  // Map related articles if present
  const relatedRaw =
    ('related' in apiResponse && apiResponse.related) ||
    ('related_articles' in apiResponse && apiResponse.related_articles) ||
    [];

  const relatedArticles = Array.isArray(relatedRaw)
    ? relatedRaw.map(mapApiArticleToListItem)
    : [];

  return {
    ...article,
    relatedArticles: relatedArticles.length > 0 ? relatedArticles : undefined,
  };
}

/**
 * Extract articles array from various response shapes
 */
export function extractArticlesFromResponse(
  response: unknown,
): ApiArticleResponse[] {
  // Direct array
  if (isApiArticleArray(response)) {
    return response;
  }

  // Object with articles/data/items
  if (isApiRootResponse(response)) {
    if (response.articles) return response.articles;
    if (response.items) return response.items;
    if (response.data) {
      if (Array.isArray(response.data)) return response.data;
      if (
        typeof response.data === 'object' &&
        'articles' in response.data &&
        response.data.articles
      ) {
        return response.data.articles;
      }
    }
  }

  // Couldn't extract articles
  return [];
}

/**
 * Map entire API response to domain ArticleListItem array
 */
export function mapApiResponseToArticleList(
  response: unknown,
): ArticleListItem[] {
  const rawArticles = extractArticlesFromResponse(response);
  return rawArticles.map(mapApiArticleToListItem);
}
