<script setup lang="ts">
</script>

<template>
  <footer class="bg-slate-950 w-full py-12 px-8 border-t border-indigo-500/5 mt-auto">
    <div class="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-6 text-sm tracking-wide">
      <div class="flex flex-col items-center md:items-start gap-2">
        <span class="text-lg font-bold text-indigo-300 font-headline">NuxtLens</span>
        <p class="text-slate-500">
          © {{ new Date().getFullYear() }} NuxtLens Editorial. Built for the Ethereal Observer.
        </p>
      </div>
      <div class="flex gap-8">
        <a class="text-slate-500 hover:text-indigo-300 transition-colors" href="#">Privacy</a>
        <a class="text-slate-500 hover:text-indigo-300 transition-colors" href="#">Terms</a>
        <a class="text-slate-500 hover:text-indigo-300 transition-colors" href="#">RSS Feed</a>
        <a class="text-slate-500 hover:text-indigo-300 transition-colors" href="#">Contact</a>
      </div>
      <div class="flex gap-4">
        <a class="p-2 rounded-full bg-surface-container hover:bg-primary-container transition-all" href="#">
          <span class="material-symbols-outlined text-indigo-400 text-lg">language</span>
        </a>
        <a class="p-2 rounded-full bg-surface-container hover:bg-primary-container transition-all" href="#">
          <span class="material-symbols-outlined text-indigo-400 text-lg">terminal</span>
        </a>
      </div>
    </div>
  </footer>
</template>
