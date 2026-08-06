import type { ClientOptions } from "#client/index.js";
import type { DevelopmentCredentialGate } from "./credential-gate.js";
type DevelopmentClientHeaders = Readonly<Record<string, string>>;
/** Returns whether development request headers explicitly own HTTP authorization. */
export declare function hasDevelopmentAuthorizationHeader(headers: DevelopmentClientHeaders | undefined): headers is DevelopmentClientHeaders;
/**
 * Builds anonymous {@link ClientOptions} for a development target. Locality is
 * not an authorization decision, so remote URLs receive no ambient Vercel
 * credentials through this default path.
 */
export declare function resolveDevelopmentClientOptions(serverUrl: string): ClientOptions;
/** Builds a non-redirecting local client, using ambient bearer auth only when it owns Authorization. */
export declare function resolveLocalDevelopmentClientOptions(input: {
    readonly headers?: DevelopmentClientHeaders;
    readonly serverUrl: string;
    readonly token: () => Promise<string>;
}): ClientOptions;
/** Builds non-redirecting client options backed by one verified credential gate. */
export declare function resolveRemoteDevelopmentClientOptions(input: {
    readonly credentials: DevelopmentCredentialGate;
    readonly headers?: DevelopmentClientHeaders;
    readonly serverUrl: string;
}): ClientOptions;
export {};
