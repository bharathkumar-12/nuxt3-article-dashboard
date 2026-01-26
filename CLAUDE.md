# CLAUDE.md - Project Instructions

## Project Overview

This is a **Nuxt 3 Article Dashboard** application. Follow these guidelines for all development work.

---

## Tech Stack

- **Framework:** Nuxt 3 (Vue 3 + Composition API)
- **Styling:** Tailwind CSS / UnoCSS
- **State:** Pinia (if needed)
- **Language:** TypeScript (strict mode)

---

## Code Standards

### General Rules

- Use `<script setup lang="ts">` for all components
- Prefer Composition API with composables over Options API
- Use auto-imports (Nuxt handles Vue/Nuxt imports automatically)
- Keep components small and focused (< 200 lines)
- Extract reusable logic into `composables/`

### Naming Conventions

| Type             | Convention                         | Example                       |
| ---------------- | ---------------------------------- | ----------------------------- |
| Components       | PascalCase                         | `ArticleCard.vue`             |
| Composables      | camelCase with `use` prefix        | `useArticles.ts`              |
| Pages            | kebab-case                         | `article-[id].vue`            |
| API Routes       | kebab-case                         | `server/api/articles.get.ts`  |
| Types/Interfaces | PascalCase with `I` or descriptive | `Article`, `IArticleResponse` |

### File Structure

```
├── components/          # Auto-imported Vue components
│   ├── ui/              # Reusable UI components
│   └── article/         # Feature-specific components
├── composables/         # Auto-imported composables
├── pages/               # File-based routing
├── layouts/             # Page layouts
├── server/
│   ├── api/             # API endpoints
│   └── utils/           # Server utilities
├── types/               # TypeScript types
├── stores/              # Pinia stores (if used)
└── utils/               # Client utilities
```

---

## Development Patterns

### Components

```vue
<script setup lang="ts">
  // Props with defaults
  const props = withDefaults(
    defineProps<{
      title: string;
      count?: number;
    }>(),
    {
      count: 0,
    },
  );

  // Emits
  const emit = defineEmits<{
    update: [value: string];
  }>();

  // Composables at top
  const { data } = useArticles();
</script>

<template>
  <!-- Single root element preferred -->
</template>
```

### API Routes

```ts
// server/api/articles.get.ts
export default defineEventHandler(async (event) => {
  // Use H3 utilities
  const query = getQuery(event);
  // Return data directly (auto-serialized)
  return { articles: [] };
});
```

### Data Fetching

```ts
// Prefer useFetch/useAsyncData over raw fetch
const { data, pending, error, refresh } = await useFetch('/api/articles');

// With typing
const { data } = await useFetch<Article[]>('/api/articles');
```

---

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview production
npm run preview

# Linting
npm run lint

# Type checking
npm run typecheck
```

---

## Do's and Don'ts

### ✅ DO

- Use `definePageMeta()` for page-level config
- Use `navigateTo()` for programmatic navigation
- Use `useState()` for SSR-safe shared state
- Handle loading and error states in UI
- Add TypeScript types for all data structures
- Use Nuxt's built-in SEO with `useSeoMeta()`

### ❌ DON'T

- Don't use `this` - we're in Composition API
- Don't import Vue utilities manually (auto-imported)
- Don't use `localStorage` directly (not SSR-safe) - use `useState` or `useCookie`
- Don't create `.js` files - use `.ts` always
- Don't skip error handling on async operations
- Don't hardcode API URLs - use runtime config

---

## Response Guidelines

When I ask you to:

1. **Create a feature** → Create all necessary files (component, composable, types, API route)
2. **Fix a bug** → Explain the root cause briefly, then fix it
3. **Refactor** → Keep the same functionality, improve code quality
4. **Review** → Point out issues with specific line references

### Output Preferences

- Be concise - skip obvious explanations
- Show file paths clearly
- Run `npm run typecheck` after TypeScript changes
- Test API routes with actual requests when created

---

## Project-Specific Context

<!-- Add your specific context below as the project grows -->

### Data Models

```ts
// Add your types here as you define them
interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}
```

### Environment Variables

```bash
# .env
NUXT_PUBLIC_API_BASE=
DATABASE_URL=
```

---

_Keep this file updated as the project evolves._
