/**
 * Common reducers and revivers for types shared across all serialization modes.
 *
 * Handles: ArrayBuffer, BigInt, typed arrays, Date, Error, Headers, Map, Set,
 * RegExp, Request, Response, URL, URLSearchParams.
 *
 * Note: Uses Node.js Buffer for base64 encoding/decoding. For environments
 * without Buffer (e.g. QuickJS VM), a polyfill or alternative base64
 * implementation will be needed.
 */
import type { Reducers, Revivers } from '../types.js';
declare function revive(str: string): any;
export declare function getCommonReducers(_global?: Record<string, any>): Partial<Reducers>;
export declare function getCommonRevivers(global?: Record<string, any>): Partial<Revivers>;
export { revive };
//# sourceMappingURL=common.d.ts.map