<script setup lang="ts">
  useSeoMeta({
    titleTemplate: '%s | NuxtLens',
    ogSiteName: 'NuxtLens',
    twitterCard: 'summary_large_image',
  });
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background font-body">
    <AppHeader />

    <main class="flex-1 pt-28 pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <AppFooter />
  </div>
</template>
