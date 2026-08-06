import { type ExtensionBuildConfig } from "#internal/nitro/host/build-extension.js";
/** Build inputs retained with a prepared dev host for path-scoped extension HMR. */
export interface DevelopmentWorkspaceExtension {
    readonly config: ExtensionBuildConfig;
    /** Canonical package root, with workspace links resolved. */
    readonly packageRoot: string;
    /** Non-source inputs that affect publisher output, such as tsconfig files. */
    readonly buildConfigPaths: readonly string[];
}
/**
 * Builds mounted source-backed workspace extensions before the consuming agent
 * compiles and returns the inputs needed to scope the next development rebuild.
 */
export declare function prepareDevelopmentWorkspaceExtensions(input: {
    readonly appRoot: string;
    readonly changedPaths?: readonly string[];
    readonly previousExtensions?: readonly DevelopmentWorkspaceExtension[];
}): Promise<readonly DevelopmentWorkspaceExtension[]>;
