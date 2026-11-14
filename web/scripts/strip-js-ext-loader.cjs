// Turbopack loader for ../packages/*/src: the packages import siblings TypeScript-ESM style
// ('./fits.js' for fits.ts), which Turbopack does not map to .ts. Dropping the .js from relative
// import specifiers lets the normal extension lookup find the .ts file. tsc and vitest need nothing.
module.exports = function stripJsExt(source) {
  return source.replace(/((?:\bfrom|\bimport)\s*\(?\s*)(['"])(\.\.?\/[^'"\n]+)\.js\2/g, '$1$2$3$2');
};
