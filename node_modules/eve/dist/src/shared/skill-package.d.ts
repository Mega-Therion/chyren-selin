import { Buffer } from "node:buffer";
import type { SandboxSession } from "#shared/sandbox-session.js";
import type { NamedSkillDefinition } from "#shared/skill-definition.js";
export interface NormalizedSkillPackageFile {
    readonly content: Buffer;
    readonly relativePath: string;
}
export interface MaterializableSkillPackage {
    readonly description: string;
    readonly files: readonly NormalizedSkillPackageFile[];
    readonly license?: string;
    readonly markdown: string;
    readonly metadata?: Readonly<Record<string, string>>;
    readonly name: string;
}
/**
 * Normalizes one named skill package into the concrete files eve writes to
 * workspace resources or the live sandbox.
 */
export declare function normalizeSkillPackage(input: NamedSkillDefinition): MaterializableSkillPackage;
/**
 * Writes a normalized package under a compiled workspace resource node root.
 *
 * For a `rootPath` of `.eve/compile/workspace-resources/__root__` and a skill
 * named `research`, files land under `skills/research/`.
 */
export declare function writeSkillPackageDirectory(input: {
    readonly rootPath: string;
    readonly skill: MaterializableSkillPackage;
}): Promise<void>;
/**
 * Writes a normalized package into the live sandbox under
 * the sandbox skill root.
 */
export declare function writeSkillPackageToSandbox(input: {
    readonly sandbox: SandboxSession;
    readonly skill: MaterializableSkillPackage;
}): Promise<void>;
/**
 * Removes a skill package from the live sandbox.
 */
export declare function removeSkillPackageFromSandbox(input: {
    readonly sandbox: SandboxSession;
    readonly name: string;
}): Promise<void>;
/**
 * Validates a runtime-contributed skill name before it becomes one path
 * segment under the sandbox skill root.
 */
export declare function assertSafeSkillPackageName(name: string): void;
