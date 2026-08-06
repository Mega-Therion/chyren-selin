/**
 * Composable encryption layer for serialized data.
 *
 * Wraps/unwraps serialized payloads with either symmetric AES-256-GCM
 * encryption (`encr`) or an asymmetric sealed box (`encp`), using the format
 * prefix system to mark which. See {@link PayloadKey} for how a caller
 * declares which capabilities it holds.
 */
import { type CryptoKey } from '../encryption.js';
import { type RunKeyPair } from '../sealed-box.js';
export type { CryptoKey, RunKeyPair };
/**
 * Brands distinguishing the structured key variants from a bare `CryptoKey`.
 *
 * `Symbol.for` rather than `Symbol()` because these values cross realm
 * boundaries (host ↔ workflow VM), and the global symbol registry is shared
 * across realms while unique symbols are not.
 */
declare const SEAL_TARGET_BRAND: unique symbol;
declare const RUN_KEYS_BRAND: unique symbol;
/**
 * A write-only capability: seal payloads to a run's X25519 public key.
 *
 * This is what a *cross-run* writer holds — a hook resumption targeting
 * another run, or a child workflow writing into a parent's forwarded stream.
 * It carries no ability to decrypt anything, and because it is a distinct
 * nominal type it cannot be mistaken for symmetric key material.
 *
 * That last property matters more than it looks: a raw 32-byte X25519 public
 * key is a *structurally valid* AES-256 key, so handing one to
 * `importKey(..., 'AES-GCM')` succeeds and silently produces ciphertext that
 * nobody can ever open. Routing public keys exclusively through
 * {@link sealTo} makes that mistake unrepresentable rather than merely
 * discouraged.
 */
export interface SealTarget {
    readonly [SEAL_TARGET_BRAND]: true;
    /** The recipient run's raw 32-byte X25519 public key. */
    readonly recipientPublicKey: Uint8Array;
    /** Additional authenticated data binding the payload to the recipient run. */
    readonly aad?: Uint8Array;
}
/**
 * The full key capability of a run's *own* runtime (and of o11y tooling
 * acting on its behalf): the symmetric key for its own payloads, plus the
 * keypair needed to open sealed payloads that other runs wrote to it.
 */
export interface RunPayloadKeys {
    readonly [RUN_KEYS_BRAND]: true;
    /** Symmetric AES-256-GCM key — the run's own `encr` payloads. */
    readonly aes: CryptoKey;
    /** X25519 keypair — opens `encp` payloads sealed to this run. */
    readonly keyPair: RunKeyPair;
    /** Additional authenticated data expected on sealed payloads. */
    readonly aad?: Uint8Array;
}
/**
 * A resolved key for reading or writing a serialized payload.
 *
 * The bare `CryptoKey` variant is the historical shape and remains valid: it
 * means "symmetric only", which is exactly right for a run that predates
 * sealed boxes or for any same-run payload. The structured variants are
 * additive:
 *
 * | Variant            | Writes  | Reads          | Held by                  |
 * | ------------------ | ------- | -------------- | ------------------------ |
 * | `CryptoKey`        | `encr`  | `encr`         | same-run (legacy shape)  |
 * | {@link RunPayloadKeys} | `encr`  | `encr`, `encp` | the owning run, o11y     |
 * | {@link SealTarget} | `encp`  | —              | cross-run writers        |
 *
 * A run's own payloads deliberately stay symmetric even when the writer could
 * seal: sealing costs a fresh ECDH per envelope and 32 extra bytes, and buys
 * nothing when the writer already holds the decryption key.
 */
export type PayloadKey = CryptoKey | SealTarget | RunPayloadKeys;
/**
 * The subset of {@link PayloadKey} that can actually *read* a payload.
 *
 * Excludes {@link SealTarget}, which is write-only by construction: it holds a
 * public key, so it can open neither `encp` (needs the private scalar) nor
 * `encr` (needs the symmetric key). Decrypt-side signatures should take this
 * rather than `PayloadKey`, so passing a seal target is a compile error instead
 * of a guaranteed runtime failure.
 */
export type DecryptionKey = CryptoKey | RunPayloadKeys;
/**
 * Build a write-only seal capability for a recipient run's public key.
 *
 * @param recipientPublicKey - The recipient run's raw 32-byte X25519 public key
 * @param aad - Additional authenticated data, conventionally `runAad(projectId, runId)`
 */
export declare function sealTo(recipientPublicKey: Uint8Array, aad?: Uint8Array): SealTarget;
/**
 * Bundle a run's symmetric key with the keypair that opens payloads sealed
 * to it.
 */
export declare function runPayloadKeys(aes: CryptoKey, keyPair: RunKeyPair, aad?: Uint8Array): RunPayloadKeys;
/**
 * Build the full key capability for a run from its raw 32-byte key material —
 * the value `World.getEncryptionKeyForRun()` returns.
 *
 * Use this anywhere a run reads its own event log: it yields a key that opens
 * both its own symmetric (`encr`) payloads and sealed (`encp`) payloads other
 * runs wrote to it. Resolving only `importKey(material)` would leave the
 * reader unable to open sealed writes.
 */
export declare function deriveRunPayloadKeys(runKeyMaterial: Uint8Array): Promise<RunPayloadKeys>;
export declare function isSealTarget(value: unknown): value is SealTarget;
export declare function isRunPayloadKeys(value: unknown): value is RunPayloadKeys;
/**
 * The symmetric key to use for `encr` operations, or undefined when this key
 * has no symmetric capability (i.e. it is a seal-only target).
 */
export declare function aesKeyOf(key: PayloadKey | undefined): CryptoKey | undefined;
/**
 * Encryption key parameter type. Accepts a resolved key, undefined (no encryption),
 * a promise, or a resolver that can defer fetching the key until data needs it.
 */
export type EncryptionKeyParam = PayloadKey | undefined | Promise<PayloadKey | undefined> | (() => Promise<PayloadKey | undefined>);
export declare function resolveEncryptionKey(key: EncryptionKeyParam): Promise<PayloadKey | undefined>;
/**
 * Encrypt a format-prefixed payload if a key is provided.
 *
 * Wraps the data with the `encr` prefix for symmetric keys, or the `encp`
 * prefix when handed a {@link SealTarget} — a cross-run writer that holds only
 * the recipient's public key.
 *
 * @param data - The format-prefixed serialized data
 * @param key - Encryption key (undefined to skip encryption)
 * @returns The encrypted data with its format prefix, or the original data if no key
 */
export declare function encrypt(data: Uint8Array | unknown, key: PayloadKey | undefined): Promise<Uint8Array | unknown>;
export declare function decrypt(data: Uint8Array | unknown, key: PayloadKey | undefined): Promise<Uint8Array | unknown>;
//# sourceMappingURL=encryption.d.ts.map