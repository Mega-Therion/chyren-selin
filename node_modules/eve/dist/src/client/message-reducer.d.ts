import type { EveAgentReducer } from "#client/reducer.js";
import type { EveMessageData } from "#client/message-reducer-types.js";
export type { EveAuthorizationChallenge, EveAuthorizationOutcome, EveAuthorizationPart, EveMessageData, EveDynamicToolPart, EveMessageInputRequest, EveMessage, EveMessageMetadata, EveMessagePart, EveMessageToolMetadata, } from "#client/message-reducer-types.js";
/**
 * Creates a UIMessage-compatible eve reducer for chat and agent UIs.
 *
 * The returned projection keeps eve-owned types while following the AI SDK
 * `messages[].parts[]` rendering convention used by AI Elements. It projects
 * text, reasoning, tool calls, tool results, tool approvals, submitted HITL
 * responses, and authorization prompts.
 */
export declare function defaultMessageReducer(): EveAgentReducer<EveMessageData>;
