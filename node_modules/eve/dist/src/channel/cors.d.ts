/**
 * Serializable subset of H3/Nitro CORS options supported by channel routes.
 *
 * Function and RegExp origins are intentionally excluded because channel
 * definitions are compiled into JSON artifacts and virtual Nitro handlers.
 */
export interface ChannelCorsOptions {
    /**
     * Allowed request origins. Omit or pass `"*"` for all origins, pass
     * `"null"` for the literal `null` origin, or pass an array of exact origins.
     */
    readonly origin?: "*" | "null" | readonly string[];
    /** Methods emitted on preflight responses. Omit or pass `"*"` for all methods. */
    readonly methods?: "*" | readonly string[];
    /**
     * Request headers emitted on preflight responses. Omit or pass `"*"` to
     * allow requested headers.
     */
    readonly allowHeaders?: "*" | readonly string[];
    /** Response headers exposed to browser callers. Omit or pass `"*"` for all headers. */
    readonly exposeHeaders?: "*" | readonly string[];
    /** Whether to emit `access-control-allow-credentials: true`. */
    readonly credentials?: boolean;
    /** Max age, in seconds, emitted on preflight responses. */
    readonly maxAge?: string | number | false;
    /** Preflight response customization. */
    readonly preflight?: {
        readonly statusCode?: number;
    };
}
export type ChannelCors = boolean | ChannelCorsOptions;
export interface NormalizedChannelCorsOptions {
    readonly origin?: "*" | "null" | readonly string[];
    readonly methods?: "*" | readonly string[];
    readonly allowHeaders?: "*" | readonly string[];
    readonly exposeHeaders?: "*" | readonly string[];
    readonly credentials?: boolean;
    readonly maxAge?: string | false;
    readonly preflight?: {
        readonly statusCode?: number;
    };
}
export declare function normalizeChannelCors(cors: ChannelCors | undefined): NormalizedChannelCorsOptions | undefined;
