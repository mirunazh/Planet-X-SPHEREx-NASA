import { Suspense } from 'react';
import { ComparisonInventory } from '@/components/comparison/ComparisonInventory';
import { WeeklyChallenge } from '@/components/comparison/WeeklyChallenge';

export const metadata = { title: 'Compare images · SPHEREx Sky Navigator' };

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ challenge?: string }> }) {
  const { challenge } = await searchParams;
  if (challenge === 'weekly') return <WeeklyChallenge />;
  return <Suspense fallback={<div className="boot">Opening image inventory…</div>}><ComparisonInventory /></Suspense>;
}
