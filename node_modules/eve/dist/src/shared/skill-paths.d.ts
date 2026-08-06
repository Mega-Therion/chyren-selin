import type { SandboxSession } from "#shared/sandbox-session.js";
export declare const MODEL_SKILL_ROOT = "$HOME/.agents/skills";
export declare const FALLBACK_SKILL_ROOT = "/workspace/skills";
export declare function formatSkillModelPath(input: {
    readonly name: string;
    readonly relativePath: string;
}): string;
export declare function formatFallbackSkillPath(input: {
    readonly name: string;
    readonly relativePath: string;
}): string;
/**
 * Resolves where skills live in the sandbox: under the probed home when it has
 * one, and under {@link FALLBACK_SKILL_ROOT} when it does not.
 */
export declare function resolveSandboxSkillRoot(input: {
    readonly sandbox: SandboxSession;
}): Promise<string>;
/**
 * Resolves a leading `$HOME` in a model-supplied sandbox path without
 * evaluating any other shell syntax. Skill paths retain their documented
 * `/workspace/skills` fallback when the sandbox does not expose a usable
 * home directory.
 */
export declare function resolveSandboxModelPath(input: {
    readonly path: string;
    readonly sandbox: SandboxSession;
}): Promise<string>;
export declare function resolveSandboxSkillReadPaths(input: {
    readonly name: string;
    readonly relativePath: string;
    readonly sandbox: SandboxSession;
}): Promise<readonly string[]>;
export declare function resolveSandboxSkillWritePath(input: {
    readonly name: string;
    readonly relativePath: string;
    readonly sandbox: SandboxSession;
}): Promise<string>;
