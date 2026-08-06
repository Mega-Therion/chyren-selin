import type { ChannelAdapter, ChannelInstrumentationMetadata } from "#channel/adapter.js";
export interface ChannelInstrumentationProjection {
    readonly kind: string;
    readonly metadata: ChannelInstrumentationMetadata;
}
export declare function buildChannelInstrumentationProjection(input: {
    readonly adapter: ChannelAdapter;
    readonly channelName?: string;
    readonly existingKind?: string;
}): ChannelInstrumentationProjection;
