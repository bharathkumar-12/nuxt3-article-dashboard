<script setup lang="ts">
  /**
   * ArticleDetailSkeleton Component
   *
   * Loading skeleton for article detail page
   */
</script>

<template>
  <article class="max-w-4xl mx-auto animate-pulse">
    <!-- Header -->
    <header class="mb-8">
      <!-- Category + Status -->
      <div class="flex items-center space-x-3 mb-4">
        <div class="h-4 w-20 bg-secondary-200 rounded" />
        <div class="h-5 w-16 bg-secondary-200 rounded-full" />
      </div>

      <!-- Title -->
      <div class="space-y-3 mb-4">
        <div class="h-10 w-full bg-secondary-200 rounded" />
        <div class="h-10 w-3/4 bg-secondary-200 rounded" />
      </div>

      <!-- Excerpt -->
      <div class="space-y-2 mb-6">
        <div class="h-6 w-full bg-secondary-200 rounded" />
        <div class="h-6 w-5/6 bg-secondary-200 rounded" />
      </div>

      <!-- Meta row -->
      <div class="flex items-center gap-4 pb-6 border-b border-secondary-200">
        <div class="w-10 h-10 rounded-full bg-secondary-200" />
        <div class="space-y-1">
          <div class="h-4 w-24 bg-secondary-200 rounded" />
          <div class="h-3 w-32 bg-secondary-200 rounded" />
        </div>
        <div class="h-4 w-32 bg-secondary-200 rounded" />
        <div class="h-4 w-20 bg-secondary-200 rounded" />
      </div>
    </header>

    <!-- Featured Image -->
    <div class="mb-8 rounded-xl bg-secondary-200 h-64 md:h-96" />

    <!-- Content -->
    <div class="space-y-4 mb-12">
      <div class="h-4 w-full bg-secondary-200 rounded" />
      <div class="h-4 w-full bg-secondary-200 rounded" />
      <div class="h-4 w-5/6 bg-secondary-200 rounded" />
      <div class="h-4 w-full bg-secondary-200 rounded" />
      <div class="h-4 w-4/5 bg-secondary-200 rounded" />
      <div class="h-4 w-full bg-secondary-200 rounded" />
      <div class="h-4 w-3/4 bg-secondary-200 rounded" />
    </div>

    <!-- Tags -->
    <div class="mb-12">
      <div class="h-4 w-12 bg-secondary-200 rounded mb-3" />
      <div class="flex gap-2">
        <div class="h-6 w-16 bg-secondary-200 rounded-full" />
        <div class="h-6 w-20 bg-secondary-200 rounded-full" />
        <div class="h-6 w-14 bg-secondary-200 rounded-full" />
      </div>
    </div>

    <!-- Related Articles -->
    <section class="border-t border-secondary-200 pt-12">
      <div class="h-8 w-48 bg-secondary-200 rounded mb-6" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="i in 3"
          :key="i"
          class="bg-white rounded-xl border border-secondary-200 overflow-hidden p-3"
        >
          <div class="h-32 -mx-3 -mt-3 mb-3 bg-secondary-200" />
          <div class="h-5 w-full bg-secondary-200 rounded mb-2" />
          <div class="h-4 w-24 bg-secondary-200 rounded" />
        </div>
      </div>
    </section>
  </article>
</template>
