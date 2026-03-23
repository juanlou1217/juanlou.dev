import { ReactNode } from 'react';
import type { Authors } from 'contentlayer/generated';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

import CareerTimeline from '@/components/about/CareerTimeline';
import Link from '@/components/ui/Link';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import Twemoji from '@/components/ui/Twemoji';

interface Props {
  children: ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content;

  return (
    <>
      <div className="about divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            关于
          </h1>
          <p className="text-base text-gray-500 md:text-lg md:leading-7 dark:text-gray-400">
            进一步了解我是谁以及这个博客的目的。
          </p>
        </div>

        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-8 sm:pt-28">
            <Image src={avatar || ''} alt="avatar" width={192} height={192} className="h-48 w-48 rounded-full" />

            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>

            <div className="mt-2 flex gap-3">
              <Link href={`mailto:${email}`}>
                <Mail size={24} strokeWidth={1} />
              </Link>
              <Link href={github || ''} target="_blank">
                <Github size={24} strokeWidth={1} />
              </Link>
              {/*<Link href={linkedin || ''} target="_blank">*/}
              {/*  <Linkedin size={24} strokeWidth={1} />*/}
              {/*</Link>*/}
              {/*<Link href={twitter || ''} target="_blank">*/}
              {/*  <Twitter size={24} strokeWidth={1} />*/}
              {/*</Link>*/}
            </div>

            <div className="mt-8 w-full">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold">我的职业经历</h3>
                <Button as="a" href="/static/resume.pdf" target="_blank">
                  <span>Resume</span>
                  <Twemoji emoji="page-facing-up" />
                </Button>
              </div>
              <CareerTimeline />
            </div>
          </div>

          {/* <div className="prose max-w-none pb-8 dark:prose-dark xl:col-span-2">{children}</div> */}

          <div className="prose dark:prose-dark max-w-none pb-8 xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  );
}
