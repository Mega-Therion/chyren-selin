export type WorkflowManifest = {
    steps?: {
        [relativeFileName: string]: {
            [functionName: string]: {
                stepId: string;
            };
        };
    };
    workflows?: {
        [relativeFileName: string]: {
            [functionName: string]: {
                workflowId: string;
            };
        };
    };
    classes?: {
        [relativeFileName: string]: {
            [className: string]: {
                classId: string;
            };
        };
    };
};
export declare function applyWorkflowTransform(filename: string, source: string, mode: "workflow" | "step" | "client" | false, absolutePath?: string, projectRoot?: string, stableWorkflowNames?: ReadonlySet<string>): Promise<{
    code: string;
    workflowManifest: WorkflowManifest;
}>;
export declare function detectWorkflowPatterns(source: string): {
    hasSerde: boolean;
    hasUseStep: boolean;
    hasUseWorkflow: boolean;
};
export declare function getImportPath(filePath: string, projectRoot: string): {
    importPath: string;
    isPackage: boolean;
};
export declare function readSourceFile(path: string): Promise<string>;
