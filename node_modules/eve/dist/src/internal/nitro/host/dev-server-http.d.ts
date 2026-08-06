import type { IncomingMessage, Server, ServerResponse } from "node:http";
export declare function createPublicRequest(request: IncomingMessage, signal: AbortSignal): Request;
export declare function writeResponse(response: ServerResponse, webResponse: Response, signal: AbortSignal): Promise<void>;
export declare function writeRequestError(response: ServerResponse, error: unknown): void;
export declare function closeServer(server: Server): Promise<void>;
