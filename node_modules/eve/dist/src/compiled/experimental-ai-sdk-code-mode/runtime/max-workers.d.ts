/**
 * Sets the process-global maximum number of active code-mode workers.
 *
 * Pass `undefined` or call without an argument to restore the dynamic
 * memory-based default. The default admits at least one invocation and admits
 * additional workers only when available memory can cover another worker.
 *
 * @param maxWorkers - Positive integer worker cap, or `undefined` to reset.
 */
export declare function setMaxWorkers(maxWorkers?: number): void;
/**
 * Returns the currently effective worker cap.
 *
 * @internal
 */
export declare function getMaxWorkers({ memoryLimitBytes, activeWorkers, }: {
    memoryLimitBytes: number;
    activeWorkers: number;
}): number;
//# sourceMappingURL=max-workers.d.ts.map