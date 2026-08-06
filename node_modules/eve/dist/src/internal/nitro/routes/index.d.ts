import type { H3Event } from "nitro";
/**
 * Builds the barebones home page response for one request. Exposed
 * for tests so callers can supply a real {@link Request}; production
 * traffic flows through the Nitro {@link H3Event} default export.
 */
export declare function buildHomePageResponse(input: {
    readonly agentName: string;
}, request: Request): Response;
/**
 * Nitro route handler for `GET /`. Adapts the Nitro event shape into
 * {@link buildHomePageResponse}.
 */
export declare function handleHomePageRequest(input: {
    readonly agentName: string;
}, request: Request): Response;
export default function handleStaticHomePageRequest(event: H3Event): Response;
