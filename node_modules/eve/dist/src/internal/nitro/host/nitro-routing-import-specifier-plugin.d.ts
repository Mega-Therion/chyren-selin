import type { Nitro } from "nitro/types";
/**
 * Patches Nitro's generated routing modules before Rollup/Rolldown resolves
 * their imports so raw Windows drive-letter paths become valid file URLs.
 */
export declare function addNitroRoutingImportSpecifierPlugin(nitro: Nitro): void;
