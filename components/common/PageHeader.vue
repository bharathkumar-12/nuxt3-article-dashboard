<script setup lang="ts">
  /**
   * PageHeader Component
   *
   * Consistent page title and description header
   */

  interface Props {
    title: string;
    description?: string;
    showBack?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    showBack: false,
  });

  const router = useRouter();

  function goBack() {
    router.back();
  }
</script>

<template>
  <header class="mb-8">
    <!-- Back button -->
    <button
      v-if="showBack"
      class="inline-flex items-center text-secondary-500 hover:text-secondary-700 mb-4 transition-colors"
      @click="goBack"
    >
      <svg
        class="w-5 h-5 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back
    </button>

    <!-- Title -->
    <h1 class="text-2xl md:text-3xl font-bold text-secondary-900">
      {{ title }}
    </h1>

    <!-- Description -->
    <p v-if="description" class="mt-2 text-secondary-500 max-w-2xl">
      {{ description }}
    </p>

    <!-- Optional slot for actions -->
    <div v-if="$slots['actions']" class="mt-4">
      <slot name="actions" />
    </div>
  </header>
</template>
