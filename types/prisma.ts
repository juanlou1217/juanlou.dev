import { $Enums, Stats as StatsClient } from '@/prisma/generated/client';

export type Stats = StatsClient;
export type StatsType = $Enums.StatsType;
export const StatsTypeEnum = $Enums.StatsType;

export const STATS_METRICS = ['views', 'loves', 'applauses', 'ideas', 'bullseye'] as const;
export type StatsMetric = (typeof STATS_METRICS)[number];
