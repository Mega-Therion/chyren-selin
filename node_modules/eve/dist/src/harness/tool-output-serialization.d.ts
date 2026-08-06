type ToolOutputSerializationBoundary = "action.result" | "execute" | "toModelOutput";
export declare class ToolOutputSerializationError extends TypeError {
    readonly toolCallId: string | undefined;
    readonly toolName: string;
    constructor(input: {
        readonly boundary: ToolOutputSerializationBoundary;
        readonly cause?: unknown;
        readonly toolCallId?: string;
        readonly toolName: string;
    });
}
export declare function withToolOutputSerializationError<T>(input: {
    readonly boundary: ToolOutputSerializationBoundary;
    readonly toolCallId?: string;
    readonly toolName: string;
}, fn: () => T): T;
export {};
