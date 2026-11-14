// Minimal Node typings for the tests only (no @types/node: dev dependencies are typescript and vitest only).
declare module "node:fs" {
  export function readFileSync(path: string | URL): Uint8Array<ArrayBuffer>;
  export function readFileSync(path: string | URL, encoding: "utf8"): string;
  export function existsSync(path: string | URL): boolean;
  export function writeFileSync(path: string | URL, data: string): void;
}
declare module "node:zlib" {
  export function gzipSync(data: Uint8Array): Uint8Array<ArrayBuffer>;
}
declare const process: { env: Record<string, string | undefined> };
