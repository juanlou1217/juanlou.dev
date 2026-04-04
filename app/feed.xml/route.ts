import { createSiteFeed, xmlResponse } from '@/lib/rss';
import { getPublishedBlogs } from '@/lib/content';

export function GET() {
  const xml = createSiteFeed(getPublishedBlogs());

  if (!xml) {
    return new Response('RSS feed is unavailable', { status: 404 });
  }

  return xmlResponse(xml);
}
