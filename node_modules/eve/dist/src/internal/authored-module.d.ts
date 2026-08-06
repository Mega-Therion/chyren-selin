import type { ModuleDefinitionExport } from "#public/definitions/source.js";
import type { ModuleSourceRef } from "#shared/source-ref.js";
import type { AgentModelOptionsDefinition } from "#shared/agent-definition.js";
/**
 * Returns the selected authored module export from one namespace.
 */
export declare function getAuthoredModuleExport(moduleNamespace: Record<string, unknown>, source: ModuleSourceRef | {
    readonly exportName?: string;
    readonly logicalPath: string;
}): unknown;
/**
 * Materializes one authored module export that may be a definition factory.
 */
export declare function materializeAuthoredModuleExport<TDefinition>(exportValue: ModuleDefinitionExport<TDefinition>): Promise<TDefinition>;
/**
 * Returns the value as a plain object or throws.
 */
export declare function expectObjectRecord(value: unknown, message: string): Record<string, unknown>;
/**
 * Returns the value as a string or throws.
 */
export declare function expectString(value: unknown, message: string): string;
/**
 * Returns the value as a boolean or throws.
 */
export declare function expectBoolean(value: unknown, message: string): boolean;
/**
 * Returns one positive integer or throws.
 */
export declare function expectPositiveInteger(value: unknown, message: string): number;
/**
 * Returns the value as a function or throws.
 */
export declare function expectFunction<TFunction extends (...args: never[]) => unknown>(value: unknown, message: string): TFunction;
/**
 * Returns the value as a provider options object or throws.
 */
export declare function expectProviderOptions(value: unknown, message: string): Required<AgentModelOptionsDefinition>["providerOptions"];
/**
 * Rejects unexpected keys on one plain object.
 */
export declare function expectOnlyKnownKeys(record: Record<string, unknown>, knownKeys: readonly string[], message: string): void;
/**
 * Returns one optional string-record property when present.
 */
export declare function getOptionalStringRecordProperty(record: Record<string, unknown>, key: string, message: string): Record<string, string> | undefined;
