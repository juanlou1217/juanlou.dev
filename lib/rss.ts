import type { Blog } from 'contentlayer/generated';
import { slug } from 'github-slugger';
import { sortPosts } from 'pliny/utils/contentlayer';

import siteMetadata from '@/data/siteMetadata';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function getPublishedPosts(posts: Blog[]) {
  return sortPosts(posts.filter((post) => !post.draft));
}

function generateRssItem(post: Blog) {
  const categories = (post.tags ?? []).map((tag) => `<category>${escapeXml(tag)}</category>`).join('');

  return `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${escapeXml(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${escapeXml(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${escapeXml(siteMetadata.author)})</author>
    ${categories}
  </item>`;
}

function generateRssDocument(posts: Blog[], selfPath: string, titleSuffix?: string) {
  const publishedPosts = getPublishedPosts(posts);

  if (publishedPosts.length === 0) {
    return null;
  }

  const title = titleSuffix ? `${siteMetadata.title} - ${titleSuffix}` : siteMetadata.title;

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteMetadata.siteUrl}/blog</link>
    <description>${escapeXml(siteMetadata.description)}</description>
    <language>${siteMetadata.language}</language>
    <managingEditor>${siteMetadata.email} (${escapeXml(siteMetadata.author)})</managingEditor>
    <webMaster>${siteMetadata.email} (${escapeXml(siteMetadata.author)})</webMaster>
    <lastBuildDate>${new Date(publishedPosts[0].date).toUTCString()}</lastBuildDate>
    <atom:link href="${siteMetadata.siteUrl}${selfPath}" rel="self" type="application/rss+xml"/>
    ${publishedPosts.map((post) => generateRssItem(post)).join('')}
  </channel>
</rss>`;
}

export function createSiteFeed(posts: Blog[]) {
  return generateRssDocument(posts, '/feed.xml');
}

export function createTagFeed(posts: Blog[], tag: string) {
  const matchingPosts = posts.filter((post) => (post.tags ?? []).some((postTag) => slug(postTag) === tag));
  return generateRssDocument(matchingPosts, `/tags/${tag}/feed.xml`, `标签 ${tag}`);
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
