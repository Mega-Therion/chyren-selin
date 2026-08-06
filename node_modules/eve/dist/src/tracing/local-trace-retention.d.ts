/**
 * A bound that may be switched off individually, mirroring the `number | false`
 * idiom used by authored agent limits.
 */
type RetentionBound = number | false;
/** Resolved retention policy for one dev worker. */
export interface LocalTraceRetentionSettings {
    readonly enabled: boolean;
    readonly maxAgeMs: RetentionBound;
    readonly maxTotalBytes: RetentionBound;
    readonly retainCount: RetentionBound;
}
/** Which bound removed traces, reported for a single diagnostics line. */
export type LocalTracePruneReason = "maxAgeMs" | "maxTotalBytes";
/** Outcome of one sweep. `removedTraces` counts trace directories, not spans. */
export interface LocalTracePruneResult {
    readonly reasons: readonly LocalTracePruneReason[];
    readonly reclaimedBytes: number;
    readonly removedTraces: number;
    readonly retainedTraces: number;
}
export interface PruneLocalTraceStoreInput {
    readonly appRoot: string;
    /** Traces whose session is open in this worker; never evicted. */
    readonly activeTraceIds: ReadonlySet<string>;
    readonly maxAgeMs?: RetentionBound;
    readonly maxTotalBytes?: RetentionBound;
    readonly now?: number;
    readonly retainCount?: RetentionBound;
}
/**
 * Reads the retention policy from the environment.
 *
 * `eve dev` loads `.env.local` into `process.env` before the tracing runtime
 * installs, so these are authored there rather than in `agent.ts`: the store is
 * a property of one developer's machine, not of the deployed agent.
 *
 * Every bound accepts `off` to disable that axis alone. Unparseable values warn
 * and fall back to the default instead of throwing, because a typo in a dev env
 * file should not prevent the agent from booting.
 */
export declare function resolveLocalTraceRetentionSettings(env?: Readonly<Record<string, string | undefined>>): LocalTraceRetentionSettings;
/**
 * Bounds the local trace store.
 *
 * A trace survives while its session is open, while it was written within the
 * quiescence window, while it is among the newest `retainCount`, and while it
 * is younger than `maxAgeMs`. Everything else is evicted oldest-first, taking
 * the age bound first and then whatever the `maxTotalBytes` budget still
 * demands.
 *
 * The count floor outranks both other bounds deliberately: a trace records
 * something that happened and cannot be regenerated, so returning to a quiet
 * project should not mean returning to an empty store.
 */
export declare function pruneLocalTraceStore(input: PruneLocalTraceStoreInput): Promise<LocalTracePruneResult>;
/**
 * Requests a sweep without blocking the caller.
 *
 * One pending request is coalesced rather than dropped, so a session that
 * finishes while a sweep is already running still gets swept — the same
 * guarantee `requestDevelopmentGenerationPrune` gives dev runtime generations.
 * Failures are reported and otherwise swallowed: an unbounded store is
 * preferable to a broken dev server.
 */
export declare function requestLocalTraceStorePrune(input: PruneLocalTraceStoreInput): void;
export {};
