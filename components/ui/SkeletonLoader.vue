<script setup lang="ts">
  /**
   * SkeletonLoader Component
   *
   * Animated placeholder for loading states
   */

  type SkeletonVariant =
    | 'text'
    | 'title'
    | 'avatar'
    | 'image'
    | 'card'
    | 'custom';

  interface Props {
    variant?: SkeletonVariant;
    width?: string;
    height?: string;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    count?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'text',
    rounded: 'md',
    count: 1,
  });

  const roundedClasses: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const variantStyles = computed(() => {
    switch (props.variant) {
      case 'text':
        return { width: props.width || '100%', height: props.height || '1rem' };
      case 'title':
        return {
          width: props.width || '75%',
          height: props.height || '1.5rem',
        };
      case 'avatar':
        return { width: props.width || '3rem', height: props.height || '3rem' };
      case 'image':
        return {
          width: props.width || '100%',
          height: props.height || '12rem',
        };
      case 'card':
        return { width: props.width || '100%', height: props.height || '8rem' };
      case 'custom':
        return { width: props.width || '100%', height: props.height || '1rem' };
      default:
        return { width: props.width || '100%', height: props.height || '1rem' };
    }
  });

  const skeletonClasses = computed(() => [
    'animate-pulse bg-secondary-200',
    roundedClasses[props.rounded],
    props.variant === 'avatar' && 'rounded-full',
  ]);
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="i in count"
      :key="i"
      :class="skeletonClasses"
      :style="variantStyles"
    />
  </div>
</template>
