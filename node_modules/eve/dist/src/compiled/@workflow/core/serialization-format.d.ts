/**
 * Browser-safe serialization format utilities.
 *
 * This module contains the format prefix handling, generic hydrate/dehydrate
 * dispatch, and shared types/classes used by all environments (runtime, web
 * o11y, CLI o11y). It has NO Node.js dependencies.
 */
/**
 * Re-exported from the envelope layer so browser consumers (web dashboard,
 * web-shared) can resolve key material without importing
 * `@workflow/core/serialization`, whose module graph reaches Node built-ins
 * (`node:util`, `node:async_hooks`) and cannot be bundled for the browser.
 *
 * Everything below is Web Crypto only: `serialization/encryption.ts`,
 * `encryption.ts` and `sealed-box.ts` are all free of Node dependencies.
 */
export { type DecryptionKey, decrypt as decryptEnvelope, deriveRunPayloadKeys, encrypt as encryptEnvelope, isRunPayloadKeys, isSealTarget, type PayloadKey, type RunPayloadKeys, runPayloadKeys, type SealTarget, sealTo, } from './serialization/encryption.js';
export declare const SerializationFormat: {
    /** devalue stringify/parse with TextEncoder/TextDecoder */
    readonly DEVALUE_V1: "devl";
    /** Encrypted payload (inner payload has its own format prefix after decryption) */
    readonly ENCRYPTED: "encr";
    /**
     * Sealed payload — asymmetrically encrypted to a run's X25519 public key
     * (inner payload has its own format prefix after opening).
     *
     * Written by cross-run writers that hold only the recipient run's public
     * key. Opening it requires the run's private scalar rather than the
     * symmetric per-run key, so o11y display treats it as ciphertext via
     * {@link isEncryptedData} but {@link hydrateDataWithKey} does not attempt
     * an AES-GCM decrypt on it.
     */
    readonly SEALED: "encp";
    /** Gzip-compressed payload (inner payload has its own format prefix after decompression) */
    readonly GZIP: "gzip";
    /** Zstandard-compressed payload (inner payload has its own format prefix after decompression) */
    readonly ZSTD: "zstd";
};
export type SerializationFormatType = (typeof SerializationFormat)[keyof typeof SerializationFormat];
/**
 * Encode a payload with a format prefix.
 */
export declare function encodeWithFormatPrefix(format: SerializationFormatType, payload: Uint8Array | unknown): Uint8Array | unknown;
/**
 * Decode a format-prefixed payload.
 */
export declare function decodeFormatPrefix(data: Uint8Array | unknown): {
    format: SerializationFormatType;
    payload: Uint8Array;
};
/**
 * Placeholder string displayed when data is encrypted and decryption
 * has not been requested. Used by both CLI and web o11y.
 */
export declare const ENCRYPTED_PLACEHOLDER = "\uD83D\uDD12 Encrypted";
/**
 * Check if a hydrated value is an expired data stub from the server.
 *
 * The server replaces expired ref fields with a devalue-encoded stub
 * (`makeExpiredStub`) that deserializes to `[{ expiredAt: "<ISO date>" }]`
 * after `unflatten` (array-wrapped due to backwards-compatible encoding).
 * Also matches the unwrapped `{ expiredAt: "..." }` form for robustness.
 */
export declare function isExpiredStub(data: unknown): boolean;
/**
 * Check if a binary value is ciphertext — either a symmetrically encrypted
 * payload ('encr') or a sealed cross-run payload ('encp').
 *
 * This is the predicate display layers want: both schemes are opaque bytes
 * that must not be fed to the devalue parser, and both render as the same
 * "Encrypted" affordance in the CLI and web UI. Use {@link isSealedData} when
 * the *scheme* matters — notably when choosing a decryption path, since a
 * sealed payload needs the run's private scalar rather than its symmetric key.
 *
 * Browser-safe — does not depend on the full serialization module.
 */
export declare function isEncryptedData(data: unknown): boolean;
/**
 * Check if a binary value has the 'encp' format prefix, indicating a sealed
 * (asymmetrically encrypted) cross-run payload.
 *
 * Browser-safe — does not depend on the full serialization module.
 */
export declare function isSealedData(data: unknown): boolean;
/**
 * Check if a binary value has a compression format prefix ('gzip' or 'zstd').
 * Browser-safe — does not depend on the full serialization module.
 */
export declare function isCompressedData(data: unknown): boolean;
/**
 * Register a browser zstd decoder (e.g. a WASM-backed one). The web o11y UI
 * calls this at init so `hydrateDataWithKey` can inflate zstd payloads after
 * client-side decryption. Node readers use `node:zlib` and ignore this.
 */
export declare function registerZstdDecoder(decoder: (payload: Uint8Array) => Promise<Uint8Array>): void;
/**
 * A map of type name → reviver function, used by devalue's `parse`/`unflatten`.
 * Each environment (runtime, web, CLI) provides its own set.
 */
export type Revivers = Record<string, (value: any) => any>;
/**
 * Hydrate (deserialize) a value that was stored in the database.
 *
 * Handles four data shapes:
 * 1. `Uint8Array` with 'encr' prefix → returned as-is (encrypted, not yet decrypted)
 * 2. `Uint8Array` with a format prefix (specVersion 2+) → decode prefix, parse
 * 3. `Array` (legacy specVersion 1, "revived devalue") → unflatten
 * 4. Other (already a plain JS value) → return as-is
 *
 * Encrypted data is intentionally left as a `Uint8Array` so that consumers
 * (CLI, web UI) can detect it with `isEncryptedData()` and decide how to
 * handle it — the CLI replaces it with a styled placeholder, the web UI
 * renders an "Encrypted" card with a Decrypt button that triggers
 * client-side decryption on demand.
 */
export declare function hydrateData(value: unknown, revivers: Revivers): unknown;
/**
 * Hydrate a value, decrypting it first if an encryption key is provided.
 *
 * This is the async version of `hydrateData` that supports transparent
 * decryption. Used by o11y tooling (web UI, CLI) when the user requests
 * decryption.
 *
 * @param value - The value to hydrate (may be encrypted or sealed)
 * @param revivers - Devalue revivers for deserialization
 * @param key - The run's key material. Pass `RunPayloadKeys` (from
 *   `deriveRunPayloadKeys`) to open both symmetric (`encr`) and sealed
 *   (`encp`) payloads; a bare `CryptoKey` opens only the symmetric ones.
 *   Typed as a read capability so a write-only seal target — which could open
 *   neither scheme — is rejected at compile time rather than failing here.
 */
export declare function hydrateDataWithKey(value: unknown, revivers: Revivers, key: import('./serialization/encryption.js').DecryptionKey | undefined): Promise<unknown>;
/** Marker for stream reference objects rendered as links in the UI */
export declare const STREAM_REF_TYPE = "__workflow_stream_ref__";
/** A stream reference for UI display */
export interface StreamRef {
    __type: typeof STREAM_REF_TYPE;
    streamId: string;
}
/** Marker for Run reference objects rendered as links in the UI */
export declare const RUN_REF_TYPE = "__workflow_run_ref__";
/** A Run reference for UI display */
export interface RunRef {
    __type: typeof RUN_REF_TYPE;
    runId: string;
}
/** Check if a value is a RunRef object */
export declare const isRunRef: (value: unknown) => value is RunRef;
/** Convert a serialized Run value to a RunRef for display */
export declare const serializedRunToRunRef: (value: {
    runId: string;
}) => RunRef;
/** Marker for custom class instance references */
export declare const CLASS_INSTANCE_REF_TYPE = "__workflow_class_instance_ref__";
/**
 * A class instance reference for o11y display.
 *
 * Browser-safe base class — no `util.inspect.custom`. Environment-specific
 * rendering (CLI inspect, web component) is handled by each consumer.
 */
export declare class ClassInstanceRef {
    readonly className: string;
    readonly classId: string;
    readonly data: unknown;
    readonly __type = "__workflow_class_instance_ref__";
    constructor(className: string, classId: string, data: unknown);
    toJSON(): {
        __type: string;
        className: string;
        classId: string;
        data: unknown;
    };
}
/** Check if a value is a ClassInstanceRef object */
export declare const isClassInstanceRef: (value: unknown) => value is ClassInstanceRef;
/** Check if a value is a stream ID string */
export declare const isStreamId: (value: unknown) => boolean;
/** Check if a value is a StreamRef object */
export declare const isStreamRef: (value: unknown) => value is StreamRef;
/**
 * Convert a serialized stream value to a StreamRef for display.
 */
export declare const streamToStreamRef: (value: any) => StreamRef;
/** Convert a serialized step function to a display string */
export declare const serializedStepFunctionToString: (value: unknown) => string;
/** Extract the class name from a classId */
export declare const extractClassName: (classId: string) => string;
/** Convert a serialized class instance to a ClassInstanceRef for display.
 *  Run instances are special-cased to a RunRef for clickable rendering. */
export declare const serializedInstanceToRef: (value: {
    classId: string;
    data: unknown;
}) => ClassInstanceRef | RunRef;
/** Convert a serialized class reference to a display string */
export declare const serializedClassToString: (value: {
    classId: string;
}) => string;
/**
 * Standard o11y revivers that override runtime-specific types with
 * display-friendly values. Used by both web and CLI hydration.
 */
export declare const observabilityRevivers: Revivers;
/**
 * Hydrate the serialized data fields of any resource for o11y display.
 *
 * Dispatches by resource type (step, hook, event, workflow) and calls
 * `hydrateData` with the provided revivers for each data field.
 *
 * Each environment (web, CLI) provides its own revivers — this function
 * only handles the dispatch logic and field mapping.
 */
export declare function hydrateResourceIO<T extends {
    stepId?: string;
    hookId?: string;
    eventId?: string;
    eventType?: string;
    input?: any;
    output?: any;
    metadata?: any;
    eventData?: any;
    executionContext?: any;
}>(resource: T, revivers: Revivers): T;
/** Extract all stream IDs from a value (recursively traverses objects/arrays) */
export declare function extractStreamIds(obj: unknown): string[];
/** Truncate a string to a maximum length, adding ellipsis if needed */
export declare function truncateId(id: string, maxLength?: number): string;
//# sourceMappingURL=serialization-format.d.ts.map