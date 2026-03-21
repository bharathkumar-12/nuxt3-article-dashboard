<script setup lang="ts">
  interface Props {
    title: string;
    description?: string;
    showBack?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    showBack: false,
  });

  const router = useRouter();

  function goBack() {
    router.back();
  }
</script>

<template>
  <header class="mb-10">
    <!-- Back button -->
    <button
      v-if="showBack"
      class="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary mb-6 transition-colors text-sm font-label tracking-wide"
      @click="goBack"
    >
      <span class="material-symbols-outlined text-base">arrow_back</span>
      Back
    </button>

    <!-- Title -->
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tighter text-on-surface font-headline leading-tight">
      {{ title }}
    </h1>

    <!-- Description -->
    <p v-if="description" class="mt-3 text-on-surface-variant/70 max-w-2xl font-body leading-relaxed">
      {{ description }}
    </p>

    <!-- Optional slot for actions -->
    <div v-if="$slots['actions']" class="mt-6">
      <slot name="actions" />
    </div>
  </header>
</template>
