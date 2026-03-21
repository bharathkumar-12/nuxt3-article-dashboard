<script setup lang="ts">
  interface Props {
    title?: string;
    message?: string;
    showRetry?: boolean;
    retryLabel?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Something went wrong',
    message:
      'We encountered an error while loading the content. Please try again.',
    showRetry: true,
    retryLabel: 'Try again',
  });

  const emit = defineEmits<{
    retry: [];
  }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center content-fade-in">
    <!-- Error icon -->
    <div class="w-16 h-16 mb-6 rounded-2xl bg-error-container/20 flex items-center justify-center border border-error/10">
      <span class="material-symbols-outlined text-3xl text-error/70">error</span>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-bold text-on-surface font-headline mb-2 tracking-tight">
      {{ title }}
    </h3>

    <!-- Message -->
    <p class="text-on-surface-variant/60 max-w-md mb-8 font-body text-sm leading-relaxed">
      {{ message }}
    </p>

    <!-- Retry button -->
    <AppButton v-if="showRetry" variant="primary" @click="emit('retry')">
      <span class="material-symbols-outlined text-base mr-1">refresh</span>
      {{ retryLabel }}
    </AppButton>
  </div>
</template>
