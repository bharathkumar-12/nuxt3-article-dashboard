<script setup lang="ts">
  /**
   * ArticleList Component
   *
   * Renders a list of article cards with loading/error/empty states
   */

  import type { ArticleListItem } from '~/types/article';

  interface Props {
    articles: ArticleListItem[];
    loading?: boolean;
    error?: { message: string; code: string } | null;
    skeletonCount?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    loading: false,
    error: null,
    skeletonCount: 3,
  });

  const emit = defineEmits<{
    retry: [];
  }>();

  // Computed states
  const isEmpty = computed(
    () => !props.loading && !props.error && props.articles.length === 0,
  );
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="loading" class="space-y-6">
      <ArticleCardSkeleton v-for="i in skeletonCount" :key="i" />
    </div>

    <!-- Error state -->
    <ErrorState
      v-else-if="error"
      :message="error.message"
      @retry="emit('retry')"
    />

    <!-- Empty state -->
    <EmptyState
      v-else-if="isEmpty"
      title="No articles yet"
      description="There are no articles to display. Check back later for new content."
      icon="document"
    />

    <!-- Articles list -->
    <div v-else class="space-y-6">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>
