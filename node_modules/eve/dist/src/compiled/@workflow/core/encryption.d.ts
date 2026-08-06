/**
 * Browser-compatible AES-256-GCM encryption module.
 *
 * Uses the Web Crypto API (`globalThis.crypto.subtle`) which works in
 * both modern browsers and Node.js 20+. This module is intentionally
 * free of Node.js-specific imports so it can be bundled for the browser.
 *
 * The World interface (`getEncryptionKeyForRun`) returns a raw 32-byte
 * AES-256 key. Callers should use `importKey()` once to convert it to a
 * `CryptoKey`, then pass that to `encrypt()`/`decrypt()` for all
 * operations within the same run. This avoids repeated `importKey()`
 * calls on every encrypt/decrypt invocation.
 *
 * Wire format: `[nonce (12 bytes)][ciphertext + auth tag]`
 * The `encr` format prefix is NOT part of this module — it's added/stripped
 * by the serialization layer in `maybeEncrypt`/`maybeDecrypt`.
 */
export type CryptoKey = import('node:crypto').webcrypto.CryptoKey;
/** AES-GCM nonce length in bytes. */
export declare const NONCE_LENGTH = 12;
/** AES-GCM authentication tag length in bits. */
export declare const TAG_LENGTH = 128;
/** AES-GCM authentication tag length in bytes. */
export declare const TAG_BYTES: number;
/**
 * Import a raw AES-256 key as a `CryptoKey` for use with `encrypt()`/`decrypt()`.
 *
 * Callers should call this once per run (after `getEncryptionKeyForRun()`)
 * and pass the resulting `CryptoKey` to all subsequent encrypt/decrypt calls.
 *
 * Pass `usages: ['encrypt']` (or `['decrypt']`) for cross-run scenarios
 * where the caller should not be able to perform the inverse operation
 * with the key — for example a child workflow writing into a parent
 * run's forwarded WritableStream only needs to encrypt, never decrypt.
 *
 * @param raw - Raw 32-byte AES-256 key (from World.getEncryptionKeyForRun)
 * @param usages - Key usages. Defaults to `['encrypt', 'decrypt']`.
 * @returns CryptoKey ready for AES-GCM operations
 */
export declare function importKey(raw: Uint8Array, usages?: ReadonlyArray<'encrypt' | 'decrypt'>): Promise<import("crypto").webcrypto.CryptoKey>;
/**
 * Encrypt data using AES-256-GCM.
 *
 * @param key - CryptoKey from `importKey()`
 * @param data - Plaintext to encrypt
 * @param aad - Optional additional authenticated data. Not encrypted, but
 *   covered by the GCM auth tag: decryption fails unless the exact same
 *   bytes are supplied. Used by the sealed-box layer to bind ciphertext to
 *   a `projectId|runId` context. Omit for no AAD (the legacy behavior).
 * @returns `[nonce (12 bytes)][ciphertext + GCM auth tag]`
 */
export declare function encrypt(key: CryptoKey, data: Uint8Array, aad?: Uint8Array): Promise<Uint8Array>;
/**
 * Decrypt data using AES-256-GCM.
 *
 * Any failure inside the Web Crypto layer — most commonly an
 * `OperationError: The operation failed for an operation-specific reason`
 * raised by `AESCipherJob.onDone` when the GCM authentication tag does
 * not verify — is rewrapped as {@link RuntimeDecryptionError}. The
 * wrapped error carries the original DOMException as `cause`, plus a
 * small diagnostic context (`operation`, input `byteLength`) to help
 * disambiguate ciphertext corruption from key mismatch from truncated
 * transport reads.
 *
 * Note: `data` is the raw AES payload (`[nonce][ciphertext + tag]`), not a
 * format-prefixed envelope — callers strip the `encr` marker via
 * `decodeFormatPrefix()` before reaching this function. The outer
 * envelope's format prefix is therefore attached by the serialization
 * layer (`serialization/encryption.ts`), which is the layer that has it.
 *
 * @param key - CryptoKey from `importKey()`
 * @param data - `[nonce (12 bytes)][ciphertext + GCM auth tag]`
 * @param aad - Optional additional authenticated data. Must match the bytes
 *   passed to {@link encrypt} exactly, otherwise the GCM tag fails to verify
 *   and a {@link RuntimeDecryptionError} is thrown.
 * @returns Decrypted plaintext
 */
export declare function decrypt(key: CryptoKey, data: Uint8Array, aad?: Uint8Array): Promise<Uint8Array>;
//# sourceMappingURL=encryption.d.ts.map