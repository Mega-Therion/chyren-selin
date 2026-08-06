import { applyNoProjectConfiguration } from "./shared.js";
export declare const yarnPackageManager: {
    kind: "yarn";
    scaffoldFiles: {};
    applyProjectConfiguration: typeof applyNoProjectConfiguration;
    devArguments: () => string[];
    installArguments: () => string[];
    prepareArguments: (_projectRoot: string, args: readonly string[]) => readonly string[];
    resolveInvocation: (args: readonly string[]) => import("./types.js").PackageManagerInvocation;
};
