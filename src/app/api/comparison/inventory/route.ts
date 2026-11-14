import { comparisonProxy } from '@/lib/comparison/proxy';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const GET = (request: Request) => comparisonProxy(request, 'inventory');
