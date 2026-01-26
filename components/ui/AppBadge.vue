<script setup lang="ts">
  /**
   * AppBadge Component
   *
   * Small badge/tag for status indicators and labels
   */

  type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
  type BadgeSize = 'sm' | 'md';

  interface Props {
    variant?: BadgeVariant;
    size?: BadgeSize;
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'md',
  });

  const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-secondary-100 text-secondary-700',
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
  };

  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  const badgeClasses = computed(() => [
    'inline-flex items-center font-medium rounded-full',
    variantClasses[props.variant],
    sizeClasses[props.size],
  ]);
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
