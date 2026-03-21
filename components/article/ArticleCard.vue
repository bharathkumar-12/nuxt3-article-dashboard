<script setup lang="ts">
  import type { ArticleListItem, ArticleStatus } from '~/types/article';

  interface Props {
    article: ArticleListItem;
  }

  const props = defineProps<Props>();

  const statusVariants: Record<ArticleStatus, 'success' | 'warning' | 'default'> = {
    published: 'success',
    draft: 'warning',
    archived: 'default',
  };

  function formatDate(date: Date | null): string {
    if (!date) return 'Unpublished';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
      .format(date)
      .toUpperCase();
  }

  function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + '...';
  }
</script>

<template>
  <NuxtLink :to="`/articles/${article.id}`" class="block group content-fade-in">
    <div
      class="rounded-xl overflow-hidden bg-surface-container transition-all duration-300 hover:bg-surface-container-high"
    >
      <div class="flex flex-col md:flex-row">
        <!-- Featured Image -->
        <div class="md:w-56 h-48 md:h-auto flex-shrink-0 relative overflow-hidden bg-surface-container-low">
          <img
            v-if="article.featuredImage"
            :src="article.featuredImage"
            :alt="article.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <span class="material-symbols-outlined text-4xl text-on-surface-variant/20">image</span>
          </div>
          <!-- Category pill overlay -->
          <div class="absolute top-3 left-3">
            <span class="text-[10px] font-bold tracking-widest px-2 py-1 bg-surface/80 backdrop-blur-md text-tertiary rounded uppercase font-label">
              {{ article.category.name }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 p-5 md:p-7 flex flex-col">
          <!-- Meta row -->
          <div class="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/50 tracking-widest uppercase mb-3 font-label">
            <span>{{ formatDate(article.publishedAt) }}</span>
            <span class="w-1 h-1 rounded-full bg-primary/40"></span>
            <span>{{ article.readingTime }} MIN READ</span>
            <span class="w-1 h-1 rounded-full bg-primary/40"></span>
            <AppBadge :variant="statusVariants[article.status]" size="sm">
              {{ article.status }}
            </AppBadge>
          </div>

          <!-- Title -->
          <h3
            class="text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-3 leading-tight tracking-tight font-headline line-clamp-2"
          >
            {{ truncate(article.title, 80) }}
          </h3>

          <!-- Excerpt -->
          <p class="text-on-surface-variant/70 text-sm flex-1 mb-5 font-body leading-relaxed line-clamp-2">
            {{ truncate(article.excerpt, 150) }}
          </p>

          <!-- Author row -->
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-primary font-bold text-xs border border-primary/10"
            >
              {{ article.author.name.charAt(0).toUpperCase() }}
            </div>
            <span class="text-sm font-semibold text-on-surface-variant font-body">
              {{ article.author.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
