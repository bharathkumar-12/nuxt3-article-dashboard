export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  const article = DEMO_ARTICLES.find((a) => a.id === id);

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' });
  }

  const related = DEMO_ARTICLES.filter((a) => a.id !== id).slice(0, 3);

  return { article, related };
});
