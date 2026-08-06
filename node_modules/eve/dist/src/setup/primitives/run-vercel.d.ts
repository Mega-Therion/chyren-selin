import { type ProcessOutputHandler } from "./process-output.js";
/** Options common to shared Vercel CLI subprocess operations. */
export interface RunVercelOptions {
    cwd: string;
    extraEnv?: Readonly<Record<string, string>>;
    /** Pass `--non-interactive` and close stdin so automation cannot stop on a prompt. */
    nonInteractive?: boolean;
    /** UTF-8 data written to stdin, used to keep connector secrets out of argv. */
    stdin?: string;
    /** Streams command output to a parent-owned renderer instead of writing outside it. */
    onOutput?: ProcessOutputHandler;
    /** Aborts the Vercel CLI subprocess when its parent setup flow is interrupted. */
    signal?: AbortSignal;
    /**
     * Hard deadline for the whole command. When it elapses the run settles as a
     * failure and the child is killed (SIGTERM, then SIGKILL after a short
     * grace). Unbounded when omitted — only safe for commands that cannot wait
     * on external action, e.g. a Connect create parked on a browser OAuth.
     */
    timeoutMs?: number;
}
interface VercelCliInvocation {
    command: string;
    commandArgs: string[];
    shell?: boolean;
}
type Platform = NodeJS.Platform;
export declare function resolveVercelInvocation(cwd: string, args?: string[], platform?: Platform): VercelCliInvocation;
/**
 * Runs a Vercel CLI command with the Connect feature flag enabled.
 *
 * When `onOutput` is supplied, stdout and stderr are emitted as complete lines
 * so an interactive parent can keep terminal rendering coherent.
 */
export declare function runVercel(args: string[], options: RunVercelOptions): Promise<boolean>;
/** Exit success plus captured stdout from an interactive Vercel CLI run. */
export interface RunVercelCaptureResult {
    ok: boolean;
    stdout: string;
    stderr?: string;
}
/**
 * Runs an interactive Vercel CLI command while capturing its stdout.
 *
 * Unlike {@link captureVercel}, stdin stays attached to the terminal so the
 * command can drive prompts and browser-based OAuth flows, and stderr is
 * streamed to `onOutput` (the rail renderer) like {@link runVercel}. Only
 * stdout is captured, so a `--format json` payload can be parsed without
 * disturbing the interactive UI, which the Vercel CLI writes to stderr.
 */
export declare function runVercelCaptureStdout(args: string[], options: RunVercelOptions): Promise<RunVercelCaptureResult>;
/** Why a {@link captureVercel} lookup failed, preserved so callers can act on it. */
export interface VercelCaptureFailure {
    /** Process exit code, or `null` when killed by a signal; absent for a spawn error (the process never ran). */
    code?: number | null;
    /** `error.code` from a spawn failure, e.g. `"ENOENT"` when `vercel` is not on `PATH`. */
    errno?: string;
    /** Captured stderr (best-effort); empty when the process never ran. */
    stderr: string;
    /** Captured stdout (best-effort), useful when a JSON API error exits non-zero. */
    stdout: string;
    /** One-line human-readable summary, safe to surface to a user or agent. */
    message: string;
}
/**
 * Outcome of a {@link captureVercel} lookup: stdout on a clean exit, or the
 * failure diagnostic. The failure arm exists so a caller like the login check
 * can tell "not logged in" from "the CLI is missing" or "the API errored",
 * instead of collapsing every fault into a single `undefined`.
 */
export type VercelCaptureResult = {
    ok: true;
    stdout: string;
} | {
    ok: false;
    failure: VercelCaptureFailure;
};
export declare function captureVercel(args: string[], options: RunVercelOptions): Promise<VercelCaptureResult>;
export {};
