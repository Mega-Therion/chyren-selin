/**
 * Capabilities table for workflow runs based on their `@workflow/core` version.
 *
 * When resuming a hook or webhook, the payload must be encoded in a format
 * that the *target* workflow run's deployment can decode. This module provides
 * a way to look up what serialization formats a given `@workflow/core` version
 * supports, so that newer deployments can avoid encoding payloads in formats
 * that older deployments don't understand (e.g., the `encr` encryption format).
 *
 * ## Adding a new format
 *
 * When a new serialization format is introduced:
 * 1. Add the format constant to `SerializationFormat` in `serialization.ts`
 * 2. Add an entry to `FORMAT_VERSION_TABLE` below with the minimum
 *    `@workflow/core` version that supports it
 * 3. The `getRunCapabilities()` function will automatically include it
 *
 * ## Adding a new non-format capability
 *
 * Some capabilities aren't serialization format prefixes — e.g.
 * byte-stream wire framing is an envelope around chunks rather than
 * a content format. For those, add a boolean field to `RunCapabilities`
 * and an entry in `CAPABILITY_VERSION_TABLE` below.
 *
 * ## History
 *
 * - `encr` (AES-256-GCM encryption): added in `4.2.0-beta.64`
 *   Commit: 7618ac36 "Wire AES-GCM encryption into serialization layer (#1251)"
 *   https://github.com/vercel/workflow/commit/7618ac36
 * - `framedByteStreams` (wire-level chunk framing for byte streams): added in `5.0.0-beta.15`
 * - `gzip` (gzip payload compression): added in `5.0.0-beta.18`
 * - `zstd` (zstd payload compression, preferred codec): added in `5.0.0-beta.18`
 *   alongside gzip — they co-ship, so any run that can read one can read both.
 * - `encp` (X25519 sealed-box encryption for cross-run writes): added in
 *   `5.0.0-beta.37`. Note that producers do **not** gate `encp` on this table:
 *   they gate on the presence of `encryptionPublicKey` on the target run,
 *   which a run only carries if the deployment that created it could also
 *   open `encp`. The entry exists so the capability set stays a complete,
 *   auditable description of a run's decoding ability.
 * - Lazy hook resume ("consumer re-ensures `hook_received` from `hookInput`"):
 *   deliberately NOT tracked here. Rather than predict a release cutoff, the
 *   run's creating deployment stamps an explicit `hookResumeInputVersion`
 *   execution-context marker; `resumeHook()` gates the parallel fast path on
 *   that marker (mirrored onto the hook's resumeContext by the server).
 */
import { type SerializationFormatType } from './serialization.js';
/**
 * Capabilities of a workflow run based on its `@workflow/core` version.
 */
export interface RunCapabilities {
    /**
     * The set of serialization format prefixes that the target run can decode.
     * Use `supportedFormats.has(SerializationFormat.ENCRYPTED)` to check
     * if encryption is supported, etc.
     */
    supportedFormats: ReadonlySet<SerializationFormatType>;
    /**
     * Whether the target run can decode wire-framed byte streams. When true,
     * byte streams (`type: 'bytes'` ReadableStreams passed across boundaries)
     * are wrapped in a length-prefixed frame envelope on the wire so the
     * reader can identify chunk boundaries — which enables auto-reconnect
     * on transient stream errors. When false, byte streams are written as
     * raw bytes (the legacy format) for compatibility with older runs.
     */
    framedByteStreams: boolean;
}
/**
 * Look up what serialization capabilities a workflow run supports based on
 * its `@workflow/core` version string (from `executionContext.workflowCoreVersion`).
 *
 * When the version is `undefined`, not a string, or not a valid semver string
 * (e.g. very old runs that predate the field, or corrupted metadata),
 * we assume the most conservative capabilities (baseline formats only,
 * non-format capabilities all `false`).
 */
export declare function getRunCapabilities(workflowCoreVersion: string | undefined): RunCapabilities;
//# sourceMappingURL=capabilities.d.ts.map