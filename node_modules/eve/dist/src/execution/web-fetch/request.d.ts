/** Options for an SSRF-safe HTTPS request. */
export interface PublicUrlRequestOptions {
    readonly headers: Readonly<Record<string, string>>;
    readonly maxResponseSize: number;
    readonly signal: AbortSignal;
}
/**
 * Requests an untrusted HTTPS URL while preventing access to non-public
 * network destinations.
 *
 * The socket lookup rejects the hostname if any resolved address is non-public
 * and connects using those exact results.
 */
export declare function requestPublicUrl(urlText: string, options: PublicUrlRequestOptions): Promise<Response>;
