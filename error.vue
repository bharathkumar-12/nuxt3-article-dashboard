<script setup lang="ts">
  interface Props {
    error: {
      statusCode: number;
      statusMessage: string;
      message: string;
    };
  }

  const props = defineProps<Props>();

  function handleClearError() {
    clearError({ redirect: '/' });
  }

  const isNotFound = computed(() => props.error.statusCode === 404);

  const errorTitle = computed(() => {
    if (isNotFound.value) return 'Page Not Found';
    if (props.error.statusCode >= 500) return 'Server Error';
    return 'Something Went Wrong';
  });

  const errorMessage = computed(() => {
    if (isNotFound.value) {
      return "The page you're looking for doesn't exist or has been moved.";
    }
    return (
      props.error.message || 'An unexpected error occurred. Please try again.'
    );
  });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div class="text-center content-fade-in">
      <!-- Error code -->
      <div class="text-7xl font-extrabold text-primary tracking-tighter font-headline mb-4">
        {{ error.statusCode }}
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-on-surface font-headline tracking-tight mb-3">
        {{ errorTitle }}
      </h1>

      <!-- Message -->
      <p class="text-on-surface-variant/60 mb-10 max-w-md font-body leading-relaxed">
        {{ errorMessage }}
      </p>

      <!-- Action -->
      <AppButton variant="primary" size="lg" @click="handleClearError">
        Go to Home
      </AppButton>
    </div>
  </div>
</template>
