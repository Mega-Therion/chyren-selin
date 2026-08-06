import type { ModelMessage } from "ai";
interface ConnectionSearchResultItem {
    readonly connection: string;
    readonly description: string;
    readonly error?: string;
    readonly inputSchema?: Record<string, unknown>;
    readonly needsAuthorization?: boolean;
    readonly outputSchema?: Record<string, unknown>;
    readonly tool?: string;
    readonly qualifiedName?: string;
}
/**
 * Extracts connection search results from conversation history.
 * Scans tool-result messages for `connection_search` results and
 * returns deduplicated tool metadata (latest result wins per qualifiedName).
 */
export declare function extractDiscoveredTools(messages: readonly ModelMessage[]): ConnectionSearchResultItem[];
declare const connectionSearchDynamicDefinition: import("../../index.ts").DynamicSentinel<Record<string, object> | null>;
export default connectionSearchDynamicDefinition;
