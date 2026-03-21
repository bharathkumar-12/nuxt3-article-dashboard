<script setup lang="ts">
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 border-b border-indigo-500/10 bg-slate-900/70 backdrop-blur-xl flex justify-between items-center px-8 h-20 shadow-[0_10px_40px_rgba(7,0,108,0.15)]"
  >
    <!-- Logo + Links -->
    <div class="flex items-center gap-12">
      <NuxtLink to="/" class="text-2xl font-bold tracking-tighter text-slate-100 font-headline">
        NuxtLens
      </NuxtLink>
      <div class="hidden md:flex gap-8">
        <NuxtLink
          to="/"
          class="text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium"
          active-class="text-indigo-300 border-b-2 border-indigo-400 pb-1"
        >
          Articles
        </NuxtLink>
        <a href="#" class="text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium">Explorations</a>
        <a href="#" class="text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium">Archive</a>
        <a href="#" class="text-slate-400 hover:text-slate-100 transition-colors text-sm font-medium">About</a>
      </div>
    </div>

    <!-- Right actions -->
    <div class="flex items-center gap-6">
      <!-- Search Box -->
      <div class="relative hidden lg:block">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
        <input
          class="bg-surface-container-lowest border-none rounded-full pl-10 pr-4 py-2 text-sm text-on-surface focus:ring-1 focus:ring-tertiary w-64 placeholder:text-slate-500 outline-none"
          placeholder="Search insights..."
          type="text"
        />
      </div>
      <!-- Notifications -->
      <button class="material-symbols-outlined text-indigo-300 hover:bg-indigo-500/10 p-2 rounded-full transition-all duration-300 active:scale-95">
        notifications
      </button>
      <!-- Avatar -->
      <div class="w-10 h-10 rounded-full overflow-hidden border border-indigo-500/20 bg-surface-container-highest flex items-center justify-center">
        <span class="material-symbols-outlined text-on-surface-variant text-lg">person</span>
      </div>
    </div>
  </nav>
</template>
