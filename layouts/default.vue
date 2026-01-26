<script setup lang="ts">
  /**
   * Default Layout
   *
   * Main application layout with navigation and footer
   */

  // Set default meta for all pages
  useSeoMeta({
    titleTemplate: '%s | Article Dashboard',
    ogSiteName: 'Article Dashboard',
    twitterCard: 'summary_large_image',
  });
</script>

<template>
  <div class="min-h-screen flex flex-col bg-secondary-50">
    <!-- Navigation -->
    <nav class="bg-white border-b border-secondary-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <svg
                class="w-8 h-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <span class="ml-2 text-xl font-bold text-secondary-900">
                Article Dashboard
              </span>
            </NuxtLink>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/"
              class="px-3 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
              active-class="text-primary-600"
            >
              Articles
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-secondary-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm text-secondary-500">
            © {{ new Date().getFullYear() }} Article Dashboard. Built with Nuxt
            3.
          </p>
          <div class="flex items-center space-x-4 mt-4 md:mt-0">
            <span class="text-xs text-secondary-400">
              SSR • TypeScript • Pinia • Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
