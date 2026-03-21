<script setup lang="ts">
</script>

<template>
  <article class="animate-pulse content-fade-in">
    <!-- Hero skeleton -->
    <div class="w-full h-80 md:h-[480px] rounded-2xl bg-surface-container mb-12" />

    <!-- Content grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Side actions placeholder -->
      <aside class="hidden lg:flex flex-col items-center gap-6 col-span-1">
        <div class="w-12 h-12 rounded-full bg-surface-container-high" />
        <div class="w-12 h-12 rounded-full bg-surface-container-high" />
        <div class="w-6 h-px bg-surface-container-high" />
        <div class="w-12 h-12 rounded-full bg-surface-container-high" />
      </aside>

      <!-- Main body skeleton -->
      <div class="col-span-1 lg:col-span-11 space-y-4">
        <div class="h-5 w-full bg-surface-container rounded" />
        <div class="h-5 w-full bg-surface-container rounded" />
        <div class="h-5 w-5/6 bg-surface-container rounded" />
        <div class="h-5 w-full bg-surface-container rounded" />
        <div class="h-5 w-4/5 bg-surface-container rounded" />
        <div class="h-5 w-full bg-surface-container rounded" />
        <div class="h-5 w-3/4 bg-surface-container rounded" />
        <div class="h-5 w-full bg-surface-container rounded" />
        <div class="h-5 w-5/6 bg-surface-container rounded" />

        <!-- Tags skeleton -->
        <div class="flex gap-2 pt-8 border-t border-outline-variant/10">
          <div class="h-7 w-20 bg-surface-container-high rounded-full" />
          <div class="h-7 w-24 bg-surface-container-high rounded-full" />
          <div class="h-7 w-16 bg-surface-container-high rounded-full" />
        </div>
      </div>
    </div>
  </article>
</template>
