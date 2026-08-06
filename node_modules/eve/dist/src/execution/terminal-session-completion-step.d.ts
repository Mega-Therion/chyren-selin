/** Emits a terminal `session.completed` outside a turn. */
export declare function emitTerminalSessionCompletionStep(input: {
    readonly parentWritable: WritableStream<Uint8Array>;
    readonly serializedContext: Record<string, unknown>;
}): Promise<void>;
