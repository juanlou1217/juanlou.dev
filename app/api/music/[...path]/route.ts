import { musicResponse } from '@/lib/services/music';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return musicResponse(request, (await params).path);
}
export const HEAD = GET;
