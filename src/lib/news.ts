import { getCollection } from 'astro:content';

export const NEWS_PAGE_SIZE = 9;
export const FEATURED_NEWS_ID = 'ireland-national-cyber-security-strategy-2030';
export const newsPageUrl = (page: number) => page === 1 ? '/news/' : `/news/page/${page}/`;

export async function getNewsListing() {
  const allPosts = (await getCollection('news')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id),
  );
  const featuredPost = allPosts.find((post) => post.id === FEATURED_NEWS_ID) ?? allPosts[0];
  const posts = allPosts.filter((post) => post.id !== featuredPost?.id);
  return { featuredPost, posts, totalPages: Math.max(1, Math.ceil(posts.length / NEWS_PAGE_SIZE)) };
}
