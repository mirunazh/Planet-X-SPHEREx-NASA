// Minimal Node typings for the tests only (no @types/node: dev dependencies are typescript and vitest only).
declare module "node:fs" {
  export function readFileSync(path: string | URL): Uint8Array;
  export function readFileSync(path: string | URL, encoding: "utf8"): string;
  export function existsSync(path: string | URL): boolean;
}
declare const process: { env: Record<string, string | undefined>; memoryUsage(): { rss: number; heapUsed: number } };
declare module 'node:url' {
  export function fileURLToPath(url: string | URL): string;
}
