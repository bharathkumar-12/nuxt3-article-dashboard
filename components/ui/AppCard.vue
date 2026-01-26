<script setup lang="ts">
  /**
   * AppCard Component
   *
   * Reusable card container with optional hover effects
   */

  interface Props {
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
  }

  const props = withDefaults(defineProps<Props>(), {
    hoverable: false,
    padding: 'md',
  });

  const paddingClasses: Record<string, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
  };

  const cardClasses = computed(() => [
    'bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden',
    props.hoverable &&
      'transition-all duration-200 hover:shadow-md hover:border-primary-200 cursor-pointer',
    paddingClasses[props.padding],
  ]);
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>
