import type { ApplicationBuildOptions } from "#internal/nitro/host/types.js";
type VercelServiceOutput = NonNullable<ApplicationBuildOptions["vercelServiceOutput"]>;
export declare function resolveInternalVercelServiceOutput(appRoot: string): VercelServiceOutput | undefined;
export {};
