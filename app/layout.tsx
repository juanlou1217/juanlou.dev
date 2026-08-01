import 'css/tailwind.css';
import 'css/twemoji.css';
import 'pliny/search/algolia.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'remark-github-blockquote-alert/alert.css';

import { Metadata } from 'next';
import { SearchProvider, SearchConfig } from 'pliny/search';
// import { Analytics, AnalyticsConfig } from 'pliny/analytics';

import Header from '@/components/header/Header';
import Footer from '@/components/footer';
import siteMetadata from '@/data/siteMetadata';
import SectionContainer from '@/components/ui/SectionContainer';
import TiltedGridBackground from '@/components/ui/TiltedGridBackground';

import { ThemeProviders } from '@/providers/theme-providers';
import { UmamiAnalytics } from '@/components/analytics/umami';

const OG_LOCALE = siteMetadata.locale.replace('-', '_');
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  applicationName: siteMetadata.brandName,
  title: {
    default: `${siteMetadata.brandName}｜赵康的技术、AI 与成长博客`,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.fullName, url: `${siteMetadata.siteUrl}/about` }],
  creator: siteMetadata.fullName,
  publisher: siteMetadata.fullName,
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  openGraph: {
    title: `${siteMetadata.brandName}｜赵康的技术、AI 与成长博客`,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [{ url: siteMetadata.socialBanner, alt: siteMetadata.brandName }],
    locale: OG_LOCALE,
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: `${siteMetadata.brandName}｜赵康的技术、AI 与成长博客`,
    description: siteMetadata.description,
    card: 'summary_large_image',
    images: [{ url: siteMetadata.socialBanner, alt: siteMetadata.brandName }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || '';

  return (
    <html lang={siteMetadata.language} className="scroll-smooth" suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="76x76" href={`${basePath}/static/favicons/tennis-racquet.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/tennis-racquet.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/tennis-racquet.png" />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <body
        className="dark:bg-dark bg-white pl-[calc(100vw-100%)] text-black antialiased dark:text-white"
        suppressHydrationWarning
      >
        <TiltedGridBackground className="inset-x-0 top-0 z-[-1] h-[60vh]" />

        <ThemeProviders>
          {/* <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} /> */}
          <UmamiAnalytics websiteId={siteMetadata.analytics?.umamiAnalytics?.umamiWebsiteId} />
          <SectionContainer>
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main className="mt-20 mb-auto">{children}</main>
              <Footer />
            </SearchProvider>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  );
}
