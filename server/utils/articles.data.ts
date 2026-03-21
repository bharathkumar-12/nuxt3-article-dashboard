import type { ApiArticleResponse } from '~/models/api/article.api';

export const DEMO_ARTICLES: ApiArticleResponse[] = [
  {
    id: '1',
    title: 'The Pulse of Nuxt 3: Hydration Reimagined',
    slug: 'nuxt3-hydration-reimagined',
    excerpt:
      'Explore how the latest server-side rendering techniques are reducing Time to Interactive by 40% in modern edge environments.',
    content: `
      <h2>What Is Hydration?</h2>
      <p>Hydration is the process by which a server-rendered HTML page is made interactive in the browser. In Nuxt 3, this has been fundamentally rethought using Vue 3's Composition API and the Nitro server engine.</p>

      <h2>Selective Hydration</h2>
      <p>Rather than hydrating the entire page at once, Nuxt 3 can now selectively hydrate only the components that require interactivity. This dramatically reduces Time to Interactive (TTI) on content-heavy pages.</p>

      <h2>Island Architecture</h2>
      <p>Nuxt's "islands" concept allows you to define component boundaries that are independently hydrated. Static content renders instantly while interactive islands load progressively.</p>

      <pre><code>// Mark a component as a client-only island
definePageMeta({ ssr: false })</code></pre>

      <h2>Measured Results</h2>
      <p>Teams adopting selective hydration have reported TTI improvements of 35–45% on content-first pages. The combination of edge rendering and partial hydration creates an experience that feels native.</p>
    `,
    author: { id: '1', name: 'Elena Vance', email: 'elena@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    category: { id: '1', name: 'Engineering', slug: 'engineering' },
    tags: ['nuxt3', 'ssr', 'hydration', 'performance'],
    featured_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 4820,
    reading_time: 12,
    published_at: '2026-03-10T09:00:00Z',
    created_at: '2026-03-08T10:00:00Z',
    updated_at: '2026-03-10T09:00:00Z',
  },
  {
    id: '2',
    title: 'Mastering Composable Patterns for Scalable Apps',
    slug: 'composable-patterns-scalable-apps',
    excerpt:
      'Why logic extraction is the key to maintaining velocity in large-scale Nuxt projects. A deep exploration of composable architecture.',
    content: `
      <h2>The Composable Philosophy</h2>
      <p>Composables are the cornerstone of reusable logic in Vue 3 and Nuxt. They encapsulate stateful logic behind a clean, reactive interface that any component can consume.</p>

      <h2>Anatomy of a Great Composable</h2>
      <p>A well-structured composable follows a predictable pattern: it accepts configuration, returns reactive state and actions, and handles its own cleanup.</p>

      <pre><code>export function useArticles() {
  const data = ref([])
  const isLoading = ref(false)

  async function fetch() {
    isLoading.value = true
    data.value = await $fetch('/api/articles')
    isLoading.value = false
  }

  return { data, isLoading, fetch }
}</code></pre>

      <h2>Composition over Inheritance</h2>
      <p>Unlike mixins or class inheritance, composables compose without namespace collisions, making them ideal for large teams working on the same codebase.</p>
    `,
    author: { id: '2', name: 'Marcus Thorne', email: 'marcus@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    category: { id: '1', name: 'Engineering', slug: 'engineering' },
    tags: ['vue3', 'composables', 'architecture', 'patterns'],
    featured_image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 3210,
    reading_time: 6,
    published_at: '2026-03-14T08:00:00Z',
    created_at: '2026-03-12T11:00:00Z',
    updated_at: '2026-03-14T08:00:00Z',
  },
  {
    id: '3',
    title: 'Nuxt DevTools: The Power User Guide',
    slug: 'nuxt-devtools-power-user-guide',
    excerpt:
      'Unlock the full potential of your development environment with these hidden debugging gems inside Nuxt DevTools.',
    content: `
      <h2>Beyond the Basics</h2>
      <p>Most developers use Nuxt DevTools for component inspection and route visualization. But the tool's true power lies in its deeper integrations with Vite, Nitro, and Pinia.</p>

      <h2>The Inspector Panel</h2>
      <p>Click any element on screen and jump directly to the source component. The inspector bridges your browser and IDE without any configuration.</p>

      <h2>Performance Insights</h2>
      <p>The Timeline tab exposes hydration timing, server render durations, and client-side re-renders in a visual flamegraph. This is invaluable for hunting down TTI regressions.</p>

      <h2>Pinia Store Explorer</h2>
      <p>Browse, edit, and time-travel through your Pinia store state directly in DevTools. Changes are reflected live without a page reload.</p>
    `,
    author: { id: '3', name: 'Sarah Chen', email: 'sarah@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
    category: { id: '2', name: 'Tooling', slug: 'tooling' },
    tags: ['nuxt', 'devtools', 'debugging', 'dx'],
    featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 2980,
    reading_time: 9,
    published_at: '2026-03-12T14:00:00Z',
    created_at: '2026-03-10T10:00:00Z',
    updated_at: '2026-03-12T14:00:00Z',
  },
  {
    id: '4',
    title: 'Edge Functions and the Death of the Origin',
    slug: 'edge-functions-death-of-origin',
    excerpt:
      'How distributed compute is shifting the way we think about data locality, latency, and security at the network edge.',
    content: `
      <h2>What Is Edge Computing?</h2>
      <p>Edge computing moves server logic from a centralized origin to geographically distributed nodes—closer to users. For web apps this means sub-50ms server response times globally.</p>

      <h2>Nuxt on the Edge</h2>
      <p>Nuxt's Nitro server engine ships a universal build target that runs on Cloudflare Workers, Vercel Edge, and Deno Deploy without modification.</p>

      <h2>The Data Problem</h2>
      <p>The challenge is data—most databases are not edge-native. Solutions like Turso, Neon, and D1 are building globally distributed databases to close this gap.</p>

      <h2>Cold Start Elimination</h2>
      <p>Edge runtimes have no cold starts because they maintain persistent V8 isolates. Nuxt apps that migrate to edge consistently see P99 latency drop by 60–80%.</p>
    `,
    author: { id: '4', name: 'David K.', email: 'david@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    category: { id: '3', name: 'Infrastructure', slug: 'infrastructure' },
    tags: ['edge', 'nitro', 'cloudflare', 'performance'],
    featured_image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 5640,
    reading_time: 15,
    published_at: '2026-03-08T07:00:00Z',
    created_at: '2026-03-05T09:00:00Z',
    updated_at: '2026-03-08T07:00:00Z',
  },
  {
    id: '5',
    title: 'TypeScript Strict Mode: Why You Should Embrace the Pain',
    slug: 'typescript-strict-mode-embrace-the-pain',
    excerpt:
      'Strict TypeScript feels brutal at first. Here is why enabling it is the single best investment you can make in a long-lived codebase.',
    content: `
      <h2>What Strict Mode Enables</h2>
      <p>TypeScript's strict flag enables a suite of checks: strictNullChecks, noImplicitAny, strictFunctionTypes, and more. Together they eliminate entire classes of runtime errors.</p>

      <h2>The Migration Path</h2>
      <p>You do not have to fix everything at once. Enable strict mode file by file using <code>// @ts-strict</code> comments while gradually upgrading the rest of the codebase.</p>

      <h2>Measured Impact</h2>
      <p>Teams that have fully migrated to strict mode report 40–60% fewer type-related production bugs. The upfront cost pays dividends over the lifetime of the project.</p>
    `,
    author: { id: '1', name: 'Elena Vance', email: 'elena@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    category: { id: '4', name: 'TypeScript', slug: 'typescript' },
    tags: ['typescript', 'strict', 'best-practices', 'quality'],
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 2170,
    reading_time: 8,
    published_at: '2026-03-06T10:00:00Z',
    created_at: '2026-03-04T08:00:00Z',
    updated_at: '2026-03-06T10:00:00Z',
  },
  {
    id: '6',
    title: 'Pinia vs Vuex: A Definitive Migration Guide',
    slug: 'pinia-vs-vuex-migration-guide',
    excerpt:
      'Everything you need to know to migrate a production Vuex 4 store to Pinia without breaking a single component.',
    content: `
      <h2>Why Pinia?</h2>
      <p>Pinia is the official replacement for Vuex in Vue 3. It drops mutations entirely, has first-class TypeScript support, and feels like writing plain Composition API code.</p>

      <h2>The Core Differences</h2>
      <p>Vuex requires actions to commit mutations which update state. Pinia lets you mutate state directly inside actions—no boilerplate needed.</p>

      <h2>Migration Strategy</h2>
      <p>Migrate one module at a time. Pinia stores are independent and can coexist with Vuex during transition. Start with the smallest, least-coupled store.</p>

      <h2>TypeScript Benefits</h2>
      <p>Pinia stores are fully typed automatically. State, getters, and actions all have inferred types with no extra configuration required.</p>
    `,
    author: { id: '2', name: 'Marcus Thorne', email: 'marcus@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    category: { id: '1', name: 'Engineering', slug: 'engineering' },
    tags: ['pinia', 'vuex', 'vue3', 'state-management'],
    featured_image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 3890,
    reading_time: 11,
    published_at: '2026-03-04T12:00:00Z',
    created_at: '2026-03-02T09:00:00Z',
    updated_at: '2026-03-04T12:00:00Z',
  },
  {
    id: '7',
    title: 'Building a Design System with Tailwind CSS and Nuxt',
    slug: 'design-system-tailwind-nuxt',
    excerpt:
      'How to create a scalable, token-driven design system inside a Nuxt 3 monorepo that your whole team can rely on.',
    content: `
      <h2>Design Tokens First</h2>
      <p>Before writing a single component, define your design tokens—colors, spacing, typography, radii—in your Tailwind config. These become the shared language between design and engineering.</p>

      <h2>Component Primitives</h2>
      <p>Build primitives like Button, Input, and Card as thin wrappers that apply token-driven classes. Avoid leaking Tailwind utility classes into consuming code.</p>

      <h2>Documentation with Nuxt</h2>
      <p>Use a dedicated Nuxt layer for your design system docs. Component examples live next to the components themselves and render live in the browser.</p>
    `,
    author: { id: '3', name: 'Sarah Chen', email: 'sarah@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
    category: { id: '5', name: 'Design', slug: 'design' },
    tags: ['tailwind', 'design-system', 'nuxt', 'ui'],
    featured_image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 1870,
    reading_time: 7,
    published_at: '2026-03-02T08:00:00Z',
    created_at: '2026-02-28T10:00:00Z',
    updated_at: '2026-03-02T08:00:00Z',
  },
  {
    id: '8',
    title: 'Micro-Frontends in the Age of Hydration',
    slug: 'micro-frontends-age-of-hydration',
    excerpt:
      'Can micro-frontends and island architecture coexist? We explore the emerging patterns that make both possible.',
    content: `
      <h2>The Problem with Micro-Frontends</h2>
      <p>Traditional micro-frontend approaches load separate JavaScript bundles per team, multiplying hydration costs. In an era of Core Web Vitals, this is untenable.</p>

      <h2>Islands as Micro-Frontends</h2>
      <p>Nuxt's island architecture provides a natural boundary for micro-frontend ownership. Each island can be owned by a different team and deployed independently.</p>

      <h2>Module Federation</h2>
      <p>Vite's Module Federation plugin allows islands to share common dependencies—Vue, Nuxt utilities—without duplication. Bundle sizes drop by 30–50% compared to naive splitting.</p>
    `,
    author: { id: '4', name: 'David K.', email: 'david@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    category: { id: '3', name: 'Infrastructure', slug: 'infrastructure' },
    tags: ['micro-frontends', 'architecture', 'islands', 'vite'],
    featured_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 2450,
    reading_time: 10,
    published_at: '2026-02-28T11:00:00Z',
    created_at: '2026-02-26T09:00:00Z',
    updated_at: '2026-02-28T11:00:00Z',
  },
  {
    id: '9',
    title: 'The Architecture of Ethereal Interfaces',
    slug: 'architecture-of-ethereal-interfaces',
    excerpt:
      'Glassmorphism, tonal layering, and the design philosophy behind building high-end editorial web experiences.',
    content: `
      <h2>Beyond Flat Design</h2>
      <p>The resurgence of depth in UI design is not a trend—it is a response to the visual noise of infinite flat surfaces. Glassmorphism reintroduces physicality through transparency and blur.</p>

      <h2>Tonal Layering</h2>
      <p>Rather than hard borders, tonal layering uses background shifts to create hierarchy. A surface-container card on a surface background reads as elevated without a single border in sight.</p>

      <h2>The No-Line Rule</h2>
      <p>Traditional 1px borders are strictly prohibited. Boundaries are defined by tonal transitions and vertical breathing room—letting content sit naturally in the void.</p>

      <h2>Implementation in Tailwind</h2>
      <p>Map your design tokens directly to Tailwind's theme extension. Use backdrop-blur utilities for glass effects and opacity modifiers for ghost borders.</p>
    `,
    author: { id: '1', name: 'Elena Vance', email: 'elena@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    category: { id: '5', name: 'Design', slug: 'design' },
    tags: ['glassmorphism', 'ui-design', 'tailwind', 'design-system'],
    featured_image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 6120,
    reading_time: 14,
    published_at: '2026-02-24T09:00:00Z',
    created_at: '2026-02-20T10:00:00Z',
    updated_at: '2026-02-24T09:00:00Z',
  },
  {
    id: '10',
    title: 'Quantum Encryption in the Browser with WebCrypto',
    slug: 'quantum-encryption-browser-webcrypto',
    excerpt:
      'How the WebCrypto API is evolving to meet the demands of a post-quantum digital world—and what you can do today.',
    content: `
      <h2>The Post-Quantum Threat</h2>
      <p>Quantum computers capable of breaking RSA-2048 encryption are projected within 10–15 years. Web applications need to begin transitioning to post-quantum algorithms now.</p>

      <h2>WebCrypto Today</h2>
      <p>The WebCrypto API already provides hardware-accelerated AES-GCM, ECDH, and RSA-OAEP directly in the browser. No native modules, no dependencies.</p>

      <h2>Post-Quantum Algorithms</h2>
      <p>NIST has standardized CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for signatures. Polyfill libraries are available for browsers today.</p>
    `,
    author: { id: '3', name: 'Sarah Chen', email: 'sarah@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
    category: { id: '6', name: 'Security', slug: 'security' },
    tags: ['security', 'webcrypto', 'encryption', 'post-quantum'],
    featured_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 3340,
    reading_time: 13,
    published_at: '2026-02-20T10:00:00Z',
    created_at: '2026-02-17T08:00:00Z',
    updated_at: '2026-02-20T10:00:00Z',
  },
  {
    id: '11',
    title: 'Nitro Server Engine: A Complete Deep Dive',
    slug: 'nitro-server-engine-deep-dive',
    excerpt:
      'Nitro powers every Nuxt 3 deployment. Understanding its internals unlocks performance and architecture improvements you cannot find anywhere else.',
    content: `
      <h2>What Is Nitro?</h2>
      <p>Nitro is the server engine that powers Nuxt 3. It handles routing, middleware, API endpoints, and deployment targets—all from a single unified build pipeline.</p>

      <h2>Universal Deployment</h2>
      <p>Write your server code once and Nitro compiles it for Node.js, Deno, Cloudflare Workers, AWS Lambda, and a dozen more targets without changes to your code.</p>

      <h2>Caching Primitives</h2>
      <p>Nitro includes built-in caching via <code>defineCachedEventHandler</code>. Cache responses at the CDN, server, or route level with a single decorator.</p>
    `,
    author: { id: '2', name: 'Marcus Thorne', email: 'marcus@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    category: { id: '1', name: 'Engineering', slug: 'engineering' },
    tags: ['nitro', 'nuxt3', 'server', 'deployment'],
    featured_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 4110,
    reading_time: 16,
    published_at: '2026-02-18T08:00:00Z',
    created_at: '2026-02-15T09:00:00Z',
    updated_at: '2026-02-18T08:00:00Z',
  },
  {
    id: '12',
    title: 'The Haptic Potential of CSS Motion Wrappers',
    slug: 'haptic-potential-css-motion-wrappers',
    excerpt:
      'Animation is not decoration—it is information. How motion primitives communicate state, hierarchy, and cause-effect to users.',
    content: `
      <h2>Animation as Communication</h2>
      <p>Every animation either adds clarity or creates noise. The principle of haptic feedback in physical design maps directly to motion in interfaces: movement should confirm actions and guide attention.</p>

      <h2>The Motion Token System</h2>
      <p>Define motion as tokens alongside your color and spacing tokens. Duration, easing, and delay should be consistent design decisions, not ad-hoc CSS values scattered across components.</p>

      <h2>Vue Transition Wrappers</h2>
      <p>Build reusable transition components that encapsulate your motion tokens. A FadeInUp wrapper applied consistently across your app creates a coherent kinetic language.</p>
    `,
    author: { id: '1', name: 'Elena Vance', email: 'elena@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    category: { id: '5', name: 'Design', slug: 'design' },
    tags: ['animation', 'css', 'motion', 'ux'],
    featured_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 1980,
    reading_time: 7,
    published_at: '2026-02-16T09:00:00Z',
    created_at: '2026-02-13T10:00:00Z',
    updated_at: '2026-02-16T09:00:00Z',
  },
  {
    id: '13',
    title: 'The Velocity of Edge Computing with Nuxt Nitro',
    slug: 'velocity-edge-computing-nuxt-nitro',
    excerpt:
      'Redefining latency through global edge deployments and Nuxt Nitro engine optimization. A practical guide.',
    content: `
      <h2>Why Latency Still Matters</h2>
      <p>A 100ms improvement in Time to First Byte correlates with a 1% improvement in conversion rate. At scale, this is significant. Edge computing is the most impactful lever available today.</p>

      <h2>Deploying Nuxt to the Edge</h2>
      <p>Nitro's Cloudflare Workers preset produces a fully self-contained worker bundle. With <code>output: 'cloudflare'</code> in your nuxt.config, the entire SSR pipeline runs at the network edge.</p>

      <h2>Cache-First Architecture</h2>
      <p>Combine edge rendering with Nitro's caching primitives to serve fully rendered HTML from the cache on subsequent requests. Cache invalidation is triggered by content deploys.</p>
    `,
    author: { id: '4', name: 'David K.', email: 'david@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    category: { id: '3', name: 'Infrastructure', slug: 'infrastructure' },
    tags: ['edge', 'nitro', 'performance', 'caching'],
    featured_image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 2890,
    reading_time: 10,
    published_at: '2026-02-14T12:00:00Z',
    created_at: '2026-02-11T09:00:00Z',
    updated_at: '2026-02-14T12:00:00Z',
  },
  {
    id: '14',
    title: 'Neo-Brutalism vs Glassmorphism: A Design Reckoning',
    slug: 'neo-brutalism-vs-glassmorphism',
    excerpt:
      'Two dominant aesthetic directions battle for the soul of modern web UI. Which philosophy better serves users today?',
    content: `
      <h2>The Case for Neo-Brutalism</h2>
      <p>Neo-brutalism rejects the softness of glassmorphism in favor of raw honesty: thick borders, monospaced type, high contrast. It signals authenticity over polish.</p>

      <h2>The Case for Glassmorphism</h2>
      <p>Glass surfaces create depth without visual weight. When executed correctly, they feel premium and futuristic—ideal for editorial or data-rich products where content must breathe.</p>

      <h2>The Psychological Impact</h2>
      <p>Research from Nielsen Norman Group suggests that UI aesthetics directly impact perceived usability. Glass surfaces score higher on trustworthiness; brutalism scores higher on memorability.</p>

      <h2>The Verdict</h2>
      <p>Neither wins universally. The choice depends on your brand, audience, and content density. The best interfaces borrow deliberately from both.</p>
    `,
    author: { id: '3', name: 'Sarah Chen', email: 'sarah@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
    category: { id: '5', name: 'Design', slug: 'design' },
    tags: ['design', 'brutalism', 'glassmorphism', 'aesthetics'],
    featured_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 5230,
    reading_time: 8,
    published_at: '2026-02-10T10:00:00Z',
    created_at: '2026-02-07T08:00:00Z',
    updated_at: '2026-02-10T10:00:00Z',
  },
  {
    id: '15',
    title: 'useFetch vs useAsyncData: When to Use Each',
    slug: 'usefetch-vs-useasyncdata',
    excerpt:
      'Nuxt 3 ships two data-fetching primitives that look similar but serve different purposes. Here is the definitive guide.',
    content: `
      <h2>useFetch</h2>
      <p>useFetch is a convenience wrapper that combines useAsyncData with $fetch. It is ideal for simple, single-endpoint calls where you want reactive data with minimal boilerplate.</p>

      <h2>useAsyncData</h2>
      <p>useAsyncData gives you full control over the async operation. Use it when you need to call multiple endpoints, transform data, or integrate with non-HTTP async sources.</p>

      <pre><code>// Simple - use useFetch
const { data } = await useFetch('/api/articles')

// Complex - use useAsyncData
const { data } = await useAsyncData('articles', async () => {
  const [articles, categories] = await Promise.all([
    $fetch('/api/articles'),
    $fetch('/api/categories'),
  ])
  return { articles, categories }
})</code></pre>

      <h2>Deduplication</h2>
      <p>Both composables deduplicate requests using their cache key. Duplicate keys across components will share the same data fetch—a critical optimization for SSR.</p>
    `,
    author: { id: '2', name: 'Marcus Thorne', email: 'marcus@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    category: { id: '1', name: 'Engineering', slug: 'engineering' },
    tags: ['nuxt3', 'data-fetching', 'ssr', 'composables'],
    featured_image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 4450,
    reading_time: 9,
    published_at: '2026-02-08T08:00:00Z',
    created_at: '2026-02-05T10:00:00Z',
    updated_at: '2026-02-08T08:00:00Z',
  },
  {
    id: '16',
    title: 'Accessible Components: The Overlooked Frontier',
    slug: 'accessible-components-overlooked-frontier',
    excerpt:
      'WCAG compliance is a legal requirement for many organizations, but it is also a design opportunity. Building for accessibility makes products better for everyone.',
    content: `
      <h2>Accessibility Is Not Optional</h2>
      <p>Beyond the moral imperative, WCAG 2.2 compliance is now legally required in the EU and increasingly in the US. Retrofitting accessibility is far more expensive than building it in from the start.</p>

      <h2>The ARIA Trap</h2>
      <p>ARIA attributes do not fix poor semantic HTML—they make bad HTML loudly wrong. Start with the right HTML elements before reaching for ARIA.</p>

      <h2>Focus Management in SPAs</h2>
      <p>Single-page applications must explicitly manage focus during navigation. Nuxt's router hooks provide ideal integration points for focus management logic.</p>

      <h2>Automated Testing</h2>
      <p>Tools like axe-core and Playwright's accessibility checks catch 30–40% of accessibility issues automatically. They are not a replacement for manual testing, but they are essential.</p>
    `,
    author: { id: '1', name: 'Elena Vance', email: 'elena@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    category: { id: '5', name: 'Design', slug: 'design' },
    tags: ['accessibility', 'wcag', 'a11y', 'ux'],
    featured_image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 1640,
    reading_time: 11,
    published_at: '2026-02-06T09:00:00Z',
    created_at: '2026-02-03T11:00:00Z',
    updated_at: '2026-02-06T09:00:00Z',
  },
  {
    id: '17',
    title: 'Building a Real-Time Dashboard with Nuxt and WebSockets',
    slug: 'realtime-dashboard-nuxt-websockets',
    excerpt:
      'SSR and real-time data are not mutually exclusive. Learn how to build a live-updating dashboard that hydrates instantly and streams data via WebSockets.',
    content: `
      <h2>The SSR + WebSocket Challenge</h2>
      <p>Server-rendered pages have an initial snapshot of data. WebSockets then stream live updates. The challenge is merging these two data streams without visual flicker.</p>

      <h2>Nitro WebSocket Support</h2>
      <p>Nuxt 3.12+ ships native WebSocket support via Nitro. Define WebSocket handlers alongside your API routes with the same file-based conventions.</p>

      <pre><code>// server/api/live.ws.ts
export default defineWebSocketHandler({
  open(peer) {
    peer.send(JSON.stringify({ type: 'connected' }))
  },
  message(peer, msg) {
    // broadcast to all peers
  }
})</code></pre>

      <h2>Client Composable</h2>
      <p>Wrap your WebSocket connection in a composable that handles reconnection, message parsing, and cleanup. Expose reactive data that components can subscribe to directly.</p>
    `,
    author: { id: '4', name: 'David K.', email: 'david@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    category: { id: '1', name: 'Engineering', slug: 'engineering' },
    tags: ['websockets', 'real-time', 'nuxt3', 'nitro'],
    featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 2780,
    reading_time: 12,
    published_at: '2026-02-04T11:00:00Z',
    created_at: '2026-02-01T09:00:00Z',
    updated_at: '2026-02-04T11:00:00Z',
  },
  {
    id: '18',
    title: 'CSS Container Queries: The Layout Revolution',
    slug: 'css-container-queries-layout-revolution',
    excerpt:
      'Media queries respond to the viewport. Container queries respond to the parent. This changes how we build responsive components forever.',
    content: `
      <h2>The Problem with Media Queries</h2>
      <p>Media queries are great for page-level layouts but break down for component-level responsiveness. A card component should not need to know the viewport width—it should respond to its container.</p>

      <h2>Container Query Syntax</h2>
      <p>Define a containment context on a parent element, then query it from children. The syntax mirrors media queries and is fully supported in all modern browsers.</p>

      <pre><code>.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { flex-direction: row; }
}</code></pre>

      <h2>In Tailwind CSS</h2>
      <p>Tailwind v3.2+ ships built-in container query utilities. The <code>@container</code> plugin adds responsive prefixes that work exactly like responsive breakpoints.</p>
    `,
    author: { id: '3', name: 'Sarah Chen', email: 'sarah@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face' },
    category: { id: '7', name: 'CSS', slug: 'css' },
    tags: ['css', 'container-queries', 'responsive', 'tailwind'],
    featured_image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 3120,
    reading_time: 6,
    published_at: '2026-02-02T08:00:00Z',
    created_at: '2026-01-30T10:00:00Z',
    updated_at: '2026-02-02T08:00:00Z',
  },
  {
    id: '19',
    title: 'Optimistic UI: Designing for Speed Over Accuracy',
    slug: 'optimistic-ui-speed-over-accuracy',
    excerpt:
      'Optimistic UI updates assume success before the server confirms it. Done right, this makes apps feel instant. Done wrong, it erodes trust.',
    content: `
      <h2>What Is Optimistic UI?</h2>
      <p>Optimistic UI means updating the interface immediately upon user action, before the server responds. If the request fails, you roll back to the previous state.</p>

      <h2>Implementation in Vue 3</h2>
      <p>Use a local copy of your Pinia store state that is updated optimistically. Subscribe to the action result and revert on failure with a user-facing notification.</p>

      <h2>When Not to Use It</h2>
      <p>Avoid optimistic updates for destructive actions (delete, payment), high-failure-rate operations, or cases where the server response contains data that cannot be predicted.</p>

      <h2>Rollback UX</h2>
      <p>A failed optimistic update must be handled gracefully. Animate the rollback, explain what happened, and offer a retry. Never leave the user in a confused state.</p>
    `,
    author: { id: '1', name: 'Elena Vance', email: 'elena@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    category: { id: '5', name: 'Design', slug: 'design' },
    tags: ['optimistic-ui', 'ux', 'pinia', 'vue3'],
    featured_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 2030,
    reading_time: 8,
    published_at: '2026-01-30T10:00:00Z',
    created_at: '2026-01-27T09:00:00Z',
    updated_at: '2026-01-30T10:00:00Z',
  },
  {
    id: '20',
    title: 'Why 2026 Is the Year of Editorial Glass',
    slug: 'year-of-editorial-glass-2026',
    excerpt:
      'The convergence of powerful backdrop-filter support, OLED displays, and design-systems maturity is creating a perfect moment for glass-based interfaces.',
    content: `
      <h2>The Technical Conditions Are Finally Right</h2>
      <p>Backdrop-filter has been available for years, but its performance overhead made it impractical at scale. With modern GPU compositing, backdrop-blur at 12px costs almost nothing on mid-range devices.</p>

      <h2>OLED and the Dark Mode Era</h2>
      <p>OLED displays make dark mode more than aesthetic—it saves battery. Glass surfaces on dark backgrounds leverage OLED's true blacks to create depth that is both beautiful and power-efficient.</p>

      <h2>Design System Maturity</h2>
      <p>The industry has accumulated enough experience with token-driven design systems to apply glass effects systematically rather than ad-hoc. Teams now have the tooling to do glassmorphism consistently at scale.</p>

      <h2>What Comes Next</h2>
      <p>Variable blur, depth-aware shadows, and spatial UI primitives borrowed from visionOS are beginning to appear in web interfaces. The next chapter of editorial glass is already being written.</p>
    `,
    author: { id: '2', name: 'Marcus Thorne', email: 'marcus@nuxtlens.io', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    category: { id: '5', name: 'Design', slug: 'design' },
    tags: ['glassmorphism', 'design-trends', 'oled', 'editorial'],
    featured_image: 'https://images.unsplash.com/photo-1636690513351-0af1763f6237?w=800&h=450&fit=crop',
    status: 'published',
    view_count: 7840,
    reading_time: 9,
    published_at: '2026-01-28T09:00:00Z',
    created_at: '2026-01-25T10:00:00Z',
    updated_at: '2026-01-28T09:00:00Z',
  },
];
