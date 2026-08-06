import type { Nitro } from "nitro/types";
import type { PreparedApplicationHost } from "#internal/nitro/host/types.js";
/**
 * Wires eve's package-owned app, channel, workflow inspection, dev-control,
 * and Workflow SDK endpoints into one development Nitro candidate.
 */
export declare function configureDevelopmentNitroRoutes(nitro: Nitro, preparedHost: PreparedApplicationHost): Promise<void>;
/**
 * Wires eve's package-owned app, channel, and Workflow SDK endpoints into the
 * production Nitro host.
 */
export declare function configureProductionNitroRoutes(nitro: Nitro, preparedHost: PreparedApplicationHost): Promise<void>;
