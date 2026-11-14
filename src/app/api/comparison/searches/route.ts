import { comparisonProxy } from '@/lib/comparison/proxy';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const POST = (request: Request) => comparisonProxy(request, 'searches');
