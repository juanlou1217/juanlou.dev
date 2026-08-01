import 'css/prism.css';
import 'katex/dist/katex.css';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import type { Authors, Blog } from 'contentlayer/generated';
import { allBlogs, allAuthors } from 'contentlayer/generated';
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer';

import components from '@/components/ui/MDXComponents';
import JsonLd from '@/components/seo/JsonLd';
import siteMetadata from '@/data/siteMetadata';
import { getEssayBlogs, getPublishedBlogs, isEssayBlog } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';
import { getBlogBreadcrumbJsonLd, getBlogPostingJsonLd } from '@/lib/structured-data';
import { EssayLayout, PostSimple, PostLayout, PostBanner } from 'layouts';

const defaultLayout = 'PostLayout';
const layouts = {
  EssayLayout,
  PostSimple,
  PostLayout,
  PostBanner,
};

const OG_LOCALE = siteMetadata.locale.replace('-', '_');

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata | undefined> {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));
  const post = getPublishedBlogs().find((p) => p.slug === slug);
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  const authors = authorDetails.map((author) => author.name);
  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images;
  }
  const canonicalUrl = absoluteUrl(`/${post.path}`);
  const ogImages = imageList.map((img) => ({ url: absoluteUrl(String(img)), alt: post.title }));

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: authorDetails.map((author) => ({ name: author.name, url: `${siteMetadata.siteUrl}/about` })),
    keywords: post.tags,
    category: post.category,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: OG_LOCALE,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: canonicalUrl,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: ogImages,
    },
  };
}

export const generateStaticParams = async () => {
  return getPublishedBlogs().map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }));
};

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));
  const publishedBlogs = getPublishedBlogs();
  const post = publishedBlogs.find((p) => p.slug === slug) as Blog;
  if (!post) {
    return notFound();
  }

  const siblingBlogs = isEssayBlog(post) ? getEssayBlogs() : publishedBlogs;
  const sortedCoreContents = allCoreContent(sortPosts(siblingBlogs));
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Authors);
  });
  const mainContent = coreContent(post);
  const articleJsonLd = getBlogPostingJsonLd(post, authorDetails);
  const breadcrumbJsonLd = getBlogBreadcrumbJsonLd(post);

  const layoutKey = isEssayBlog(post) ? 'EssayLayout' : post.layout || defaultLayout;
  const Layout = layouts[layoutKey];

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  );
}
