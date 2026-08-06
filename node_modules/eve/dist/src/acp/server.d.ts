import { Readable, Writable } from "node:stream";
import { type EveAcpAdapterOptions } from "#acp/adapter.js";
import type { ClientOptions } from "#client/types.js";
/** Configuration for one ACP stdio connection backed by an eve server. */
export interface RunAcpServerOptions {
    readonly auth?: ClientOptions["auth"];
    readonly eveVersion: string;
    readonly headers?: ClientOptions["headers"];
    readonly serverUrl: string;
    readonly signal?: AbortSignal;
    /** Local workspace root to enforce; omit when connecting to a remote deployment. */
    readonly workspaceRoot?: string;
    /** @internal Test seam for the public eve client boundary. */
    readonly client?: EveAcpAdapterOptions["client"];
}
/** Node streams for one ACP stdio connection. */
export interface AcpServerStreams {
    readonly input: Readable;
    readonly output: Writable;
}
/** Serves one stable ACP v1 connection over process stdio until the client disconnects. */
export declare function runAcpServer(options: RunAcpServerOptions): Promise<void>;
/** Serves one stable ACP v1 connection over the supplied Node streams. */
export declare function runAcpServerOnStreams(options: RunAcpServerOptions, streams: AcpServerStreams): Promise<void>;
