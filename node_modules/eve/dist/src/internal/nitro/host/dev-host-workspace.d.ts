export interface DevelopmentHostWorkspace {
    readonly artifactsDir: string;
    readonly compilerArtifactsDir: string;
    readonly nitroBuildDir: string;
    readonly nitroOutputDir: string;
    readonly rootDir: string;
    readonly workflowBuildDir: string;
}
export declare function createDevelopmentHostWorkspace(appRoot: string): Promise<DevelopmentHostWorkspace>;
export declare function removeDevelopmentHostWorkspace(workspace: DevelopmentHostWorkspace): Promise<void>;
