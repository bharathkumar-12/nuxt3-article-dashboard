<script setup lang="ts">
  type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
  type ButtonSize = 'sm' | 'md' | 'lg';

  interface Props {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    type: 'button',
    fullWidth: false,
  });

  const emit = defineEmits<{
    click: [event: MouseEvent];
  }>();

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'glass-panel text-primary font-bold hover:bg-primary-container transition-all duration-300',
    secondary:
      'border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/40 bg-transparent transition-all duration-300',
    ghost:
      'bg-transparent text-on-surface-variant hover:bg-surface-container-high transition-all duration-300',
    danger:
      'bg-error-container/30 text-error border border-error/20 hover:bg-error-container/50 transition-all duration-300',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const buttonClasses = computed(() => [
    'inline-flex items-center justify-center rounded-full font-label tracking-tight',
    'focus:outline-none active:scale-[0.98] transition-transform duration-200',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.fullWidth && 'w-full',
    (props.disabled || props.loading) && 'opacity-50 cursor-not-allowed',
  ]);

  function handleClick(event: MouseEvent) {
    if (props.disabled || props.loading) return;
    emit('click', event);
  }
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
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

    <slot />
  </button>
</template>
