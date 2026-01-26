/**
 * Articles API Route
 *
 * Proxies requests to the external API with error handling.
 * This provides a fallback with mock data if the external API is unavailable.
 */

import type { ApiArticleResponse } from '~/models/api/article.api';

// Mock data for when the external API is unavailable
const MOCK_ARTICLES: ApiArticleResponse[] = [
  {
    id: '1',
    title: 'Getting Started with Nuxt 3: A Comprehensive Guide',
    slug: 'getting-started-with-nuxt-3',
    excerpt:
      'Learn how to build modern web applications with Nuxt 3, Vue 3, and TypeScript. This guide covers everything from project setup to deployment.',
    content: `
      <h2>Introduction</h2>
      <p>Nuxt 3 is the latest version of the popular Vue.js framework that provides server-side rendering, static site generation, and more out of the box.</p>

      <h2>Getting Started</h2>
      <p>To create a new Nuxt 3 project, you can use the following command:</p>
      <pre><code>npx nuxi init my-nuxt-app</code></pre>

      <h2>Key Features</h2>
      <ul>
        <li>Server-Side Rendering (SSR)</li>
        <li>Auto-imports</li>
        <li>File-based routing</li>
        <li>TypeScript support</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Nuxt 3 provides a powerful and flexible framework for building modern web applications.</p>
    `,
    author: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    category: {
      id: '1',
      name: 'Web Development',
      slug: 'web-development',
    },
    tags: ['nuxt', 'vue', 'typescript', 'ssr'],
    featured_image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published',
    view_count: 1250,
    reading_time: 8,
    published_at: '2025-01-20T10:00:00Z',
    created_at: '2025-01-15T08:30:00Z',
    updated_at: '2025-01-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'TypeScript Best Practices for Large-Scale Applications',
    slug: 'typescript-best-practices',
    excerpt:
      'Discover essential TypeScript patterns and practices for building maintainable, scalable applications that your team will love.',
    content: `
      <h2>Why TypeScript?</h2>
      <p>TypeScript adds static type checking to JavaScript, helping you catch errors early and improve code quality.</p>

      <h2>Best Practices</h2>
      <ol>
        <li>Use strict mode</li>
        <li>Avoid using 'any'</li>
        <li>Define clear interfaces</li>
        <li>Use union types for flexibility</li>
      </ol>

      <h2>Project Structure</h2>
      <p>Organize your code with clear type definitions and maintain a consistent folder structure.</p>
    `,
    author: {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    category: {
      id: '2',
      name: 'TypeScript',
      slug: 'typescript',
    },
    tags: ['typescript', 'javascript', 'best-practices'],
    featured_image:
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    status: 'published',
    view_count: 890,
    reading_time: 12,
    published_at: '2025-01-18T14:30:00Z',
    created_at: '2025-01-10T09:00:00Z',
    updated_at: '2025-01-18T14:30:00Z',
  },
  {
    id: '3',
    title: 'State Management with Pinia: The Vue 3 Way',
    slug: 'state-management-pinia',
    excerpt:
      'Explore how Pinia simplifies state management in Vue 3 applications with its intuitive API and excellent TypeScript support.',
    content: `
      <h2>What is Pinia?</h2>
      <p>Pinia is the official state management library for Vue 3, designed to be simple, type-safe, and modular.</p>

      <h2>Creating a Store</h2>
      <p>Pinia stores can be created using the Composition API style or Options API style.</p>

      <h2>Benefits</h2>
      <ul>
        <li>Full TypeScript support</li>
        <li>DevTools integration</li>
        <li>Hot module replacement</li>
        <li>SSR support</li>
      </ul>
    `,
    author: {
      id: '3',
      name: 'Emily Davis',
      email: 'emily@example.com',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
    category: {
      id: '1',
      name: 'Web Development',
      slug: 'web-development',
    },
    tags: ['vue', 'pinia', 'state-management'],
    featured_image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    status: 'published',
    view_count: 654,
    reading_time: 6,
    published_at: '2025-01-15T16:00:00Z',
    created_at: '2025-01-12T11:00:00Z',
    updated_at: '2025-01-15T16:00:00Z',
  },
  {
    id: '4',
    title: 'Building Responsive UIs with Tailwind CSS',
    slug: 'responsive-ui-tailwind',
    excerpt:
      'Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes and best practices.',
    content: `
      <h2>Why Tailwind CSS?</h2>
      <p>Tailwind CSS is a utility-first CSS framework that enables rapid UI development with consistent design patterns.</p>

      <h2>Responsive Design</h2>
      <p>Tailwind makes responsive design easy with its mobile-first breakpoint system.</p>

      <h2>Key Concepts</h2>
      <ul>
        <li>Utility-first approach</li>
        <li>Responsive prefixes</li>
        <li>Custom configuration</li>
        <li>Component extraction</li>
      </ul>
    `,
    author: {
      id: '4',
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
    category: {
      id: '3',
      name: 'CSS',
      slug: 'css',
    },
    tags: ['tailwind', 'css', 'responsive', 'ui'],
    featured_image:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
    status: 'published',
    view_count: 1100,
    reading_time: 7,
    published_at: '2025-01-22T09:00:00Z',
    created_at: '2025-01-20T14:00:00Z',
    updated_at: '2025-01-22T09:00:00Z',
  },
  {
    id: '5',
    title: 'Error Handling Strategies in Modern Web Applications',
    slug: 'error-handling-strategies',
    excerpt:
      'Comprehensive guide to implementing robust error handling in frontend applications to ensure great user experience.',
    content: `
      <h2>The Importance of Error Handling</h2>
      <p>Good error handling is essential for creating reliable applications that users can trust.</p>

      <h2>Types of Errors</h2>
      <ul>
        <li>Network errors</li>
        <li>API errors</li>
        <li>Runtime errors</li>
        <li>User input errors</li>
      </ul>

      <h2>Best Practices</h2>
      <p>Always provide meaningful feedback to users and log errors for debugging.</p>
    `,
    author: {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    category: {
      id: '1',
      name: 'Web Development',
      slug: 'web-development',
    },
    tags: ['error-handling', 'ux', 'best-practices'],
    featured_image:
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
    status: 'draft',
    view_count: 320,
    reading_time: 10,
    published_at: null,
    created_at: '2025-01-23T10:00:00Z',
    updated_at: '2025-01-24T08:00:00Z',
  },
  {
    id: '6',
    title: 'Server-Side Rendering vs Static Site Generation',
    slug: 'ssr-vs-ssg',
    excerpt:
      'Understanding when to use SSR or SSG in your Nuxt applications for optimal performance and SEO.',
    content: `
      <h2>What is SSR?</h2>
      <p>Server-Side Rendering generates pages on each request, providing dynamic content and better SEO.</p>

      <h2>What is SSG?</h2>
      <p>Static Site Generation pre-renders pages at build time, offering the best performance for static content.</p>

      <h2>When to Use Each</h2>
      <p>Choose SSR for dynamic content and SSG for content that doesn't change frequently.</p>
    `,
    author: {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    category: {
      id: '1',
      name: 'Web Development',
      slug: 'web-development',
    },
    tags: ['ssr', 'ssg', 'performance', 'seo'],
    featured_image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    status: 'published',
    view_count: 780,
    reading_time: 5,
    published_at: '2025-01-19T12:00:00Z',
    created_at: '2025-01-17T15:00:00Z',
    updated_at: '2025-01-19T12:00:00Z',
  },
];

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  try {
    // Try to fetch from external API
    const response = await $fetch(config.public.apiBase, {
      timeout: 5000, // 5 second timeout
    });

    // Return the external API response
    return response;
  } catch (error) {
    // Log the error (server-side)
    console.warn('[API] External API unavailable, using mock data:', error);

    // Return mock data as fallback
    return MOCK_ARTICLES;
  }
});
