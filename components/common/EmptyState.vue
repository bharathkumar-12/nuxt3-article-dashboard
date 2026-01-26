<script setup lang="ts">
  /**
   * EmptyState Component
   *
   * Displayed when a list or view has no content
   */

  interface Props {
    title?: string;
    description?: string;
    icon?: 'inbox' | 'search' | 'document' | 'error';
    actionLabel?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'No items found',
    description: 'There are no items to display at this time.',
    icon: 'inbox',
  });

  const emit = defineEmits<{
    action: [];
  }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <!-- Icon -->
    <div class="w-16 h-16 mb-4 text-secondary-300">
      <!-- Inbox icon -->
      <svg
        v-if="icon === 'inbox'"
        class="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>

      <!-- Search icon -->
      <svg
        v-else-if="icon === 'search'"
        class="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <!-- Document icon -->
      <svg
        v-else-if="icon === 'document'"
        class="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>

      <!-- Error icon -->
      <svg
        v-else
        class="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-semibold text-secondary-700 mb-1">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-secondary-500 max-w-md mb-6">
      {{ description }}
    </p>

    <!-- Action button -->
    <AppButton v-if="actionLabel" variant="secondary" @click="emit('action')">
      {{ actionLabel }}
    </AppButton>
  </div>
</template>
