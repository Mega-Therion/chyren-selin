import type { AgentSourceManifest } from "#discover/manifest.js";
import { type AgentModelSetting, type AgentModelSettingsPatch } from "#source-change/apply-agent-model-settings.js";
/**
 * Outcome of a static source change, returned to upstream callers (CLI, web
 * setup UI) so they can render success or route the bail to a guided fix.
 */
export type ApplyResult = {
    readonly kind: "applied";
    readonly from: string;
    readonly to: string;
} | {
    readonly kind: "bail";
    readonly reason: string;
    readonly at: {
        readonly logicalPath: string;
        readonly line: number;
    };
};
export type ApplyModelSettingsResult = {
    readonly kind: "applied";
    readonly changed: readonly AgentModelSetting[];
} | {
    readonly kind: "bail";
    readonly reason: string;
    readonly at: {
        readonly logicalPath: string;
        readonly line: number;
    };
};
/**
 * Central, flat API for applying targeted edits to an agent's authored source.
 *
 * Built from a discovery manifest, which already carries every resource's
 * `ModuleSourceRef`, so each operation can locate the file it edits without
 * recompiling. Consumers depend only on this interface.
 */
export interface StaticSourceChange {
    /**
     * Rewrites the agent's `model` in `agent.ts` in place. Bails (no write) when
     * the value isn't a string literal; the bail carries the source location so
     * the caller can offer a manual fix.
     */
    updateModelName(modelName: string): Promise<ApplyResult>;
    /** Applies the `/model` draft in one source transform and one atomic rename. */
    updateModelSettings(patch: AgentModelSettingsPatch): Promise<ApplyModelSettingsResult>;
}
/**
 * Creates the {@link StaticSourceChange} surface bound to one discovered agent.
 */
export declare function createStaticSourceChange(manifest: AgentSourceManifest): StaticSourceChange;
