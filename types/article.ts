/**
 * Article-specific type definitions
 */

import type { LoadingState } from './common';

/**
 * Article status enumeration
 */
export type ArticleStatus = 'draft' | 'published' | 'archived';

/**
 * Article category
 */
export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

/**
 * Article author
 */
export interface ArticleAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

/**
 * Domain Article model - used throughout the application
 * This is the clean, typed model we work with in our components
 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: ArticleAuthor;
  category: ArticleCategory;
  tags: string[];
  featuredImage?: string;
  status: ArticleStatus;
  viewCount: number;
  readingTime: number; // in minutes
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Article list item - lighter version for lists
 */
export interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: Pick<ArticleAuthor, 'id' | 'name' | 'avatar'>;
  category: ArticleCategory;
  featuredImage?: string;
  status: ArticleStatus;
  readingTime: number;
  publishedAt: Date | null;
}

/**
 * Article detail - full version for detail page
 */
export interface ArticleDetail extends Article {
  relatedArticles?: ArticleListItem[];
}

/**
 * Article store state
 */
export interface ArticleState {
  articles: ArticleListItem[];
  currentArticle: ArticleDetail | null;
  loadingState: LoadingState;
  error: string | null;
  lastFetched: Date | null;
}

/**
 * Article filters
 */
export interface ArticleFilters {
  status?: ArticleStatus;
  category?: string;
  search?: string;
  page?: number;
  perPage?: number;
}
