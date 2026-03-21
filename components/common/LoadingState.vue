<script setup lang="ts">
  interface Props {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    fullPage?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    message: 'Loading...',
    size: 'md',
    fullPage: false,
  });

  const sizeClasses: Record<string, string> = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center',
      fullPage
        ? 'fixed inset-0 bg-surface/80 backdrop-blur-sm z-50'
        : 'py-12',
    ]"
  >
    <!-- Spinner -->
    <div :class="['text-primary mb-4', sizeClasses[size ?? 'md']]">
      <svg
        class="animate-spin w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>

    <p class="text-on-surface-variant/60 text-sm font-label">
      {{ message }}
    </p>
  </div>
</template>
