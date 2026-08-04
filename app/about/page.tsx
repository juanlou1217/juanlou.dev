import { genPageMetadata } from '@/lib/seo';
import { Authors, allAuthors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import { MDXLayoutRenderer } from 'pliny/mdx-components';

import AuthorLayout from '@/layouts/AuthorLayout';
import JsonLd from '@/components/seo/JsonLd';
import { getProfilePageJsonLd } from '@/lib/structured-data';

export const metadata = genPageMetadata({
  title: '关于赵康（卷娄）',
  description: '了解 Juanlou（卷娄）的作者赵康：一名关注 AI Agent、前端工程、真实项目与个人成长的软件工程师。',
  path: '/about',
});

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors;
  const mainContent = coreContent(author);

  return (
    <>
      <JsonLd data={getProfilePageJsonLd()} />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  );
}
