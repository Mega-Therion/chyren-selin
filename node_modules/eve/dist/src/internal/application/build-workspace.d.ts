export interface ApplicationBuildWorkspace {
    readonly appRoot: string;
    readonly compiler: {
        readonly artifactsDir: string;
        readonly rootDir: string;
    };
    readonly host: {
        readonly artifactsDir: string;
    };
    readonly nitro: {
        readonly buildDir: string;
    };
    readonly publication: {
        readonly output: {
            readonly finalDir: string;
            readonly stagedDir: string;
        };
        readonly summary: {
            readonly finalPath: string;
            readonly stagedPath: string;
        };
    };
    readonly rootDir: string;
    readonly workflow: {
        readonly buildDir: string;
    };
}
/**
 * Creates the invocation-owned directory tree under `.eve/builds/<id>` that
 * one production build compiles, bundles, and stages into. Every path a
 * build touches lives here until publication renames the staged output into
 * place, so concurrent builds and a running dev server never interfere.
 */
export declare function createApplicationBuildWorkspace(appRoot: string, outputDirectory?: string): Promise<ApplicationBuildWorkspace>;
export declare function removeApplicationBuildWorkspace(workspace: ApplicationBuildWorkspace): Promise<void>;
