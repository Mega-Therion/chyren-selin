import type { SessionAuthContext } from "#channel/types.js";
import { type LinearApiOptions } from "#public/channels/linear/api.js";
import type { LinearChannelCredentials } from "#public/channels/linear/auth.js";
import type { LinearAgentSessionEvent } from "#public/channels/linear/inbound.js";
import type { LinearChannelEvents, LinearInboundResult, LinearSessionContext } from "#public/channels/linear/linearChannel.js";
/** Default Linear auth projection for Agent Session webhook actors. */
export declare function defaultLinearAuth(event: LinearAgentSessionEvent): SessionAuthContext;
/** Default Agent Session hook: dispatch created/prompted events with Linear user auth. */
export declare function defaultOnAgentSession(_ctx: LinearSessionContext, event: LinearAgentSessionEvent): LinearInboundResult;
/** Options used by built-in Linear event handlers. */
export interface LinearDefaultEventOptions {
    readonly api?: LinearApiOptions;
    readonly credentials?: LinearChannelCredentials;
}
/** Built-in Linear event handlers for Agent Activity progress, replies, HITL, and errors. */
export declare function createDefaultEvents(options?: LinearDefaultEventOptions): LinearChannelEvents;
