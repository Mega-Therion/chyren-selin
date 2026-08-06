import { BlockList } from "node:net";
/**
 * Parsed runtime-owned IP allowlist.
 */
export interface RuntimeIpAllowList {
    readonly blockList: BlockList;
    readonly entries: readonly string[];
}
/**
 * Parses exact IP and CIDR entries into a reusable runtime-owned allowlist.
 */
export declare function createRuntimeIpAllowList(entries: readonly string[]): RuntimeIpAllowList;
/**
 * Returns whether the normalized request IP matches at least one allowlist
 * entry.
 */
export declare function isRuntimeIpAllowed(address: string, allowList: RuntimeIpAllowList): boolean;
