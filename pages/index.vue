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
        <div class="relative w-72">
          <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-lg pointer-events-none">
            search
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search insights..."
            class="block w-full pl-11 pr-10 py-3 rounded-full bg-surface-container-lowest border-none text-on-surface placeholder-on-surface-variant/40 focus:ring-1 focus:ring-tertiary/50 text-sm transition-all"
          />
          <button
            v-if="searchQuery"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant/40 hover:text-primary transition-colors"
            @click="clearSearch"
          >
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </template>
    </PageHeader>

    <!-- Article count -->
    <div
      v-if="!isLoading && !isError && articles.length > 0"
      class="mb-8 text-xs font-bold text-on-surface-variant/40 tracking-widest uppercase font-label"
    >
      <span v-if="searchQuery">
        {{ filteredArticles.length }} of {{ articles.length }} explorations
      </span>
      <span v-else>
        {{ articles.length }} {{ articles.length === 1 ? 'exploration' : 'explorations' }}
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
