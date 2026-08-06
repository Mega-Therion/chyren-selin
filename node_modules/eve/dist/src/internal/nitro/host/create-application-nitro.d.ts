import type { Nitro } from "nitro/types";
import type { PreparedApplicationHost, PreparedDevelopmentApplicationHost } from "#internal/nitro/host/types.js";
/**
 * Hosted Vercel builds can prune local sandbox backends only when the
 * app did not explicitly configure one. Omitted backends resolve through
 * `defaultSandbox()`, which selects Vercel on hosted Vercel and never
 * needs local runtime code there.
 */
export declare function shouldPruneLocalSandboxBackends(input: {
    readonly configuredBackendNames: ReadonlySet<string>;
    readonly preset: "vercel" | undefined;
}): boolean;
/**
 * Creates one isolated Nitro host candidate for `eve dev`.
 */
export declare function createDevelopmentApplicationNitro(preparedHost: PreparedDevelopmentApplicationHost): Promise<Nitro>;
interface ProductionApplicationNitroOptions {
    readonly buildDir: string;
    readonly outputDir: string;
    /**
     * Agent's resolved public route prefix, baked into the Vercel flow
     * function's environment for callback-URL minting behind a per-agent mount.
     */
    readonly publicRoutePrefix?: string;
}
/**
 * Creates a build-mode Nitro host for one production build. Every route group
 * (application, workflow, schedules) is registered in the same host; on Vercel
 * the workflow flow route additionally becomes its own queue-triggered function
 * through the preset's `functionRules`. `buildDir`/`outputDir` place all
 * bundler state inside the invocation-owned build workspace.
 */
export declare function createProductionApplicationNitro(preparedHost: PreparedApplicationHost, options: ProductionApplicationNitroOptions): Promise<Nitro>;
export {};
