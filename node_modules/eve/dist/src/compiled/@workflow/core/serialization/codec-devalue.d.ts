/**
 * Devalue codec implementation.
 *
 * Uses the `devalue` library for serialization. Handles custom types via
 * reducers (serialize) and revivers (deserialize) which are composed
 * internally based on the serialization mode.
 *
 * The reducer/reviver pattern is specific to devalue — other codecs
 * (CBOR, JSON) would handle types differently (e.g. CBOR supports Date,
 * typed arrays, Map, Set natively).
 */
import type { Codec } from './codec.js';
export declare const devalueCodec: Codec;
//# sourceMappingURL=codec-devalue.d.ts.map