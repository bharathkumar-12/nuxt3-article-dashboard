<script setup lang="ts">
  import type { ArticleDetail, ArticleStatus } from '~/types/article';

  interface Props {
    article: ArticleDetail;
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
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

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
  <article class="content-fade-in">
    <!-- Hero Section -->
    <header
      class="relative w-full rounded-2xl overflow-hidden mb-12"
      :class="article.featuredImage ? 'h-[480px]' : 'pt-12 pb-10 px-10 bg-surface-container'"
    >
      <!-- Hero image -->
      <template v-if="article.featuredImage">
        <img
          :src="article.featuredImage"
          :alt="article.title"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </template>

      <!-- Content overlay -->
      <div
        class="relative flex flex-col justify-end h-full"
        :class="article.featuredImage ? 'p-10' : ''"
      >
        <!-- Category + Status -->
        <div class="flex items-center gap-3 mb-4">
          <span class="text-[10px] font-bold tracking-widest uppercase text-tertiary font-label px-3 py-1 bg-surface/80 backdrop-blur-md rounded">
            {{ article.category.name }}
          </span>
          <AppBadge :variant="statusVariants[article.status]" size="sm">
            {{ article.status }}
          </AppBadge>
        </div>

        <!-- Title -->
        <h1 class="text-3xl md:text-5xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight max-w-4xl mb-6">
          {{ article.title }}
        </h1>

        <!-- Excerpt -->
        <p class="text-lg text-on-surface-variant/80 font-body leading-relaxed max-w-2xl mb-8">
          {{ article.excerpt }}
        </p>

        <!-- Meta row -->
        <div class="flex flex-wrap items-center gap-6 text-sm text-on-surface-variant">
          <!-- Author -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center text-primary font-bold border border-primary/10">
              {{ article.author.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <div class="font-semibold text-on-surface">{{ article.author.name }}</div>
              <div class="text-xs text-on-surface-variant/50">{{ article.author.email }}</div>
            </div>
          </div>

          <div class="h-6 w-px bg-outline-variant/20 hidden sm:block" />

          <!-- Date -->
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-base">calendar_today</span>
            <span>{{ formatDate(article.publishedAt) }}</span>
          </div>

          <!-- Reading time -->
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-base">schedule</span>
            <span>{{ article.readingTime }} min read</span>
          </div>

          <!-- Views -->
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-base">visibility</span>
            <span>{{ article.viewCount.toLocaleString() }} views</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Content grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Side actions -->
      <aside class="hidden lg:flex flex-col items-center gap-6 col-span-1 sticky top-32 h-fit">
        <button class="flex flex-col items-center gap-1 group">
          <div class="p-3 rounded-full border border-outline-variant/20 group-hover:bg-primary-container/20 group-hover:border-primary/40 transition-all duration-300">
            <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-xl">favorite</span>
          </div>
        </button>
        <button class="flex flex-col items-center gap-1 group">
          <div class="p-3 rounded-full border border-outline-variant/20 group-hover:bg-primary-container/20 group-hover:border-primary/40 transition-all duration-300">
            <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-xl">bookmark</span>
          </div>
        </button>
        <div class="w-6 h-px bg-outline-variant/20" />
        <button class="flex flex-col items-center gap-1 group">
          <div class="p-3 rounded-full border border-outline-variant/20 group-hover:bg-primary-container/20 group-hover:border-primary/40 transition-all duration-300">
            <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-xl">share</span>
          </div>
        </button>
      </aside>

      <!-- Main content -->
      <div class="col-span-1 lg:col-span-11 space-y-8">
        <!-- Article body -->
        <div
          class="prose max-w-none text-on-surface-variant/90 leading-relaxed
            prose-headings:text-on-surface prose-headings:font-headline prose-headings:tracking-tight
            prose-p:text-on-surface-variant/80 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-fixed-dim
            prose-strong:text-on-surface
            prose-code:text-tertiary prose-code:bg-surface-container-high prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-surface-container-lowest prose-pre:border prose-pre:border-outline-variant/10
            prose-blockquote:border-l-primary/40 prose-blockquote:text-on-surface-variant/70
            prose-hr:border-outline-variant/10
            prose-img:rounded-xl"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="article.content" />
        </div>

        <!-- Tags -->
        <div v-if="article.tags.length > 0" class="pt-8 border-t border-outline-variant/10">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant/10 text-xs font-label text-tertiary tracking-wide"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <!-- Related Articles -->
        <section
          v-if="article.relatedArticles && article.relatedArticles.length > 0"
          class="pt-16 border-t border-outline-variant/10"
        >
          <div class="flex justify-between items-end mb-10">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold tracking-tighter text-on-surface font-headline">
                Parallel Dimensions
              </h2>
              <p class="text-on-surface-variant/50 text-sm mt-2 font-label">
                Articles you might find relevant
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <NuxtLink
              v-for="related in article.relatedArticles"
              :key="related.id"
              :to="`/articles/${related.id}`"
              class="group cursor-pointer"
            >
              <div class="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-surface-container-low">
                <img
                  v-if="related.featuredImage"
                  :src="related.featuredImage"
                  :alt="related.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-3xl text-on-surface-variant/20">image</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <h4 class="font-bold text-on-surface group-hover:text-primary transition-colors font-headline tracking-tight leading-tight mb-2 line-clamp-2">
                {{ related.title }}
              </h4>
              <p class="text-xs text-on-surface-variant/50 font-label">
                {{ formatShortDate(related.publishedAt) }}
              </p>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>
