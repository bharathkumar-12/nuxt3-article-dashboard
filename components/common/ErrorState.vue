<script setup lang="ts">
  /**
   * ErrorState Component
   *
   * User-friendly error display with retry option
   */

  interface Props {
    title?: string;
    message?: string;
    showRetry?: boolean;
    retryLabel?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Something went wrong',
    message:
      'We encountered an error while loading the content. Please try again.',
    showRetry: true,
    retryLabel: 'Try again',
  });

  const emit = defineEmits<{
    retry: [];
  }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <!-- Error icon -->
    <div class="w-16 h-16 mb-4 text-red-400">
      <svg
        class="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-secondary-700 mb-1">
      {{ title }}
    </h3>

    <!-- Message -->
    <p class="text-secondary-500 max-w-md mb-6">
      {{ message }}
    </p>

    <!-- Retry button -->
    <AppButton v-if="showRetry" variant="primary" @click="emit('retry')">
      <svg
        class="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {{ retryLabel }}
    </AppButton>
  </div>
</template>
