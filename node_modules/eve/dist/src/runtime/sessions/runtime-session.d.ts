import type { BundledCompiledArtifacts } from "#runtime/loaders/bundled-artifacts.js";
import type { CompiledRuntimeAgentBundle } from "#runtime/sessions/compiled-agent-cache.js";
/**
 * Process-scoped container for mutable runtime state owned by one eve
 * deployment.
 *
 * Holds installed compiled artifacts and compiled-agent bundle caches.
 * Tests use {@link withRuntimeSession} to avoid mutating the process
 * default session.
 */
export interface RuntimeSession {
    /**
     * Diagnostic identifier (e.g. `"process-default"` or a test-provided label).
     * Used for logs and error messages; not relied on for dispatch.
     */
    readonly id: string;
    /**
     * The installed bundled compiled-artifact snapshot, or `null` when no
     * snapshot has been installed in this session yet.
     */
    compiledArtifacts: BundledCompiledArtifacts | null;
    /**
     * Cache of resolved compiled-agent bundles, keyed by the versioned cache key
     * derived from the compiled-artifact source.
     */
    readonly bundleCache: Map<string, Promise<CompiledRuntimeAgentBundle>>;
    /**
     * Reverse index from the stable source key to the currently active versioned
     * cache key. Used to evict the previous entry when a source's version
     * changes.
     */
    readonly bundleCacheKeyBySourceKey: Map<string, string>;
}
/**
 * Creates a fresh, empty runtime session.
 */
export declare function createRuntimeSession(id?: string): RuntimeSession;
/**
 * Returns the runtime session that should be consulted for the current call.
 *
 * Returns the scoped session when {@link withRuntimeSession} is active in
 * the current async context, otherwise the process-default session
 * (lazily created on first access).
 */
export declare function getActiveRuntimeSession(): RuntimeSession;
/**
 * Executes `fn` with `session` installed as the active runtime session for
 * the duration of the callback, including across every `await` boundary
 * inside it. Concurrent callers each observe their own session. The
 * process-default session is untouched.
 */
export declare function withRuntimeSession<T>(session: RuntimeSession, fn: () => Promise<T> | T): Promise<T>;
