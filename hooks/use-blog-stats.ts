import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { fetcher } from '@/lib/utils';

import type { Stats, StatsMetric, StatsType } from '@/types/prisma';

interface UpdateBlogStatsInput {
  type: StatsType;
  slug: string;
  metric: StatsMetric;
  count?: number;
}

export function useBlogStats(type: StatsType, slug: string) {
  const { data, isLoading } = useSWR<Stats>(`/api/stats?slug=${slug}&type=${type}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { views, loves, applauses, ideas, bullseye } = data || {};

  const stats: Stats = {
    type,
    slug,
    ideas: ideas || 0,
    views: views || 0,
    loves: loves || 0,
    applauses: applauses || 0,
    bullseye: bullseye || 0,
  };

  return [stats, isLoading];
}

export function useUpdateBlogStats() {
  const { trigger } = useSWRMutation('/api/stats', async (url: string, { arg }: { arg: UpdateBlogStatsInput }) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    });

    if (!response.ok) {
      throw new Error(`Failed to update stats: ${response.status}`);
    }

    return response.json();
  });

  return trigger;
}
