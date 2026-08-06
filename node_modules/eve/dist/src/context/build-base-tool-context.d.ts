import type { SessionContext } from "#public/definitions/callback-context.js";
import type { ToolExecuteOptions } from "#shared/tool-definition.js";
/** Base context shared by tool executors. */
export type BaseToolContext = SessionContext & {
    readonly abortSignal: AbortSignal;
    readonly callId: string;
    readonly toolName: string;
};
/** Builds the base context for one tool execution. */
export declare function buildBaseToolContext(input: {
    readonly options: Pick<ToolExecuteOptions, "abortSignal" | "toolCallId">;
    readonly toolName: string;
}): BaseToolContext;
