import { applyNoProjectConfiguration } from "./shared.js";
export declare const npmPackageManager: {
    kind: "npm";
    scaffoldFiles: {};
    applyProjectConfiguration: typeof applyNoProjectConfiguration;
    devArguments: () => string[];
    installArguments: (options: import("./types.js").PackageManagerInstallOptions) => string[];
    prepareArguments: (_projectRoot: string, args: readonly string[]) => readonly string[];
    resolveInvocation: (args: readonly string[]) => import("./types.js").PackageManagerInvocation;
};
