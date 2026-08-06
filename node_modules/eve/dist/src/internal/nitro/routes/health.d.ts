import type { H3Event } from "nitro";
export default _default;
/**
 * Nitro route for eve's health endpoint.
 *
 * The health endpoint is intentionally always-public so platform load
 * balancers and uptime monitors can probe it without credentials.
 * Channels that need authenticated health probes should author their own
 * channel file with the verifier helpers from
 * `eve/channels/auth`.
 */
declare function _default(_event: H3Event<{
    body: unknown;
}>): Promise<Response>;
