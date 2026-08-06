import type { ChildProcess } from "node:child_process";
/**
 * Couples a parent abort signal to a child process and guarantees eventual
 * termination. Callers still wait for `close`; this helper only owns signals
 * and the SIGKILL escalation.
 */
export declare function armProcessAbort(child: ChildProcess, signal: AbortSignal | undefined): () => void;
