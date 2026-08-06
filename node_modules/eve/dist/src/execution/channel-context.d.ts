import type { ChannelAdapter } from "#channel/adapter.js";
import type { ContextContainer } from "#context/container.js";
export declare function setChannelContext(ctx: ContextContainer, adapter: ChannelAdapter, options?: {
    readonly channelName?: string;
}): void;
