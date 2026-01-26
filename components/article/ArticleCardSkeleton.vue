<script setup lang="ts">
  /**
   * ArticleCardSkeleton Component
   *
   * Loading skeleton for ArticleCard
   */
</script>

<template>
  <AppCard padding="none">
    <div class="flex flex-col md:flex-row animate-pulse">
      <!-- Image skeleton -->
      <div class="md:w-48 h-48 md:h-auto flex-shrink-0 bg-secondary-200" />

      <!-- Content skeleton -->
      <div class="flex-1 p-4 md:p-6 flex flex-col">
        <!-- Top row -->
        <div class="flex items-center justify-between mb-4">
          <div class="h-3 w-20 bg-secondary-200 rounded" />
          <div class="h-5 w-16 bg-secondary-200 rounded-full" />
        </div>

        <!-- Title -->
        <div class="h-6 w-3/4 bg-secondary-200 rounded mb-3" />

        <!-- Excerpt lines -->
        <div class="space-y-2 flex-1 mb-4">
          <div class="h-4 w-full bg-secondary-200 rounded" />
          <div class="h-4 w-5/6 bg-secondary-200 rounded" />
          <div class="h-4 w-2/3 bg-secondary-200 rounded" />
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-secondary-200 mr-2" />
            <div class="h-4 w-24 bg-secondary-200 rounded" />
          </div>
          <div class="flex items-center space-x-3">
            <div class="h-4 w-16 bg-secondary-200 rounded" />
            <div class="h-4 w-20 bg-secondary-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  </AppCard>
</template>
