import { comparisonProxy } from '@/lib/comparison/proxy';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return comparisonProxy(request, `previews/${id}`);
}
