import type { ApplicationBuildOptions } from "#internal/nitro/host/types.js";
/**
 * Builds the production Nitro output for an eve application.
 */
export declare function buildApplication(rootDir: string, options: ApplicationBuildOptions): Promise<string>;
