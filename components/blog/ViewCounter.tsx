/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef } from 'react';

import { useBlogStats, useUpdateBlogStats } from 'hooks';

import type { ViewCounterProps } from '@/types/components';

const ViewCounter = ({ type, slug, className }: ViewCounterProps) => {
  const [stats, isLoading] = useBlogStats(type, slug);
  const updateView = useUpdateBlogStats();
  const viewedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const currentKey = `${type}/${slug}`;

    if (!isLoading && stats && viewedKeyRef.current !== currentKey) {
      viewedKeyRef.current = currentKey;
      void updateView({ type, slug, metric: 'views' }).catch(() => {
        viewedKeyRef.current = null;
      });
    }
  }, [stats, isLoading]);

  return (
    <span className={className} suppressHydrationWarning>
      {stats['views'] > 0 ? stats['views'].toLocaleString() : '---'} views
    </span>
  );
};

export default ViewCounter;
