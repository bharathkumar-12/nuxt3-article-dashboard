<script setup lang="ts">
  /**
   * ArticleCard Component
   *
   * Card display for article list items
   */

  import type { ArticleListItem, ArticleStatus } from '~/types/article';

  interface Props {
    article: ArticleListItem;
  }

  const props = defineProps<Props>();

  // Status badge variant mapping
  const statusVariants: Record<
    ArticleStatus,
    'success' | 'warning' | 'default'
  > = {
    published: 'success',
    draft: 'warning',
    archived: 'default',
  };

  // Format date for display
  function formatDate(date: Date | null): string {
    if (!date) return 'Unpublished';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  // Truncate text safely
  function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
  }
</script>

<template>
  <NuxtLink :to="`/articles/${article.id}`" class="block group">
    <AppCard hoverable padding="none">
      <div class="flex flex-col md:flex-row">
        <!-- Featured Image -->
        <div
          class="md:w-48 h-48 md:h-auto flex-shrink-0 relative overflow-hidden bg-secondary-100"
        >
          <img
            v-if="article.featuredImage"
            :src="article.featuredImage"
            :alt="article.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg
              class="w-12 h-12 text-secondary-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 p-4 md:p-6 flex flex-col">
          <!-- Top row: Category + Status -->
          <div class="flex items-center justify-between mb-2">
            <span
              class="text-xs font-medium text-primary-600 uppercase tracking-wide"
            >
              {{ article.category.name }}
            </span>
            <AppBadge :variant="statusVariants[article.status]" size="sm">
              {{ article.status }}
            </AppBadge>
          </div>

          <!-- Title -->
          <h3
            class="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors mb-2"
          >
            {{ truncate(article.title, 80) }}
          </h3>

          <!-- Excerpt -->
          <p class="text-secondary-500 text-sm flex-1 mb-4">
            {{ truncate(article.excerpt, 150) }}
          </p>

          <!-- Footer: Author + Meta -->
          <div class="flex items-center justify-between text-sm">
            <!-- Author -->
            <div class="flex items-center">
              <div
                class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium mr-2"
              >
                {{ article.author.name.charAt(0).toUpperCase() }}
              </div>
              <span class="text-secondary-600">
                {{ article.author.name }}
              </span>
            </div>

            <!-- Meta -->
            <div class="flex items-center text-secondary-400 space-x-3">
              <!-- Reading time -->
              <span class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{ article.readingTime }} min
              </span>

              <!-- Date -->
              <span>{{ formatDate(article.publishedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </AppCard>
  </NuxtLink>
</template>
