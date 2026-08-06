import type { ProductionServerHandle } from "#internal/nitro/host/types.js";
/**
 * Starts a built Nitro server for an eve application.
 */
export declare function startProductionServer(rootDir: string, options?: {
    host?: string;
    port?: number;
}): Promise<ProductionServerHandle>;
