import type { NextRequest } from 'next/server';

import type { Stats, StatsMetric, StatsType } from '@/types/prisma';
import { STATS_METRICS, StatsTypeEnum } from '@/types/prisma';

import prisma from '@/lib/services/prisma';

const getBlogStats = async (slug: string, type: StatsType): Promise<Stats> => {
  return prisma.stats.upsert({
    where: {
      type_slug: { slug, type },
    },
    update: {},
    create: { type, slug },
  });
};

const MAX_INCREMENT_BY_METRIC: Record<StatsMetric, number> = {
  views: 1,
  loves: 5,
  applauses: 5,
  ideas: 5,
  bullseye: 5,
};

function isStatsMetric(metric: unknown): metric is StatsMetric {
  return typeof metric === 'string' && STATS_METRICS.includes(metric as StatsMetric);
}

function isStatsType(type: unknown): type is StatsType {
  return typeof type === 'string' && Object.values(StatsTypeEnum).includes(type as StatsType);
}

function normalizeIncrement(metric: StatsMetric, count: unknown) {
  const parsed = typeof count === 'number' ? count : 1;
  const safeCount = Number.isFinite(parsed) ? Math.trunc(parsed) : 1;
  return Math.min(Math.max(safeCount, 1), MAX_INCREMENT_BY_METRIC[metric]);
}

const updateBlogStats = async (type: StatsType, slug: string, metric: StatsMetric, count: number): Promise<Stats> => {
  return prisma.stats.upsert({
    where: {
      type_slug: { slug, type },
    },
    update: {
      [metric]: { increment: count },
    },
    create: {
      type,
      slug,
      [metric]: count,
    },
  });
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams: params } = new URL(request.url);

    const slug = params.get('slug');
    const type = params.get('type');

    if (!slug || !isStatsType(type)) {
      return new Response(JSON.stringify({ message: 'Missing or invalid `type` or `slug` parameter!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await getBlogStats(slug, type);

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json({ message: 'Internal Server Error!' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: unknown = await request.json();

    const { slug, type, metric, count } =
      typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {};

    if (typeof slug !== 'string' || !slug || !isStatsType(type) || !isStatsMetric(metric)) {
      return Response.json({ message: 'Missing or invalid `type`, `slug`, or `metric` parameter!' }, { status: 400 });
    }

    const updated = await updateBlogStats(type, slug, metric, normalizeIncrement(metric, count));

    return Response.json(updated);
  } catch (error) {
    console.error(error);

    return Response.json({ message: 'Internal Server Error!' }, { status: 500 });
  }
}
