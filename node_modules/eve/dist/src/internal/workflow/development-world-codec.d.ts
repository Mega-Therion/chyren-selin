export interface SerializedDevelopmentWorldError {
    readonly details: Readonly<Record<string, unknown>>;
    readonly message: string;
    readonly name: string;
    readonly stack?: string;
}
export declare function encodeDevelopmentWorldValue(value: unknown): string;
export declare function decodeDevelopmentWorldValue(source: string): unknown;
export declare function decodeDevelopmentWorldJson(source: string): unknown;
export declare function serializeDevelopmentWorldError(error: unknown): SerializedDevelopmentWorldError;
export declare function deserializeDevelopmentWorldError(value: unknown): Error | undefined;
