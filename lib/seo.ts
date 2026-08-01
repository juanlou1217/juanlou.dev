import { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface PaginationMetadataProps {
  title: string;
  description: string;
  basePath: string;
  pageNumber: number;
}

export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, siteMetadata.siteUrl).toString();
}

export function genPageMetadata({ title, description, image, path = './', ...rest }: PageSEOProps): Metadata {
  const ogLocale = siteMetadata.locale.replace('-', '_');
  const pageDescription = description || siteMetadata.description;
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image || siteMetadata.socialBanner);
  const { alternates, openGraph, twitter, ...metadataRest } = rest;

  return {
    ...metadataRest,
    title,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
      ...alternates,
    },
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: pageDescription,
      url: canonicalUrl,
      siteName: siteMetadata.title,
      images: [{ url: imageUrl, alt: title }],
      locale: ogLocale,
      type: 'website',
      ...openGraph,
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      description: pageDescription,
      card: 'summary_large_image',
      images: [{ url: imageUrl, alt: title }],
      ...twitter,
    },
  };
}

export function genPaginationMetadata({ title, description, basePath, pageNumber }: PaginationMetadataProps): Metadata {
  return genPageMetadata({
    title: `${title} · 第 ${pageNumber} 页`,
    description: `${description} 当前是第 ${pageNumber} 页。`,
    path: `${basePath}/page/${pageNumber}`,
  });
}
