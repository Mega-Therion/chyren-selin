/**
 * Statically extracts the extension package specifier a mount file resolves to,
 * without importing the module. Discovery reads only the import that binds the
 * value the mount re-exports, so it can locate the package while honoring the
 * "never import authored modules" invariant.
 *
 * Supported mount forms:
 * - `export { default } from "@acme/crm";`
 * - `import { crm } from "@acme/crm"; export default crm({ ... });`
 * - `import crm from "@acme/crm"; export default crm();`
 *
 * Returns the specifier string, or `null` when the file does not match a
 * recognized mount shape.
 */
export declare function parseExtensionMountSpecifier(source: string): string | null;
