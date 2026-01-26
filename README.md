# Nuxt 3 Article Dashboard

A production-ready Article Dashboard built with **Nuxt 3**, **TypeScript**, **Pinia**, and **Tailwind CSS**. This project demonstrates advanced frontend architecture patterns including SSR, type-safe API handling, and robust error management.

![Nuxt 3](https://img.shields.io/badge/Nuxt-3.14-00DC82?style=flat-square&logo=nuxt.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Pinia](https://img.shields.io/badge/Pinia-2.2-yellow?style=flat-square)

## 🌐 Live Demo

[🚀 View Live Application](https://iridescent-cajeta-be05ee.netlify.app/)

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher (or pnpm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/nuxt3-article-dashboard.git
cd nuxt3-article-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
nuxt3-article-dashboard/
├── assets/
│   └── css/
│       └── tailwind.css          # Tailwind directives & custom styles
├── components/
│   ├── article/                   # Article-specific components
│   │   ├── ArticleCard.vue
│   │   ├── ArticleCardSkeleton.vue
│   │   ├── ArticleDetailSkeleton.vue
│   │   ├── ArticleDetailView.vue
│   │   └── ArticleList.vue
│   ├── common/                    # Shared UI states
│   │   ├── EmptyState.vue
│   │   ├── ErrorState.vue
│   │   ├── LoadingState.vue
│   │   └── PageHeader.vue
│   └── ui/                        # Reusable UI primitives
│       ├── AppBadge.vue
│       ├── AppButton.vue
│       ├── AppCard.vue
│       └── SkeletonLoader.vue
├── composables/
│   ├── useAPI.ts                  # Generic, reusable API wrapper
│   └── useArticles.ts             # Article-specific data fetching
├── layouts/
│   └── default.vue                # Main application layout
├── models/
│   ├── api/                       # Raw API response types
│   │   ├── article.api.ts
│   │   └── index.ts
│   └── domain/                    # Domain models & mappers
│       ├── article.mapper.ts
│       └── index.ts
├── pages/
│   ├── articles/
│   │   └── [id].vue               # Article detail page
│   └── index.vue                  # Article listing page
├── server/
│   └── api/
│       └── articles.get.ts        # API route with fallback
├── stores/
│   ├── article.store.ts           # Pinia article store
│   └── index.ts
├── types/
│   ├── article.ts                 # Article type definitions
│   ├── common.ts                  # Common type utilities
│   └── index.ts
├── utils/
│   ├── common.ts                  # Utility functions
│   └── index.ts
├── app.vue                        # App entry point
├── error.vue                      # Global error page
├── nuxt.config.ts                 # Nuxt configuration
├── tailwind.config.ts             # Tailwind configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🏗️ Architecture Overview

### Design Philosophy

This application follows a **layered architecture** that separates concerns and promotes maintainability:

```
┌─────────────────────────────────────────────────────────────┐
│                        PAGES                                 │
│  (Route handling, layout composition, minimal logic)         │
├─────────────────────────────────────────────────────────────┤
│                      COMPONENTS                              │
│  (UI rendering, user interactions, presentation)             │
├─────────────────────────────────────────────────────────────┤
│                      COMPOSABLES                             │
│  (Data fetching, business logic, state coordination)         │
├─────────────────────────────────────────────────────────────┤
│                    STORES (Pinia)                            │
│  (Client-side state caching, UI state, selections)           │
├─────────────────────────────────────────────────────────────┤
│                   MODELS/MAPPERS                             │
│  (API ↔ Domain transformation, data normalization)           │
├─────────────────────────────────────────────────────────────┤
│                      TYPES                                   │
│  (TypeScript interfaces, type guards, utilities)             │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

#### 1. Composables for Data Fetching (Not Pages/Components)

**Rule:** No API calls in pages or components.

```typescript
// ❌ WRONG - API call in component
const { data } = await useFetch('/api/articles');

// ✅ CORRECT - Use composable
const { articles, isLoading, error } = await useArticlesList();
```

**Why?**

- Centralizes data fetching logic
- Makes testing easier
- Enables consistent error handling
- Allows response transformation in one place

#### 2. API Models vs Domain Models

We maintain **two separate model layers**:

**API Models** (`models/api/`) - Raw API response shapes:

```typescript
interface ApiArticleResponse {
  id?: string | number;
  title?: string;
  created_at?: string; // snake_case from API
  author?: ApiAuthorResponse | string | null;
}
```

**Domain Models** (`types/`) - Clean, typed application models:

```typescript
interface Article {
  id: string;
  title: string;
  createdAt: Date; // camelCase, proper Date type
  author: ArticleAuthor; // Always an object
}
```

**Why?**

- APIs can change independently
- Domain models represent our ideal data shape
- Mappers handle all normalization in one place
- Graceful handling of missing/malformed data

#### 3. Pinia for Client-Side State, Composables for SSR

| Aspect         | Composables | Pinia Store       |
| -------------- | ----------- | ----------------- |
| Data Fetching  | ✅ Primary  | ❌ No             |
| SSR Support    | ✅ Built-in | ⚠️ Requires setup |
| Caching        | ❌ No       | ✅ Yes            |
| UI State       | ❌ No       | ✅ Yes            |
| Filters/Search | ❌ No       | ✅ Yes            |

**Pattern:**

```typescript
// Composable fetches data (SSR-safe)
const { articles } = await useArticlesList();

// Store caches for client-side navigation
const store = useArticleStore();
store.setArticles(articles.value);
```

## 🔧 API & Composables Strategy

### Generic API Composable (`useAPI.ts`)

A fully typed, reusable wrapper around `useFetch`:

```typescript
const { data, isLoading, isError, error, refresh } = useAPI<
  RawType,
  TransformedType
>('/api/endpoint', {
  transform: (raw) => mapToClean(raw),
  defaultValue: [],
  retries: 2,
  retryDelay: 1000,
});
```

**Features:**

- ✅ Automatic error handling
- ✅ Response transformation
- ✅ Retry logic for transient failures
- ✅ SSR-safe caching
- ✅ TypeScript generics for type safety
- ✅ Result type for clean consumption

### Feature Composables (`useArticles.ts`)

Feature-specific composables that use the generic `useAPI`:

```typescript
// List articles
const { articles, isLoading, error } = await useArticlesList();

// Single article
const { article, isLoading, error } = await useArticleDetail('123');

// Search
const { articles } = await useArticlesSearch(searchQuery);
```

## 📝 TypeScript Decisions

### Strict Mode Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### No `any` Policy

Every piece of data is typed. For unknown API responses:

```typescript
// Use unknown instead of any
const { data } = useAPI<unknown, ArticleListItem[]>(url, {
  transform: (raw) => mapApiResponseToArticleList(raw),
});
```

### Type Guards for Runtime Safety

```typescript
function isApiArticleArray(data: unknown): data is ApiArticleResponse[] {
  return Array.isArray(data);
}
```

### Result Type for Error Handling

```typescript
type Result<T, E = ApiError> =
  | { success: true; data: T }
  | { success: false; error: E };

// Usage
const result = await api.execute();
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.message);
}
```

## 🛡️ Error Handling Strategy

### Multi-Layer Error Handling

```
┌────────────────────────────────────────────────────────────┐
│ Layer 1: API Route (server/api/articles.get.ts)            │
│ - External API failures → Return mock data fallback        │
│ - Network timeouts → Graceful degradation                  │
├────────────────────────────────────────────────────────────┤
│ Layer 2: Composable (useAPI.ts)                            │
│ - Parse errors → Default values                            │
│ - HTTP errors → Standardized ApiError                      │
│ - Retry logic for transient failures                       │
├────────────────────────────────────────────────────────────┤
│ Layer 3: Mapper (article.mapper.ts)                        │
│ - Missing fields → Default values                          │
│ - Wrong types → Safe coercion                              │
│ - Unexpected shapes → Graceful handling                    │
├────────────────────────────────────────────────────────────┤
│ Layer 4: Component (ErrorState.vue)                        │
│ - User-friendly messages                                   │
│ - Retry functionality                                      │
│ - Never shows raw errors                                   │
└────────────────────────────────────────────────────────────┘
```

### Handling Partial/Missing Data

The mappers use safe defaults:

```typescript
const DEFAULTS = {
  author: {
    id: 'unknown',
    name: 'Unknown Author',
    email: 'unknown@example.com',
  },
  category: {
    id: 'uncategorized',
    name: 'Uncategorized',
    slug: 'uncategorized',
  },
  article: { title: 'Untitled Article', excerpt: '', content: '' },
};

function mapApiArticleToDomain(apiArticle: ApiArticleResponse): Article {
  return {
    id: ensureId(apiArticle.id), // Generate if missing
    title: apiArticle.title || DEFAULTS.article.title,
    author: mapApiAuthorToDomain(apiArticle.author), // Always returns valid author
    // ...
  };
}
```

### Error States in UI

Every data-dependent component handles:

1. **Loading** → Skeleton loaders
2. **Error** → ErrorState with retry
3. **Empty** → EmptyState with guidance
4. **Success** → Content

```vue
<template>
  <ArticleCardSkeleton v-if="isLoading" />
  <ErrorState v-else-if="isError" @retry="refresh" />
  <EmptyState v-else-if="isEmpty" />
  <ArticleList v-else :articles="articles" />
</template>
```

## 📱 Responsive Design

Mobile-first approach using Tailwind breakpoints:

```vue
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-48">...</div>
  <div class="p-4 md:p-6">...</div>
</div>
```

| Breakpoint | Width    | Usage         |
| ---------- | -------- | ------------- |
| Default    | < 640px  | Mobile        |
| `sm:`      | ≥ 640px  | Small tablets |
| `md:`      | ≥ 768px  | Tablets       |
| `lg:`      | ≥ 1024px | Laptops       |
| `xl:`      | ≥ 1280px | Desktops      |

## 🧪 Development Commands

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🔮 Assumptions Made

1. **API Contract:** The external API may return articles in various formats (array at root, nested in `data`/`articles`, etc.). Our mappers handle all these cases.

2. **Field Naming:** APIs might use snake_case or camelCase. Mappers check both conventions.

3. **Data Completeness:** Not all articles have all fields. We provide sensible defaults.

4. **Single Endpoint:** The mock API returns all articles at once. In production, you'd have pagination and individual article endpoints.

5. **Authentication:** Not implemented. Would be added via Nuxt auth modules.

## 🚀 Improvements with More Time

### High Priority

1. **Unit Tests**
   - Test composables with Vitest
   - Test mappers with edge cases
   - Component testing with Vue Test Utils

2. **E2E Tests**
   - Playwright tests for critical user flows
   - Visual regression testing

3. **Pagination**
   - Server-side pagination
   - Infinite scroll option
   - URL-based page state

### Medium Priority

4. **Performance**
   - Image optimization with Nuxt Image
   - Route-based code splitting
   - Service worker for offline support

5. **Features**
   - Article creation/editing
   - User authentication
   - Comments system
   - Favorites/bookmarks

6. **Accessibility**
   - Full ARIA compliance
   - Keyboard navigation
   - Screen reader testing
   - Focus management

### Nice to Have

7. **Developer Experience**
   - Storybook for components
   - OpenAPI/Swagger integration
   - Automated changelog

8. **Monitoring**
   - Error tracking (Sentry)
   - Analytics integration
   - Performance monitoring

## 📄 License

MIT License - feel free to use this project as a reference or starting point.

---

Built with ❤️ using Nuxt 3, TypeScript, Pinia, and Tailwind CSS.
