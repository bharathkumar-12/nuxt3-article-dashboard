<script setup lang="ts">
</script>

<template>
  <div class="rounded-xl overflow-hidden bg-surface-container animate-pulse">
    <div class="flex flex-col md:flex-row">
      <!-- Image skeleton -->
      <div class="md:w-56 h-48 md:h-auto flex-shrink-0 bg-surface-container-high" />

      <!-- Content skeleton -->
      <div class="flex-1 p-5 md:p-7 flex flex-col">
        <!-- Meta row -->
        <div class="flex items-center gap-2 mb-3">
          <div class="h-3 w-24 bg-surface-container-high rounded" />
          <div class="h-3 w-3 bg-surface-container-high rounded-full" />
          <div class="h-3 w-16 bg-surface-container-high rounded" />
        </div>

        <!-- Title -->
        <div class="h-6 w-3/4 bg-surface-container-high rounded mb-2" />
        <div class="h-6 w-1/2 bg-surface-container-high rounded mb-5" />

        <!-- Excerpt lines -->
        <div class="space-y-2 flex-1 mb-5">
          <div class="h-4 w-full bg-surface-container-high rounded" />
          <div class="h-4 w-5/6 bg-surface-container-high rounded" />
        </div>

        <!-- Author -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-surface-container-high" />
          <div class="h-4 w-28 bg-surface-container-high rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
