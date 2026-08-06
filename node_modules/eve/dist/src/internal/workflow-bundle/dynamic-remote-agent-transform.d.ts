/**
 * Hoists dynamic remote auth and headers into registered factories so durable
 * selections carry only a function id, never credential values or closures.
 */
export declare function transformDynamicRemoteAgentCredentials(filename: string, source: string): Promise<{
    code: string;
} | null>;
