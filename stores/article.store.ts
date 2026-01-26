/**
 * Article Pinia Store
 *
 * Centralized state management for articles.
 * Used for:
 * - Caching fetched articles across page navigations
 * - Managing UI state (filters, selections)
 * - Sharing article data between components
 *
 * Note: We use composables for data fetching (SSR-safe),
 * and Pinia for client-side state management and caching.
 */

import { defineStore } from 'pinia';
import type {
  ArticleListItem,
  ArticleDetail,
  ArticleFilters,
} from '~/types/article';
import type { LoadingState } from '~/types/common';

/**
 * Article store definition
 */
export const useArticleStore = defineStore('articles', () => {
  // ============================================
  // State
  // ============================================

  /** List of articles */
  const articles = ref<ArticleListItem[]>([]);

  /** Currently viewed article detail */
  const currentArticle = ref<ArticleDetail | null>(null);

  /** Loading state */
  const loadingState = ref<LoadingState>('idle');

  /** Error message */
  const error = ref<string | null>(null);

  /** Last fetch timestamp */
  const lastFetched = ref<Date | null>(null);

  /** Current filters */
  const filters = ref<ArticleFilters>({});

  /** Selected article IDs (for batch operations) */
  const selectedIds = ref<Set<string>>(new Set());

  // ============================================
  // Getters
  // ============================================

  /** Is currently loading */
  const isLoading = computed(() => loadingState.value === 'loading');

  /** Has error */
  const hasError = computed(() => loadingState.value === 'error');

  /** Has successfully loaded */
  const isLoaded = computed(() => loadingState.value === 'success');

  /** Is empty (no articles after loading) */
  const isEmpty = computed(
    () => loadingState.value === 'success' && articles.value.length === 0,
  );

  /** Article count */
  const articleCount = computed(() => articles.value.length);

  /** Published articles only */
  const publishedArticles = computed(() =>
    articles.value.filter((a) => a.status === 'published'),
  );

  /** Draft articles only */
  const draftArticles = computed(() =>
    articles.value.filter((a) => a.status === 'draft'),
  );

  /** Filtered articles based on current filters */
  const filteredArticles = computed(() => {
    let result = [...articles.value];

    // Filter by status
    if (filters.value.status) {
      result = result.filter((a) => a.status === filters.value.status);
    }

    // Filter by category
    if (filters.value.category) {
      result = result.filter((a) => a.category.slug === filters.value.category);
    }

    // Filter by search query
    if (filters.value.search) {
      const query = filters.value.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query),
      );
    }

    return result;
  });

  /** Get article by ID */
  const getArticleById = computed(
    () =>
      (id: string): ArticleListItem | undefined => {
        return articles.value.find((a) => a.id === id);
      },
  );

  /** Number of selected articles */
  const selectedCount = computed(() => selectedIds.value.size);

  /** Are all articles selected */
  const allSelected = computed(
    () =>
      articles.value.length > 0 &&
      selectedIds.value.size === articles.value.length,
  );

  /** Cache expiry check (5 minutes) */
  const isCacheValid = computed(() => {
    if (!lastFetched.value) return false;
    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() - lastFetched.value.getTime() < fiveMinutes;
  });

  // ============================================
  // Actions
  // ============================================

  /**
   * Set articles from external source (composable)
   */
  function setArticles(newArticles: ArticleListItem[]) {
    articles.value = newArticles;
    loadingState.value = 'success';
    lastFetched.value = new Date();
    error.value = null;
  }

  /**
   * Set current article detail
   */
  function setCurrentArticle(article: ArticleDetail | null) {
    currentArticle.value = article;
  }

  /**
   * Set loading state
   */
  function setLoading() {
    loadingState.value = 'loading';
    error.value = null;
  }

  /**
   * Set error state
   */
  function setError(message: string) {
    loadingState.value = 'error';
    error.value = message;
  }

  /**
   * Clear error
   */
  function clearError() {
    error.value = null;
    if (loadingState.value === 'error') {
      loadingState.value = 'idle';
    }
  }

  /**
   * Update filters
   */
  function setFilters(newFilters: Partial<ArticleFilters>) {
    filters.value = { ...filters.value, ...newFilters };
  }

  /**
   * Clear all filters
   */
  function clearFilters() {
    filters.value = {};
  }

  /**
   * Toggle article selection
   */
  function toggleSelection(id: string) {
    if (selectedIds.value.has(id)) {
      selectedIds.value.delete(id);
    } else {
      selectedIds.value.add(id);
    }
    // Trigger reactivity
    selectedIds.value = new Set(selectedIds.value);
  }

  /**
   * Select all articles
   */
  function selectAll() {
    selectedIds.value = new Set(articles.value.map((a) => a.id));
  }

  /**
   * Clear selection
   */
  function clearSelection() {
    selectedIds.value = new Set();
  }

  /**
   * Check if article is selected
   */
  function isSelected(id: string): boolean {
    return selectedIds.value.has(id);
  }

  /**
   * Reset store to initial state
   */
  function reset() {
    articles.value = [];
    currentArticle.value = null;
    loadingState.value = 'idle';
    error.value = null;
    lastFetched.value = null;
    filters.value = {};
    selectedIds.value = new Set();
  }

  // ============================================
  // Return
  // ============================================

  return {
    // State
    articles,
    currentArticle,
    loadingState,
    error,
    lastFetched,
    filters,
    selectedIds,

    // Getters
    isLoading,
    hasError,
    isLoaded,
    isEmpty,
    articleCount,
    publishedArticles,
    draftArticles,
    filteredArticles,
    getArticleById,
    selectedCount,
    allSelected,
    isCacheValid,

    // Actions
    setArticles,
    setCurrentArticle,
    setLoading,
    setError,
    clearError,
    setFilters,
    clearFilters,
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected,
    reset,
  };
});

/**
 * Type for the article store
 */
export type ArticleStore = ReturnType<typeof useArticleStore>;
