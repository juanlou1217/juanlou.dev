'use client';

import { useEffect, useState } from 'react';
import { Clock, Github, MapPin, Star } from 'lucide-react';
import useSWR from 'swr';

import SITE_METADATA from '@/data/siteMetadata';
import GrowingUnderline from '@/components/ui/GrowingUnderline';
import Link from '@/components/ui/Link';
import Twemoji from '@/components/ui/Twemoji';
import type { GithubRepository } from '@/types/index';
import { fetcher } from '@/lib/utils';

const TIME_IS = 'https://time.is/Hangzhou';
const MY_TIMEZONE = 'Asia/Shanghai';
const MY_TIMEZONE_OFFSET = 8 * -60; // UTC+8

function getTime() {
  const date = new Date();
  const visitorTimezoneOffset = date.getTimezoneOffset();
  const hoursDiff = (visitorTimezoneOffset - MY_TIMEZONE_OFFSET) / 60;
  const diff = hoursDiff === 0 ? '相同时间' : hoursDiff > 0 ? `快 ${hoursDiff} 小时` : `慢 ${hoursDiff * -1} 小时`;

  const time = new Intl.DateTimeFormat('zh-CN', {
    timeZone: MY_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  return { time, diff };
}

const FooterMeta: React.FC = () => {
  const [timeInfo, setTimeInfo] = useState<{ time: string; diff: string } | null>(null);

  const siteRepo = SITE_METADATA.siteRepo.replace('https://github.com/', '');
  const repoName = siteRepo.split('/')[1];

  const { data: repo } = useSWR<GithubRepository>(`/api/github?repo=${siteRepo}`, fetcher);

  useEffect(() => {
    const updateTime = () => setTimeInfo(getTime());

    updateTime();

    const intervalId = window.setInterval(updateTime, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="space-y-2 py-1.5 text-gray-800 dark:text-gray-200">
      <div className="flex items-center gap-1 font-medium">
        <Github className="h-5 w-5" />
        <Link href={SITE_METADATA.siteRepo} className="ml-1">
          <GrowingUnderline data-umami-event="view-repo">{repoName}</GrowingUnderline>
        </Link>
        <span>-</span>
        <span className="inline-flex items-center text-gray-500 dark:text-gray-400">
          <Star className="mr-1 h-4 w-4" />
          {repo ? <span>{repo.stargazerCount}</span> : '---'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        <span className="font-medium">
          中国杭州 <Twemoji emoji="flag-china" className="h-4.5!" />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        <Link href={TIME_IS}>
          <GrowingUnderline className="font-medium" data-umami-event="footer-time">
            {timeInfo ? (
              <>
                {timeInfo.time} <span className="text-gray-500 dark:text-gray-400">- {timeInfo.diff}</span>
              </>
            ) : (
              <>
                --:-- <span className="text-gray-500 dark:text-gray-400">- 加载中</span>
              </>
            )}
          </GrowingUnderline>
        </Link>
      </div>
    </div>
  );
};

export default FooterMeta;
