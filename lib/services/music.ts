import 'server-only';

// This internal gateway owns credentials and validates the fixed collection again.
// No visitor cookie, authorization header, URL or query parameter is forwarded.
const gateway = process.env.MUSIC_GATEWAY_URL || 'http://blog-music:3100';
const errors = new Set([
  'CREDENTIALS_EXPIRED',
  'NOT_CONFIGURED',
  'UNPLAYABLE',
  'TRACK_NOT_IN_COLLECTION',
  'RATE_LIMITED',
  'INVALID_RANGE',
]);
export async function musicResponse(request: Request, path: string[]) {
  const joined = path.join('/');
  const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
  const error = (status: number, code: string) => Response.json({ code }, { status, headers });
  if (new URL(request.url).search || !/^(collection|tracks\/[A-Za-z0-9]{1,32}\/(play|audio))$/.test(joined))
    return error(404, 'NOT_FOUND');
  const range = request.headers.get('range');
  if (range && !/^bytes=\d*-\d*$/.test(range)) return error(416, 'INVALID_RANGE');
  try {
    const upstream = await fetch(`${gateway}/${joined}`, {
      method: request.method,
      headers: range && joined.endsWith('/audio') ? { Range: range } : {},
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(125000)]),
    });
    if (!upstream.ok) {
      const body = await upstream.json().catch(() => ({}));
      return error(
        [404, 416, 422, 429, 503].includes(upstream.status) ? upstream.status : 502,
        errors.has(body.code) ? body.code : 'UPSTREAM_UNAVAILABLE'
      );
    }
    const responseHeaders = new Headers(headers);
    for (const name of ['content-type', 'content-length', 'content-range', 'accept-ranges']) {
      const value = upstream.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch {
    return error(503, 'UPSTREAM_UNAVAILABLE');
  }
}
