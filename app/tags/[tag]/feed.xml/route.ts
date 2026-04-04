import { createTagFeed, xmlResponse } from '@/lib/rss';
import { getPublishedBlogs } from '@/lib/content';

export async function GET(_: Request, { params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const xml = createTagFeed(getPublishedBlogs(), tag);

  if (!xml) {
    return new Response('Tag RSS feed is unavailable', { status: 404 });
  }

  return xmlResponse(xml);
}
