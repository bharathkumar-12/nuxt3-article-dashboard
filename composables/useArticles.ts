/**
 * Articles Composable
 *
 * Feature-specific composable for article data fetching.
 * Abstracts all article-related API calls and provides clean,
 * typed interfaces for components to consume.
 */

import type {
  ArticleListItem,
  ArticleDetail,
  ArticleFilters,
} from '~/types/article';
import {
  mapApiResponseToArticleList,
  mapApiArticleToDetail,
} from '~/models/domain/article.mapper';

/**
 * Composable return type for article list
 */
interface UseArticlesListReturn {
  articles: Ref<ArticleListItem[]>;
  isLoading: Ref<boolean>;
  isError: Ref<boolean>;
  isEmpty: Ref<boolean>;
  error: Ref<{ message: string; code: string } | null>;
  refresh: () => Promise<void>;
}

/**
 * Composable return type for single article
 */
interface UseArticleDetailReturn {
  article: Ref<ArticleDetail | null>;
  isLoading: Ref<boolean>;
  isError: Ref<boolean>;
  error: Ref<{ message: string; code: string } | null>;
  refresh: () => Promise<void>;
}

/**
 * Fetch list of articles with SSR support
 *
 * @example
 * ```ts
 * const { articles, isLoading, error } = await useArticlesList()
 * ```
 */
export async function useArticlesList(
  _filters?: ArticleFilters,
): Promise<UseArticlesListReturn> {
  // Use the generic API composable with transformation
  // Note: We use our internal API endpoint which proxies/falls back to mock data
  const {
    data,
    isLoading,
    isError,
    isEmpty,
    error,
    refresh: apiRefresh,
  } = useAPI<unknown, ArticleListItem[]>(
    '/api/articles', // Use internal API endpoint
    {
      key: 'articles-list',
      transform: (rawData) => {
        try {
          return mapApiResponseToArticleList(rawData);
        } catch (e) {
          console.error('[useArticlesList] Mapping error:', e);
          return [];
        }
      },
      defaultValue: [],
      retries: 2,
      retryDelay: 1000,
    },
  );

  // Ensure data is fetched during SSR
  if (import.meta.server) {
    await apiRefresh();
  }

  // Create a safe articles ref
  const articles = computed(() => data.value ?? []);

  // Typed error ref
  const typedError = computed(() => {
    if (!error.value) return null;
    return {
      message: error.value.message,
      code: error.value.code,
    };
  });

  const refresh = async () => {
    await apiRefresh();
  };

  return {
    articles,
    isLoading,
    isError,
    isEmpty,
    error: typedError,
    refresh,
  };
}

/**
 * Fetch a single article by ID with SSR support
 *
 * @example
 * ```ts
 * const { article, isLoading, error } = await useArticleDetail('123')
 * ```
 */
export async function useArticleDetail(
  articleId: string | Ref<string>,
): Promise<UseArticleDetailReturn> {
  const id = toValue(articleId);

  const {
    data,
    isLoading,
    error,
    refresh: apiRefresh,
  } = useAPI<unknown, ArticleDetail | null>(
    `/api/articles/${id}`,
    {
      key: `article-detail-${id}`,
      transform: (rawData) => {
        try {
          return mapApiArticleToDetail(rawData as Parameters<typeof mapApiArticleToDetail>[0]);
        } catch (e) {
          console.error('[useArticleDetail] Mapping error:', e);
          return null;
        }
      },
      defaultValue: null,
      retries: 2,
    },
  );

  if (import.meta.server) {
    await apiRefresh();
  }

  const article = computed<ArticleDetail | null>(() => data.value ?? null);

  const typedError = computed(() => {
    if (error.value) {
      return { message: error.value.message, code: error.value.code };
    }
    if (!isLoading.value && !article.value) {
      return { message: `Article with ID "${id}" was not found.`, code: 'NOT_FOUND' };
    }
    return null;
  });

  return {
    article,
    isLoading,
    isError: computed(() => typedError.value !== null),
    error: typedError,
    refresh: apiRefresh,
  };
}

/**
 * Helper to get articles by category
 */
export async function useArticlesByCategory(
  categorySlug: string,
): Promise<UseArticlesListReturn> {
  const result = await useArticlesList();

  // Filter articles by category on the client side
  // In production, this would be a server-side filter
  const filteredArticles = computed(() =>
    result.articles.value.filter(
      (article) => article.category.slug === categorySlug,
    ),
  );

  return {
    ...result,
    articles: filteredArticles,
    isEmpty: computed(() => filteredArticles.value.length === 0),
  };
}

/**
 * Helper to search articles
 */
export async function useArticlesSearch(
  query: Ref<string>,
): Promise<UseArticlesListReturn> {
  const result = await useArticlesList();

  const filteredArticles = computed(() => {
    const searchTerm = query.value.toLowerCase().trim();
    if (!searchTerm) return result.articles.value;

    return result.articles.value.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm),
    );
  });

  return {
    ...result,
    articles: filteredArticles,
    isEmpty: computed(
      () => !result.isLoading.value && filteredArticles.value.length === 0,
    ),
  };
}
