import type { RouteContext } from "#public/definitions/channel.js";
import type { ResolvedChannelDefinition } from "#runtime/types.js";
export declare const HTTP_SESSION_CALLBACK_CHANNEL_NAME_PREFIX = "eve/v1/callback";
export declare function getSessionCallbackChannelDefinitions(): readonly ResolvedChannelDefinition[];
export declare function getSessionCallbackChannelNames(): ReadonlySet<string>;
export declare function handleSessionCallbackRequest(request: Request, ctx: RouteContext): Promise<Response>;
