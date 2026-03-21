<script setup lang="ts">
  interface Props {
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    glass?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    hoverable: false,
    padding: 'md',
    glass: false,
  });

  const paddingClasses: Record<string, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
  };

  const cardClasses = computed(() => [
    'rounded-xl overflow-hidden',
    props.glass
      ? 'glass-panel border border-indigo-500/5'
      : 'bg-surface-container',
    props.hoverable &&
      'transition-all duration-300 hover:bg-surface-container-high cursor-pointer',
    paddingClasses[props.padding],
  ]);
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>
