import { type NodeEngineOverride } from "../../node-engine.js";
export interface PackageJsonPatch {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    overrides?: Record<string, string>;
    resolutions?: Record<string, string>;
    scripts?: Record<string, string>;
    /**
     * eve's required Node.js range (e.g. `">=24"`). When the target's
     * `engines.node` is absent or is not confined to the scaffolded major, it is
     * set to that pinned major (e.g. `"24.x"`). Existing ranges within the same
     * major are left untouched.
     */
    nodeEngineRequirement?: string;
}
export interface PackageJsonPatchResult {
    changed: boolean;
    nodeEngineOverride?: NodeEngineOverride;
}
export declare function patchPackageJson(path: string, patch: PackageJsonPatch): Promise<PackageJsonPatchResult>;
