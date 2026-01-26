<script setup lang="ts">
  /**
   * ArticleDetail Component
   *
   * Full article display with author info and related articles
   */

  import type { ArticleDetail, ArticleStatus } from '~/types/article';

  interface Props {
    article: ArticleDetail;
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  // Format short date
  function formatShortDate(date: Date | null): string {
    if (!date) return 'Unpublished';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
</script>

<template>
  <article class="max-w-4xl mx-auto">
    <!-- Header -->
    <header class="mb-8">
      <!-- Category + Status -->
      <div class="flex items-center space-x-3 mb-4">
        <span
          class="text-sm font-medium text-primary-600 uppercase tracking-wide"
        >
          {{ article.category.name }}
        </span>
        <AppBadge :variant="statusVariants[article.status]" size="sm">
          {{ article.status }}
        </AppBadge>
      </div>

      <!-- Title -->
      <h1 class="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
        {{ article.title }}
      </h1>

      <!-- Excerpt -->
      <p class="text-xl text-secondary-500 mb-6">
        {{ article.excerpt }}
      </p>

      <!-- Meta row -->
      <div
        class="flex flex-wrap items-center gap-4 text-sm text-secondary-500 pb-6 border-b border-secondary-200"
      >
        <!-- Author -->
        <div class="flex items-center">
          <div
            class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold mr-3"
          >
            {{ article.author.name.charAt(0).toUpperCase() }}
          </div>
          <div>
            <div class="font-medium text-secondary-900">
              {{ article.author.name }}
            </div>
            <div class="text-xs">
              {{ article.author.email }}
            </div>
          </div>
        </div>

        <span class="text-secondary-300">·</span>

        <!-- Published date -->
        <span>{{ formatDate(article.publishedAt) }}</span>

        <span class="text-secondary-300">·</span>

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
          {{ article.readingTime }} min read
        </span>

        <span class="text-secondary-300">·</span>

        <!-- Views -->
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          {{ article.viewCount.toLocaleString() }} views
        </span>
      </div>
    </header>

    <!-- Featured Image -->
    <div v-if="article.featuredImage" class="mb-8 rounded-xl overflow-hidden">
      <img
        :src="article.featuredImage"
        :alt="article.title"
        class="w-full h-auto"
      />
    </div>

    <!-- Content -->
    <div class="prose prose-lg max-w-none mb-12">
      <div v-html="article.content" />
    </div>

    <!-- Tags -->
    <div v-if="article.tags.length > 0" class="mb-12">
      <h3
        class="text-sm font-semibold text-secondary-500 uppercase tracking-wide mb-3"
      >
        Tags
      </h3>
      <div class="flex flex-wrap gap-2">
        <AppBadge v-for="tag in article.tags" :key="tag" variant="primary">
          {{ tag }}
        </AppBadge>
      </div>
    </div>

    <!-- Related Articles -->
    <section
      v-if="article.relatedArticles && article.relatedArticles.length > 0"
      class="border-t border-secondary-200 pt-12"
    >
      <h2 class="text-2xl font-bold text-secondary-900 mb-6">
        Related Articles
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="related in article.relatedArticles"
          :key="related.id"
          :to="`/articles/${related.id}`"
          class="group"
        >
          <AppCard hoverable padding="sm">
            <!-- Image -->
            <div class="h-32 -mx-3 -mt-3 mb-3 bg-secondary-100 overflow-hidden">
              <img
                v-if="related.featuredImage"
                :src="related.featuredImage"
                :alt="related.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <svg
                  class="w-8 h-8 text-secondary-300"
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
            <!-- Title -->
            <h4
              class="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors line-clamp-2"
            >
              {{ related.title }}
            </h4>
            <!-- Meta -->
            <p class="text-sm text-secondary-400 mt-1">
              {{ formatShortDate(related.publishedAt) }}
            </p>
          </AppCard>
        </NuxtLink>
      </div>
    </section>
  </article>
</template>
