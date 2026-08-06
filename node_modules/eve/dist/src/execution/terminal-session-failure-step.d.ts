/** Emits a terminal `session.failed` to the adapter and durable stream. */
export declare function emitTerminalSessionFailureStep(input: {
    readonly error: unknown;
    readonly parentWritable: WritableStream<Uint8Array>;
    readonly serializedContext: Record<string, unknown>;
}): Promise<void>;
