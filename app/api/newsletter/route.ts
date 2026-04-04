export const dynamic = 'force-static';

const DISABLED_MESSAGE = {
  message: 'Newsletter subscription is not enabled for this site yet.',
};

export async function GET() {
  return Response.json(DISABLED_MESSAGE, { status: 501 });
}

export async function POST() {
  return Response.json(DISABLED_MESSAGE, { status: 501 });
}
