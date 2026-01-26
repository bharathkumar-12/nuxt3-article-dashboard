<script setup lang="ts">
  /**
   * Error Page
   *
   * Global error handler for unhandled errors
   */

  interface Props {
    error: {
      statusCode: number;
      statusMessage: string;
      message: string;
    };
  }

  const props = defineProps<Props>();

  // Handle clear error
  function handleClearError() {
    clearError({ redirect: '/' });
  }

  // Determine error type
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
  <div
    class="min-h-screen flex items-center justify-center bg-secondary-50 px-4"
  >
    <div class="text-center">
      <!-- Error code -->
      <div class="text-6xl font-bold text-primary-600 mb-4">
        {{ error.statusCode }}
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-secondary-900 mb-2">
        {{ errorTitle }}
      </h1>

      <!-- Message -->
      <p class="text-secondary-500 mb-8 max-w-md">
        {{ errorMessage }}
      </p>

      <!-- Action -->
      <AppButton variant="primary" @click="handleClearError">
        Go to Home
      </AppButton>
    </div>
  </div>
</template>
