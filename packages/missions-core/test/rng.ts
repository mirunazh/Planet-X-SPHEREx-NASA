/** Seeded normal deviates (Park-Miller + Box-Muller) so the statistical tests are deterministic. */
export function gauss(seed: number): () => number {
  let s = (seed * 2654435761) % 2147483647 || 1;
  const u = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 20; i++) u(); // a small seed gives a tiny first u, i.e. a 4-sigma first draw
  return () => Math.sqrt(-2 * Math.log(u())) * Math.cos(2 * Math.PI * u());
}
