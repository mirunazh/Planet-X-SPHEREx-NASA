import { comparisonProxy } from '@/lib/comparison/proxy';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return comparisonProxy(request, `challenge/previews/${id}/image`);
}
