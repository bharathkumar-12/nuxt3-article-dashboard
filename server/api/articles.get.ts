import { DEMO_ARTICLES } from '~/server/utils/articles.data';

export default defineEventHandler(() => {
  return DEMO_ARTICLES;
});
