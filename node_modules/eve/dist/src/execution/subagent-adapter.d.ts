import type { ChannelAdapter } from "#channel/adapter.js";
/**
 * Framework adapter that bridges a child subagent session to its
 * parent.
 *
 * It proxies child `input.requested` events upward so the parent channel
 * can render HITL prompts and route responses back down to the child.
 */
export declare const SUBAGENT_ADAPTER: ChannelAdapter;
