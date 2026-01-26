<script setup lang="ts">
  /**
   * AppButton Component
   *
   * Reusable button with variants and loading state
   */

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
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary:
      'bg-secondary-200 text-secondary-800 hover:bg-secondary-300 focus:ring-secondary-400',
    ghost:
      'bg-transparent text-secondary-700 hover:bg-secondary-100 focus:ring-secondary-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = computed(() => [
    // Base styles
    'inline-flex items-center justify-center font-medium rounded-lg',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Variant
    variantClasses[props.variant],
    // Size
    sizeClasses[props.size],
    // Full width
    props.fullWidth && 'w-full',
    // Disabled/Loading
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
