import { type Server } from "node:http";
import type { WebSocketRouteHandler } from "#channel/routes.js";
/**
 * Escape hatch for SDKs and frameworks that need a Node HTTP server-shaped
 * upgrade target inside an eve `WS()` route.
 *
 * Prefer normal `WS()` lifecycle hooks for eve-owned websocket behavior. Use
 * this bridge only when an integration expects to register
 * `httpServer.on("upgrade", ...)` handlers itself. The server is intentionally
 * not listening on a port; eve forwards only the matched route's raw Node
 * upgrade into it.
 */
export interface WebSocketUpgradeServerBridge {
    readonly route: WebSocketRouteHandler;
    readonly server: Server;
}
/**
 * Creates an escape-hatch Node HTTP server facade plus a `WS()` route handler
 * that forwards matched raw upgrade events into that server.
 *
 * Prefer authoring websocket behavior directly with `WS()` hooks. Reach for
 * this only when an SDK or framework binds to `http.Server` upgrade events,
 * such as `engine.attach(server, path, ...)`. It works only on hosts where
 * Nitro exposes a Node upgrade tuple for the matched WebSocket route.
 */
export declare function createWebSocketUpgradeServer(): WebSocketUpgradeServerBridge;
