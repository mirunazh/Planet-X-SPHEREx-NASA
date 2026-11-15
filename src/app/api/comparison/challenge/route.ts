import { comparisonProxy } from '@/lib/comparison/proxy';

export async function GET(request: Request) {
  return comparisonProxy(request, 'challenge');
}
