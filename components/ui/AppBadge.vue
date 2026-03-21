<script setup lang="ts">
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
    default: 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/10',
    primary: 'bg-primary/10 text-tertiary border border-tertiary/20',
    success: 'bg-surface-container-highest text-tertiary border border-tertiary/20',
    warning: 'bg-surface-container-highest text-primary border border-primary/20',
    danger: 'bg-error-container/30 text-error border border-error/20',
  };

  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const badgeClasses = computed(() => [
    'inline-flex items-center font-bold rounded-full tracking-widest uppercase font-label',
    variantClasses[props.variant],
    sizeClasses[props.size],
  ]);
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
