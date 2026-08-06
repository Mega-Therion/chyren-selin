declare const SHUTDOWN_SIGNALS: readonly ["SIGINT", "SIGTERM"];
type ShutdownSignal = (typeof SHUTDOWN_SIGNALS)[number];
interface SandboxShutdownProcess {
    readonly env: Record<string, string | undefined>;
    exit(code?: number): void;
    once(event: ShutdownSignal, listener: () => void): unknown;
}
interface NitroAppLike {
    readonly hooks?: {
        hook(name: "close", handler: () => Promise<void>): unknown;
    };
}
/**
 * Reports whether this server process owns sandbox shutdown.
 *
 * - `eve dev` workers are excluded: the dev CLI parent already stops
 *   dev-tagged sandboxes when the dev server closes.
 * - Vercel serverless instances are excluded: instance recycling is not
 *   a server stop, and persistent session sandboxes must keep serving
 *   later invocations.
 */
export declare function shouldInstallSandboxShutdown(env: Record<string, string | undefined>): boolean;
/**
 * Stops all tracked sandboxes, bounded by
 * {@link SANDBOX_SHUTDOWN_TIMEOUT_MS}. Never throws.
 */
export declare function runSandboxShutdown(log: (message: string) => void): Promise<void>;
/**
 * Wires sandbox shutdown into the server lifecycle: the nitro `close`
 * hook plus SIGINT/SIGTERM, since the node-server preset installs no
 * signal handling of its own. Exposed for tests; the plugin default
 * export applies it to the real `process`.
 */
export declare function installSandboxShutdownHandlers(input: {
    readonly log: (message: string) => void;
    readonly nitroApp?: NitroAppLike;
    readonly process: SandboxShutdownProcess;
}): void;
export default function sandboxShutdownPlugin(nitroApp?: NitroAppLike): void;
export {};
