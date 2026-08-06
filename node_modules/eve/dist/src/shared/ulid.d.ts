/**
 * ULID-compatible generation, vendored rather than taken from npm: the
 * `ulid` package's Node build hard-imports `node:crypto`, and this module is
 * bundled into browser clients, the Nitro server, and the workflow step
 * sandbox. `ulid.test.ts` pins the encoding against the reference
 * implementation's golden vectors.
 */
/** Character count of a ULID: a 10-char timestamp then a 16-char random tail. */
export declare const ULID_LENGTH: number;
/** Mints one ULID. See {@link createUlidFactory}. */
export type UlidFactory = () => string;
/**
 * Creates an independent ULID generator with its own monotonic state.
 *
 * Prefer {@link createUlid} unless a caller needs a sequence that unrelated
 * code cannot perturb. Ids sort in the order one generator produced them:
 * those minted within a millisecond increment the random tail, and a
 * backwards clock pins to the last millisecond observed.
 */
export declare function createUlidFactory(): UlidFactory;
/**
 * Mints a ULID from the process-wide generator: a 48-bit millisecond
 * timestamp then 80 bits of randomness, in Crockford base32.
 *
 * Ids lead with their timestamp, so they are broadly time-ordered. Ordering
 * holds within one process only — separate processes have independent clocks
 * and random tails — so a ULID is not a lossless pagination cursor.
 *
 * Throws when the clock is outside the 48-bit timestamp range or Web Crypto
 * is unavailable rather than weakening the randomness.
 */
export declare const createUlid: UlidFactory;
/**
 * Returns true when `value` is shaped like a ULID: {@link ULID_LENGTH}
 * characters drawn from the Crockford base32 alphabet.
 *
 * Shape-only — this does not prove the value was minted here.
 */
export declare function isUlid(value: string): boolean;
