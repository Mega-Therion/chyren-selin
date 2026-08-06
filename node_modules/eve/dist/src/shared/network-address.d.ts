import { z } from "#compiled/zod/index.js";
/** HTTP(S) URL accepted as a development-server endpoint. */
export declare const httpServerUrlSchema: z.ZodURL;
/**
 * Returns whether `hostname` names the current machine's loopback interface.
 * Accepts the full IPv4 loopback block, IPv6 loopback, and the RFC 6761
 * `localhost` namespace. Wildcard bind addresses such as `0.0.0.0` are not
 * loopback connect targets.
 */
export declare function isLoopbackHostname(hostname: string): boolean;
/** Returns whether `urlText` is an HTTP(S) URL with a loopback hostname. */
export declare function isLoopbackServerUrl(urlText: string): boolean;
/**
 * Whether `host` is an IP literal in a private, link-local, or otherwise
 * reserved range that an outbound framework request must not target — an SSRF
 * guard for caller-supplied URLs (covers RFC1918, CGNAT, link-local incl. cloud
 * metadata at `169.254.169.254`, IPv6 ULA/link-local, and the unspecified
 * address). Loopback is intentionally allowed (see {@link reservedRanges}).
 *
 * Plain hostnames return `false`: no DNS resolution is performed here, so a
 * hostname that resolves to a private address is not caught at this layer.
 */
export declare function isReservedIpAddress(host: string): boolean;
/**
 * Whether `host` is an IP literal that must not be used as the destination of
 * an untrusted outbound request. Unlike {@link isReservedIpAddress}, this also
 * blocks loopback addresses.
 */
export declare function isPrivateOrReservedIpAddress(host: string): boolean;
