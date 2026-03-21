<script setup lang="ts">
  interface Props {
    title?: string;
    description?: string;
    icon?: 'inbox' | 'search' | 'document' | 'error';
    actionLabel?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'No items found',
    description: 'There are no items to display at this time.',
    icon: 'inbox',
  });

  const emit = defineEmits<{
    action: [];
  }>();

  const iconMap: Record<string, string> = {
    inbox: 'inbox',
    search: 'search',
    document: 'article',
    error: 'error',
  };
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 px-4 text-center content-fade-in">
    <!-- Icon -->
    <div class="w-16 h-16 mb-6 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
      <span class="material-symbols-outlined text-3xl text-on-surface-variant/40">
        {{ iconMap[icon ?? 'inbox'] }}
      </span>
    </div>

    <!-- Title -->
    <h3 class="text-lg font-bold text-on-surface font-headline mb-2 tracking-tight">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-on-surface-variant/60 max-w-md mb-8 font-body text-sm leading-relaxed">
      {{ description }}
    </p>

    <!-- Action button -->
    <AppButton v-if="actionLabel" variant="secondary" @click="emit('action')">
      {{ actionLabel }}
    </AppButton>
  </div>
</template>
