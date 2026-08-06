import type { MessageStreamEvent } from "#protocol/message.js";
import type { InputRequest } from "#runtime/input/types.js";
import type { JsonObject, JsonValue } from "#shared/json.js";
import type { EveEvalSubagentCall, EveEvalToolCall } from "#evals/types.js";
/**
 * One matcher accepted by the assertion options (`t.calledTool`,
 * `t.calledSubagent`):
 *
 * - a **literal** is compared structurally; objects partial-deep-match (every
 *   key in the matcher must match the observed value, recursively, and nested
 *   values are matchers themselves), arrays match element-wise, primitives
 *   compare with `Object.is`
 * - a **RegExp** tests string values directly and the JSON serialization of
 *   anything else
 * - a **function** receives the observed value and returns a boolean verdict
 */
export type EveEvalValueMatcher<T = JsonValue | undefined> = EveEvalDeepMatcher<T>;
/**
 * Constraint over an observed assertion count. A number requires an exact
 * count; a predicate receives the observed count and returns its verdict.
 */
export type EveEvalCountMatcher = number | ((count: number) => boolean);
type EveEvalDeepMatcher<T> = RegExp | ((value: T) => boolean) | (T extends readonly (infer TEntry)[] ? readonly EveEvalDeepMatcher<TEntry>[] : T extends object ? {
    readonly [K in keyof T]?: EveEvalDeepMatcher<T[K]>;
} : T);
/**
 * Constraints applied to tool calls by `t.calledTool`. All provided
 * constraints must hold for a call to match.
 */
export interface EveEvalToolCallMatchOptions {
    /** Partial-deep matcher over the call input (see {@link EveEvalValueMatcher}). */
    readonly input?: EveEvalValueMatcher<JsonObject>;
    /** Matcher over the call output. */
    readonly output?: EveEvalValueMatcher;
    /** Required lifecycle outcome. Defaults to `"completed"`. */
    readonly status?: EveEvalToolCall["status"];
    /** Constraint over the matching call count. Defaults to "at least one". */
    readonly count?: EveEvalCountMatcher;
}
/**
 * Constraints applied to a `load_skill` call by `t.loadedSkill`. Identical to
 * {@link EveEvalToolCallMatchOptions} without `input`, which the helper fixes to
 * the loaded skill id.
 */
export type EveEvalSkillLoadMatchOptions = Omit<EveEvalToolCallMatchOptions, "input">;
/**
 * Constraints applied to subagent calls by `t.calledSubagent`.
 */
export interface EveEvalSubagentCallMatchOptions {
    /** Matcher over the runtime-action call id. */
    readonly callId?: EveEvalValueMatcher<string | undefined>;
    /** Matcher over the durable child session id, when delegation started. */
    readonly childSessionId?: EveEvalValueMatcher<string | undefined>;
    /** Matcher over the `subagent.called` remote URL. */
    readonly remoteUrl?: EveEvalValueMatcher<string | undefined>;
    /** Matcher over the `subagent.completed` output. */
    readonly output?: EveEvalValueMatcher;
    /** Required lifecycle outcome. Defaults to `"completed"`. */
    readonly status?: EveEvalSubagentCall["status"];
    /** Constraint over the matching delegation count. Defaults to "at least one". */
    readonly count?: EveEvalCountMatcher;
}
/** Constraints accepted by `requireInputRequest`. */
export interface EveEvalInputRequestMatchOptions {
    /** Matcher over the request's display hint. */
    readonly display?: EveEvalValueMatcher<InputRequest["display"]>;
    /** Partial-deep matcher over a tool-call action's input. */
    readonly input?: EveEvalValueMatcher<JsonObject>;
    /** Matcher over the complete option-id list in request order. */
    readonly optionIds?: EveEvalValueMatcher<readonly string[]>;
    /** Matcher over the request prompt. */
    readonly prompt?: EveEvalValueMatcher<string>;
    /** Required tool name for a tool-call action. */
    readonly toolName?: string;
}
/** One typed stream-event matcher used by scoped event assertions. */
export type EveEvalEventMatch<TType extends MessageStreamEvent["type"] = MessageStreamEvent["type"]> = TType extends MessageStreamEvent["type"] ? {
    /** Stream-event type to match. */
    readonly type: TType;
    /** Partial-deep matcher over the event data. */
    readonly data?: EveEvalDeepMatcher<Extract<MessageStreamEvent, {
        type: TType;
    }> extends {
        data: infer TData;
    } ? TData : never>;
    /** Constraint over the matching event count. Defaults to "at least one". */
    readonly count?: EveEvalCountMatcher;
} : never;
/**
 * Returns true when the observed value satisfies a matcher (literal, RegExp,
 * or function — see {@link EveEvalValueMatcher}).
 */
export declare function matchesValue(matcher: unknown, value: unknown): boolean;
/**
 * Returns true when one derived tool call satisfies the `input`/`output`/
 * lifecycle constraints (the `count` option is the caller's concern).
 */
export declare function toolCallMatches(call: EveEvalToolCall, options: EveEvalToolCallMatchOptions): boolean;
/**
 * Returns true when one derived subagent call satisfies the `remoteUrl`/
 * `output` constraints.
 */
export declare function subagentCallMatches(call: EveEvalSubagentCall, options: EveEvalSubagentCallMatchOptions): boolean;
/** Returns true when one HITL request satisfies every supplied constraint. */
export declare function inputRequestMatches(request: InputRequest, options: EveEvalInputRequestMatchOptions): boolean;
/** Returns true when one stream event satisfies a typed event matcher. */
export declare function eventMatches(event: MessageStreamEvent, matcher: EveEvalEventMatch): boolean;
/**
 * Strict structural equality used by scoped `outputEquals`: unlike matcher
 * comparison, objects must carry exactly the same keys on both sides.
 */
export declare function deepEquals(a: unknown, b: unknown): boolean;
/**
 * Tests a RegExp without carrying `lastIndex` state between calls. Matcher
 * patterns are reused across tool calls and across every case in an eval, so
 * a `g`/`y`-flagged pattern would otherwise return order-dependent results.
 */
export declare function testRegExp(pattern: RegExp, text: string): boolean;
export {};
