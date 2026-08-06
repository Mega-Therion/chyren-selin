import type { Storage } from './interfaces.js';
import { type Queue } from './queue.js';
/**
 * Re-enqueue all active (pending/running) workflow runs so they resume
 * processing after a world restart. The workflow handler is idempotent
 * (event-log replay), so duplicate enqueues are safe.
 *
 * @param runs - Storage runs interface for listing active runs
 * @param enqueue - Queue's enqueue method
 * @param label - Log prefix for identifying the world implementation (e.g. "world-local")
 * @param namespace - Optional queue namespace. Defaults to WORKFLOW_QUEUE_NAMESPACE.
 */
export declare function reenqueueActiveRuns(runs: Storage['runs'], enqueue: Queue['queue'], label: string, namespace?: string): Promise<void>;
//# sourceMappingURL=recovery.d.ts.map