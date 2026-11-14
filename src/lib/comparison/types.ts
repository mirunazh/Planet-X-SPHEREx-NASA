export const MISSIONS = ['spherex'] as const;
export type Mission = typeof MISSIONS[number];
export const MISSION_NAMES: Record<Mission, string> = { spherex: 'SPHEREx' };

export interface ImageProduct {
  id: string;
  mission: Mission;
  collection: string;
  title: string;
  band: string | null;
  wavelengthMin: number | null;
  wavelengthMax: number | null;
  observedStart: string | null;
  observedEnd: string | null;
  kind: 'individual' | 'combined' | 'unknown';
  coverage: string;
  footprint: string | null;
  sourceUrl: string;
  accessUrl: string;
}

export interface InventoryPage {
  products: ImageProduct[];
  nextCursor: string | null;
  total: number;
  status: 'complete' | 'empty' | 'partial' | 'error';
  truncated: boolean;
  warnings: string[];
  retrievedAt: string;
  verifiedAt?: string | null;
  stale?: boolean;
}

/** Validate the internal service boundary before the UI reads product metadata. */
export function isInventoryPage(value: unknown): value is InventoryPage {
  if (!value || typeof value !== 'object') return false;
  const page = value as Record<string, unknown>;
  const nullableString = (value: unknown) => value === null || typeof value === 'string';
  const nullableNumber = (value: unknown) => value === null || typeof value === 'number' && Number.isFinite(value);
  return Array.isArray(page.products) && page.products.every((value: unknown) => {
    if (!value || typeof value !== 'object') return false;
    const product = value as Record<string, unknown>;
    return ['id', 'collection', 'title', 'coverage', 'sourceUrl', 'accessUrl'].every((key) => typeof product[key] === 'string')
      && MISSIONS.includes(product.mission as Mission)
      && ['individual', 'combined', 'unknown'].includes(product.kind as string)
      && ['band', 'observedStart', 'observedEnd', 'footprint'].every((key) => nullableString(product[key]))
      && ['wavelengthMin', 'wavelengthMax'].every((key) => nullableNumber(product[key]));
  }) && typeof page.total === 'number' && Number.isSafeInteger(page.total) && page.total >= page.products.length
    && ['complete', 'empty', 'partial', 'error'].includes(page.status as string)
    && typeof page.truncated === 'boolean' && nullableString(page.nextCursor)
    && typeof page.retrievedAt === 'string'
    && (page.verifiedAt === undefined || nullableString(page.verifiedAt))
    && (page.stale === undefined || typeof page.stale === 'boolean')
    && Array.isArray(page.warnings) && page.warnings.every((value) => typeof value === 'string');
}

export interface CollectionProgress {
  name: string;
  state: 'queued' | 'running' | 'retrying' | 'complete' | 'partial' | 'error' | 'suspended' | 'interrupted';
  attempts: number;
  error: string | null;
  verifiedAt: string | null;
  endpoint: string;
  resultCount?: number;
  truncated?: boolean;
}

export interface SearchProgress {
  id: string;
  state: 'queued' | 'running' | 'finished' | 'timed_out' | 'interrupted';
  status: InventoryPage['status'];
  collections: CollectionProgress[];
  updatedAt: string;
  verifiedAt: string | null;
  stale: boolean;
  version: string | null;
  total: number;
  truncated: boolean;
  queueMs: number | null;
}

export function isSearchProgress(value: unknown): value is SearchProgress {
  if (!value || typeof value !== 'object') return false;
  const job = value as Record<string, unknown>;
  return typeof job.id === 'string' && /^[\w-]{1,100}$/.test(job.id)
    && ['queued', 'running', 'finished', 'timed_out', 'interrupted'].includes(job.state as string)
    && ['complete', 'empty', 'partial', 'error'].includes(job.status as string)
    && typeof job.updatedAt === 'string' && (job.verifiedAt === null || typeof job.verifiedAt === 'string')
    && typeof job.stale === 'boolean' && typeof job.truncated === 'boolean'
    && (job.version === null || typeof job.version === 'string' && /^[\w-]{1,100}$/.test(job.version))
    && typeof job.total === 'number' && Number.isSafeInteger(job.total) && job.total >= 0
    && (job.queueMs === null || typeof job.queueMs === 'number' && Number.isFinite(job.queueMs))
    && Array.isArray(job.collections) && job.collections.every((value: unknown) => {
      if (!value || typeof value !== 'object') return false;
      const c = value as Record<string, unknown>;
      return typeof c.name === 'string' && typeof c.endpoint === 'string'
        && ['queued', 'running', 'retrying', 'complete', 'partial', 'error', 'suspended', 'interrupted'].includes(c.state as string)
        && typeof c.attempts === 'number' && Number.isSafeInteger(c.attempts) && c.attempts >= 0
        && (c.error === null || typeof c.error === 'string')
        && (c.verifiedAt === null || typeof c.verifiedAt === 'string');
    });
}

export interface PreviewProgress {
  id: string;
  state: 'queued' | 'downloading' | 'rendering' | 'ready' | 'error';
  error: string | null;
  width?: number;
  height?: number;
  coverageFraction?: number;
}

export function isPreviewProgress(value: unknown): value is PreviewProgress {
  if (!value || typeof value !== 'object') return false;
  const preview = value as Record<string, unknown>;
  return typeof preview.id === 'string' && /^[a-f0-9]{64}$/.test(preview.id)
    && ['queued', 'downloading', 'rendering', 'ready', 'error'].includes(preview.state as string)
    && (preview.error === null || typeof preview.error === 'string')
    && (preview.state !== 'ready' || typeof preview.width === 'number' && typeof preview.height === 'number'
      && Number.isSafeInteger(preview.width) && Number.isSafeInteger(preview.height) && preview.width > 0 && preview.height > 0
      && typeof preview.coverageFraction === 'number' && preview.coverageFraction >= 0 && preview.coverageFraction <= 1);
}
