<script setup lang="ts">
  /**
   * Home Page - Article Listing
   *
   * Server-side rendered article list with:
   * - Skeleton loading states
   * - Error handling
   * - Empty state
   * - Search/filter capability
   */

  // SEO Meta
  useSeoMeta({
    title: 'Articles',
    description: 'Browse our collection of articles on various topics.',
  });

  // Get article store for caching
  const articleStore = useArticleStore();

  // Search query
  const searchQuery = ref('');

  // Fetch articles using composable (SSR-safe)
  const { articles, isLoading, isError, isEmpty, error, refresh } =
    await useArticlesList();

  // Sync with store for caching
  watchEffect(() => {
    if (articles.value.length > 0) {
      articleStore.setArticles(articles.value);
    }
  });

  // Filtered articles based on search
  const filteredArticles = computed(() => {
    if (!searchQuery.value.trim()) {
      return articles.value;
    }

    const query = searchQuery.value.toLowerCase();
    return articles.value.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.name.toLowerCase().includes(query) ||
        article.category.name.toLowerCase().includes(query),
    );
  });

  // Search-specific empty state
  const isSearchEmpty = computed(
    () => searchQuery.value.trim() && filteredArticles.value.length === 0,
  );

  // Handle retry
  async function handleRetry() {
    await refresh();
  }

  // Clear search
  function clearSearch() {
    searchQuery.value = '';
  }
</script>

<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Articles"
      description="Browse our collection of articles covering technology, development, and more."
    >
      <template #actions>
        <!-- Search Input -->
        <div class="relative max-w-md">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-secondary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="block w-full pl-10 pr-10 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-secondary-900 placeholder-secondary-400"
          />
          <!-- Clear button -->
          <button
            v-if="searchQuery"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
            @click="clearSearch"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </template>
    </PageHeader>

    <!-- Article count -->
    <div
      v-if="!isLoading && !isError && articles.length > 0"
      class="mb-6 text-sm text-secondary-500"
    >
      <span v-if="searchQuery">
        Found {{ filteredArticles.length }} of {{ articles.length }} articles
      </span>
      <span v-else>
        {{ articles.length }}
        {{ articles.length === 1 ? 'article' : 'articles' }}
      </span>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="space-y-6">
      <ArticleCardSkeleton v-for="i in 3" :key="i" />
    </div>

    <!-- Error state -->
    <ErrorState
      v-else-if="isError"
      :message="error?.message || 'Failed to load articles'"
      @retry="handleRetry"
    />

    <!-- Empty state (no articles at all) -->
    <EmptyState
      v-else-if="isEmpty"
      title="No articles yet"
      description="There are no articles available. Check back later for new content."
      icon="document"
    />

    <!-- Search empty state -->
    <EmptyState
      v-else-if="isSearchEmpty"
      title="No matching articles"
      :description="`No articles found matching '${searchQuery}'. Try a different search term.`"
      icon="search"
      action-label="Clear search"
      @action="clearSearch"
    />

    <!-- Articles list -->
    <div v-else class="space-y-6">
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>
