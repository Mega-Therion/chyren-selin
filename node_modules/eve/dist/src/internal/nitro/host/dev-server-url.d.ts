export declare const DEFAULT_DEVELOPMENT_SERVER_HOST = "127.0.0.1";
/**
 * Rewrites a server URL whose hostname is a wildcard listen address into a
 * loopback URL on the same address family.
 */
export declare function normalizeDevelopmentServerClientUrl(serverUrl: string): string;
