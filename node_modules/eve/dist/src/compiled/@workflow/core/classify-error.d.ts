import { type RunErrorCode, WorkflowWorldError } from '#compiled/@workflow/errors/index.js';
/**
 * Classify an error that caused a workflow run to fail.
 *
 * After the structural separation of infrastructure vs user code error
 * handling, the only errors that reach the `run_failed` try/catch are:
 * - User code errors (throws from workflow functions, propagated step failures)
 * - WorkflowRuntimeError and subclasses (missing timestamps, workflow/step
 *   not registered, corrupted event log, etc.)
 *
 * Uses each subclass's `.is()` static (a name-based duck check) instead of
 * a single `instanceof` check because workflows execute in a separate
 * `vm` realm: the VM-context `WorkflowRuntimeError` and the host-context
 * one are distinct classes, so `instanceof` returns `false` for any error
 * thrown inside the workflow VM and we'd misclassify genuine runtime
 * errors as user errors.
 */
export declare function isWorldContractError(err: unknown): err is WorkflowWorldError;
/**
 * True when an error from a world (workflow-server) call is a transient
 * infrastructure failure that should be retried by redelivering the queue
 * message, rather than failing the run. A fresh invocation will likely
 * succeed once the backend (or the firewall in front of it) recovers.
 *
 * - `ThrottleError` (429): rate limited / load shed
 * - `WorkflowWorldError` with `status >= 500`: server-side error
 * - `WorkflowWorldError` with a retryable transport `code` (`TRANSPORT` /
 *   `TIMEOUT`): the request never produced a usable response
 *
 * Uses `.is()` name-based duck checks (not `instanceof`) for the same
 * cross-`vm`-realm reason described on `classifyRunError`.
 */
export declare function isRetryableWorldError(err: unknown): boolean;
export declare function classifyRunError(err: unknown): RunErrorCode;
//# sourceMappingURL=classify-error.d.ts.map