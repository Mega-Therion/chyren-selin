import { detectProjectIdentity, type ProjectIdentity } from "#setup/project-resolution.js";
/** Workspace-scoped Vercel state shown in the dev TUI's status line. */
export interface VercelStatusSnapshot {
    /** Resolved link identity; absent while unlinked or while a probe is in flight. */
    identity?: ProjectIdentity;
}
/**
 * Status-line effect a completed setup command reports back to the runner.
 * Session-scoped by design: a deploy from another terminal or channels added
 * before this session escape it — accepted v1 limits.
 */
export type VercelStatusEffect = {
    kind: "deployed";
} | {
    kind: "refresh-identity";
};
export interface VercelStatusTrackerOptions {
    /** Absolute local application root holding the `.vercel` link directory. */
    appRoot: string;
    /** Receives every snapshot change, including async identity resolutions. */
    onChange: (snapshot: VercelStatusSnapshot) => void;
    /** Test seam; defaults to the real network-bound probe. */
    detectIdentity?: typeof detectProjectIdentity;
}
/**
 * Owns the Vercel segment of the dev TUI status line: one cached link
 * identity. The identity probe is network-bound (it shells `vercel api`), so it runs only at startup and
 * after provider setup or a /deploy — never on a poll. A linked directory
 * whose `vercel` CLI call fails resolves to the raw project id as the name
 * (see {@link detectProjectIdentity}); an unlinked one resolves to no identity,
 * which hides the segment.
 */
export interface VercelStatusTracker {
    /** Fire-and-forget identity re-probe; superseded probes are aborted. */
    refreshIdentity(): void;
    applyEffect(effect: VercelStatusEffect): void;
    current(): VercelStatusSnapshot;
    /** Stops future changes and aborts the in-flight identity probe. */
    dispose(): void;
}
/** Creates the {@link VercelStatusTracker} for one dev TUI session. */
export declare function createVercelStatusTracker(options: VercelStatusTrackerOptions): VercelStatusTracker;
