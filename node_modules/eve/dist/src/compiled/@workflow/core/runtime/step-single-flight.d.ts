import type { StepExecutionResult } from './step-executor.js';
/**
 * Run `execute` unless an execution for the same run + step correlation ID is
 * already in flight in this process. The winner's result is returned to the
 * winner; a loser awaits the winner's settlement (success OR failure) and
 * then returns `{ type: 'skipped' }` so its caller acks without running the
 * body. A winner failure is not propagated to the loser — the winner's own
 * queue message redelivers and drives the retry, so exactly one message
 * keeps owning the outcome.
 */
export declare function runStepSingleFlight(runId: string, correlationId: string, execute: () => Promise<StepExecutionResult>): Promise<StepExecutionResult>;
//# sourceMappingURL=step-single-flight.d.ts.map