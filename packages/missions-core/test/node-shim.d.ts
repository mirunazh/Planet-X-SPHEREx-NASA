// Minimal ambient types for the two Node built-ins the tests use (no @types/node allowed).
declare module 'node:fs' {
  export function readFileSync(path: string): Uint8Array & { buffer: ArrayBuffer; byteOffset: number; byteLength: number };
  export function readFileSync(path: string, encoding: 'utf8'): string;
}
declare module 'node:url' {
  export function fileURLToPath(url: string | URL): string;
}
