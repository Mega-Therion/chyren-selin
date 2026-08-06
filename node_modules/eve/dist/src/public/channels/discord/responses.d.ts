/** Builds the Discord acknowledgement response for deferred command handling. */
export declare function discordDeferredJson(ephemeral: boolean): Response;
/** Builds a Discord interaction callback JSON response. */
export declare function discordJson(input: {
    readonly content: string;
    readonly ephemeral?: boolean;
} | Record<string, unknown>): Response;
/** Serializes a Discord interaction callback body. */
export declare function discordJsonBody(body: Record<string, unknown>): Response;
/** Reads component or modal source message content from a raw Discord interaction. */
export declare function readMessageContent(raw: Record<string, unknown>): string | undefined;
