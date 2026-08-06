/** An authored Node.js engine value replaced by eve's selected scaffold major. */
export interface NodeEngineOverride {
    previous: unknown;
    next: string;
}
export type NodeEngineReconciliation = {
    kind: "added";
    next: string;
} | ({
    kind: "overridden";
} & NodeEngineOverride) | {
    kind: "unchanged";
};
/**
 * The single-major `engines.node` value a generated project should declare,
 * derived from eve's required range — e.g. `">=24"` → `"24.x"`. A scaffolded
 * app is a deployment artifact, not a library: Vercel reads `engines.node` to
 * pick the build's Node and resolves an open range to the newest *supported*
 * major, so `">=24"` would float onto a future major as Vercel widens its set,
 * whereas `"24.x"` stays on major 24 while still taking minor/patch updates.
 * eve's own package keeps the open range; only generated apps pin.
 */
export declare function pinnedNodeEngineMajor(requiredRange: string): string;
/**
 * Reconciles an authored `engines.node` value with the single Node.js major
 * selected for scaffolded eve projects. Existing ranges are preserved only
 * when every version they permit remains inside that selected major.
 */
export declare function reconcileNodeEngine(existingValue: unknown, requiredRange: string): NodeEngineReconciliation;
/** Formats the warning shown when eve replaces an incompatible Node.js engine value. */
export declare function formatNodeEngineOverrideWarning(override: NodeEngineOverride): string;
