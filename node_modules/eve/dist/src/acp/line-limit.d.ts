export declare const ACP_MAX_LINE_BYTES: number;
/** Rejects an ACP stdio line before the SDK's line buffer can grow without bound. */
export declare function limitAcpLineBytes(maximumBytes?: number): TransformStream<Uint8Array, Uint8Array>;
