export declare function encodeSlackApiBody(body: unknown): {
    readonly body: string;
    readonly contentType: string;
};
export declare function decodeSlackApiBody(body: unknown, contentType: string | null): unknown;
