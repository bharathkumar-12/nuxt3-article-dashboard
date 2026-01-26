<script setup lang="ts">
  /**
   * Article Detail Page
   *
   * Server-side rendered article detail with:
   * - Dynamic meta tags
   * - Loading skeleton
   * - Error handling
   * - Not found state
   * - Related articles
   */

  // Get article ID from route
  const route = useRoute();
  const articleId = computed(() => route.params['id'] as string);

  // Fetch article using composable (SSR-safe)
  const { article, isLoading, isError, error, refresh } =
    await useArticleDetail(articleId.value);

  // Dynamic SEO Meta
  useSeoMeta({
    title: () => article.value?.title || 'Article Not Found',
    description: () => article.value?.excerpt || 'Article details',
    ogTitle: () => article.value?.title || 'Article',
    ogDescription: () => article.value?.excerpt || '',
    ogImage: () => article.value?.featuredImage || '',
  });

  // Not found state
  const isNotFound = computed(
    () => !isLoading.value && !article.value && !isError.value,
  );

  // Handle retry
  async function handleRetry() {
    await refresh();
  }
</script>

<template>
  <div>
    <!-- Back navigation -->
    <PageHeader
      v-if="!isLoading"
      :title="article?.title || 'Article'"
      show-back
    />

    <!-- Loading state -->
    <div v-if="isLoading">
      <div class="mb-8">
        <div class="h-6 w-20 bg-secondary-200 rounded animate-pulse mb-4" />
      </div>
      <ArticleDetailSkeleton />
    </div>

    <!-- Error state -->
    <ErrorState
      v-else-if="isError"
      :message="error?.message || 'Failed to load article'"
      @retry="handleRetry"
    />

    <!-- Not found state -->
    <EmptyState
      v-else-if="isNotFound"
      title="Article not found"
      description="The article you're looking for doesn't exist or may have been removed."
      icon="document"
      action-label="Browse all articles"
      @action="navigateTo('/')"
    />

    <!-- Article content -->
    <ArticleDetailView v-else-if="article" :article="article" />
  </div>
</template>
