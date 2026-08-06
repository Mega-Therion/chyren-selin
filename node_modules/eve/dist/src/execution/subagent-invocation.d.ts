import type { StepInput } from "#harness/types.js";
import { type JsonObject, type JsonValue } from "#shared/json.js";
/**
 * Narrowed form of {@link StepInput} whose `message` is always a plain string.
 * Delegated child runs receive a synthesized text-only prompt.
 */
export interface FormattedSubagentInvocation extends StepInput {
    readonly message: string;
}
/**
 * Normalizes the `outputSchema` a model passed on a subagent tool call.
 * Models routinely send an empty `{}` despite the tool schema saying to omit
 * it; an empty JSON Schema constrains nothing, but honoring it flips the
 * child into structured-output mode and discards its text reply. Only a
 * non-empty object counts as a requested schema — local and remote dispatch
 * share this rule.
 */
export declare function normalizeRequestedOutputSchema(outputSchema: JsonValue | undefined): JsonObject | undefined;
type RuntimeSubagentInputFormatRequest = {
    readonly message: string;
    readonly name: string;
    readonly persistentSession?: boolean;
    readonly type: "runtime";
};
type LocalSubagentInputFormatRequest = {
    readonly description: string;
    readonly message: string;
    readonly name: string;
    readonly persistentSession?: boolean;
    readonly type: "local";
};
type RemoteSubagentInputFormatRequest = {
    readonly description: string;
    readonly message: string;
    readonly name: string;
    readonly persistentSession?: boolean;
    readonly type: "remote";
};
type SubagentInputFormatRequest = RuntimeSubagentInputFormatRequest | LocalSubagentInputFormatRequest | RemoteSubagentInputFormatRequest;
/**
 * Formats the stable delegated input handed to one child agent invocation.
 */
export declare function formatSubagentInput(input: SubagentInputFormatRequest): FormattedSubagentInvocation;
export {};
