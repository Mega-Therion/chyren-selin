export type McpConnectionProbe = (input: {
    url: string;
    signal: AbortSignal;
}) => Promise<string | undefined>;
export declare function probeMcpConnection(input: {
    url: string;
    signal: AbortSignal;
}): Promise<string | undefined>;
export interface McpConnectionStatusTracker {
    current(): Readonly<Record<string, string>>;
    refresh(): void;
    dispose(): void;
}
export interface McpConnectionStatusTrackerOptions {
    onChange: (disabledConnectionReasons: Readonly<Record<string, string>>) => void;
    probe?: McpConnectionProbe;
    intervalMs?: number;
}
export declare function createMcpConnectionStatusTracker(options: McpConnectionStatusTrackerOptions): McpConnectionStatusTracker;
