import { type CryptoKey } from './encryption.js';
/**
 * A per-run X25519 keypair, derived from the run's key material.
 *
 * Callers should derive this once per run and memoize it alongside the
 * symmetric key — derivation costs several Web Crypto round trips.
 */
export interface RunKeyPair {
    /** Raw 32-byte X25519 private scalar. Secret. */
    readonly scalar: Uint8Array;
    /** Raw 32-byte X25519 public key. Safe to publish. */
    readonly publicKey: Uint8Array;
}
/**
 * Derive the per-run X25519 keypair from the run's 32-byte key material.
 *
 * Deterministic: the same key material always yields the same keypair, which
 * is what lets the owning deployment re-derive its private scalar on demand
 * (from `VERCEL_DEPLOYMENT_KEY`) instead of storing it anywhere.
 *
 * @param runKeyMaterial - The 32 bytes returned by `World.getEncryptionKeyForRun()`
 * @returns The run's X25519 scalar and public key
 */
export declare function deriveRunKeyPair(runKeyMaterial: Uint8Array): Promise<RunKeyPair>;
/**
 * Encode bytes as standard (padded) base64.
 *
 * Hand-rolled for the same reason as {@link base64UrlToBytes}: this module
 * runs in the browser (o11y decryption) and inside the workflow VM, so neither
 * `Buffer` nor `btoa` can be assumed. Used for the wire encoding of run public
 * keys, matching the base64 convention already used for `VERCEL_DEPLOYMENT_KEY`
 * and the `run-key` API response.
 */
export declare function bytesToBase64(bytes: Uint8Array): string;
/**
 * Decode standard base64 (padding optional) to bytes.
 *
 * Returns `undefined` for malformed input rather than throwing: callers decode
 * public keys that arrive from storage or over the wire, where a corrupt value
 * should degrade to "this run has no usable public key" (and fall back to the
 * symmetric path) rather than crash a resumption.
 *
 * Validation is strict, because a lenient decoder is worse than a throwing one
 * here — silently returning a short or truncated key makes a corrupt value look
 * *present*, so the caller seals to garbage instead of taking the fallback.
 * Rejected: characters outside the alphabet, a length that cannot describe a
 * whole number of bytes (`length % 4 === 1`), padding anywhere but the end, and
 * a final quantum whose unused low bits are not zero.
 */
export declare function base64ToBytes(value: string): Uint8Array | undefined;
/**
 * The writer half of the KEM: generate an ephemeral keypair and derive a
 * content key for a recipient's public key.
 *
 * Use this when many payloads share one KEM operation — i.e. stream frames.
 * The returned `contentKey` can only encrypt, so a stream writer provably
 * cannot read the recipient run's data even by mistake.
 *
 * **Callers own nonce discipline.** Encrypt each frame with a fresh random
 * nonce, and call this function again for every new connection attempt or
 * replay so that a restarted writer never reuses a content key. For one-shot
 * payloads prefer {@link seal}, which handles this automatically.
 *
 * @param recipientPublicKey - The recipient run's raw 32-byte X25519 public key
 * @returns The ephemeral public key to publish alongside the ciphertext, and
 *   the encrypt-only content key
 */
export declare function encapsulate(recipientPublicKey: Uint8Array): Promise<{
    ephemeralPublicKey: Uint8Array;
    contentKey: CryptoKey;
}>;
/**
 * The recipient half of the KEM: recover the content key for a sealed
 * payload from the run's own keypair and the sender's ephemeral public key.
 *
 * @param keyPair - The recipient run's keypair, from {@link deriveRunKeyPair}
 * @param ephemeralPublicKey - The sender's raw 32-byte X25519 public key,
 *   read from the head of the sealed envelope
 * @returns A decrypt-only content key
 */
export declare function decapsulate(keyPair: RunKeyPair, ephemeralPublicKey: Uint8Array): Promise<CryptoKey>;
/**
 * Seal a payload to a run's public key.
 *
 * Each call performs its own KEM operation, so every sealed payload gets an
 * independent content key — nonce reuse across calls is impossible by
 * construction.
 *
 * @param recipientPublicKey - The recipient run's raw 32-byte X25519 public key
 * @param data - Plaintext to seal
 * @param aad - Optional additional authenticated data, covered by the GCM tag
 *   but not encrypted. Callers pass the recipient's `projectId|runId` so a
 *   sealed payload cannot be replayed against a different run.
 * @returns `[ephemeral public key (32)][nonce (12)][ciphertext + tag]`
 */
export declare function seal(recipientPublicKey: Uint8Array, data: Uint8Array, aad?: Uint8Array): Promise<Uint8Array>;
/**
 * Open a payload sealed to this run's public key.
 *
 * @param keyPair - The recipient run's keypair, from {@link deriveRunKeyPair}
 * @param sealed - `[ephemeral public key (32)][nonce (12)][ciphertext + tag]`
 * @param aad - The exact additional authenticated data passed to {@link seal}
 * @returns The decrypted plaintext
 */
export declare function open(keyPair: RunKeyPair, sealed: Uint8Array, aad?: Uint8Array): Promise<Uint8Array>;
/**
 * A writer-side session that amortizes one KEM operation across many sealed
 * payloads — use it for streams, where one-shot {@link seal} would perform a
 * fresh keygen + ECDH + HKDF for every frame.
 *
 * Safety rests on two properties:
 *
 * - Every payload still gets a **fresh random nonce** from `aesGcmEncrypt`, so
 *   sharing the content key does not risk `(key, nonce)` reuse. (A counter
 *   would: it restarts at zero whenever a writer restarts.)
 * - The session is bound to one writer instance. A reconnect or a durable
 *   replay constructs a new session, so a restarted writer never inherits a
 *   previous incarnation's content key.
 *
 * The envelope layout is byte-identical to {@link seal}, so a reader cannot
 * tell which was used and needs no matching session.
 */
export declare function createSealSession(recipientPublicKey: Uint8Array, aad?: Uint8Array): {
    seal(data: Uint8Array): Promise<Uint8Array>;
};
/**
 * A reader-side session that caches decapsulation per sender.
 *
 * The mirror of {@link createSealSession}: because every frame from one writer
 * carries the same ephemeral public key, this turns an ECDH per frame into an
 * ECDH per writer. Correctness does not depend on the writer having used a
 * session — a stream of independently sealed payloads simply misses the cache
 * on each new ephemeral key.
 *
 * The cache is keyed by the ephemeral public key and holds one entry, which is
 * the common case (one writer per stream). A second writer evicts the first
 * rather than growing without bound.
 */
export declare function createOpenSession(keyPair: RunKeyPair, aad?: Uint8Array): {
    open(sealed: Uint8Array): Promise<Uint8Array>;
};
/**
 * Build the additional authenticated data that binds a sealed payload to a
 * specific run.
 *
 * Mirrors the `info` used for symmetric per-run key derivation so the two
 * schemes agree on what "this run" means.
 *
 * Note that the sealed-box construction already binds a payload to its
 * recipient without any AAD: the content key is derived over
 * `ephemeralPublicKey ‖ recipientPublicKey`, and a recipient public key is
 * unique per (deployment key × project × run). Replaying a sealed payload at
 * a different run therefore fails at key agreement regardless. AAD is
 * available for callers that want an additional, KDF-independent binding —
 * both sides must supply byte-identical values or the payload will not open.
 */
export declare function runAad(projectId: string, runId: string): Uint8Array;
/**
 * Decode a run's published public key, validating both encoding and length.
 *
 * Returns `undefined` when the value is absent, not valid base64, or not
 * exactly 32 bytes. Callers treat that as "this run has no usable public key"
 * and fall back to the symmetric path, so a corrupt or truncated stored value
 * degrades to the pre-existing behavior instead of failing a resumption.
 */
export declare function decodeRunPublicKey(value: string | undefined): Uint8Array | undefined;
//# sourceMappingURL=sealed-box.d.ts.map