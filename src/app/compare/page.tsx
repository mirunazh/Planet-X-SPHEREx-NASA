import { Suspense } from 'react';
import { ComparisonInventory } from '@/components/comparison/ComparisonInventory';

export const metadata = { title: 'Compare images · SPHEREx Sky Navigator' };

export default function ComparePage() {
  return <Suspense fallback={<div className="boot">Opening image inventory…</div>}><ComparisonInventory /></Suspense>;
}
