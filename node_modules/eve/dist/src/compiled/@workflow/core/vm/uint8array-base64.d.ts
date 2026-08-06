/**
 * Polyfill for the TC39 Uint8Array base64/hex proposal (Stage 4).
 *
 * Implements:
 *  - Uint8Array.prototype.toBase64([options])
 *  - Uint8Array.prototype.toHex()
 *  - Uint8Array.fromBase64(string[, options])
 *  - Uint8Array.fromHex(string)
 *  - Uint8Array.prototype.setFromBase64(string[, options])
 *  - Uint8Array.prototype.setFromHex(string)
 *
 * @see https://tc39.es/proposal-arraybuffer-base64/spec/
 */
/**
 * Installs the Uint8Array base64/hex polyfill onto the given
 * Uint8Array constructor and prototype. This is designed to be
 * used inside the workflow VM context, operating on the VM's
 * own Uint8Array rather than the host's.
 */
export declare function installUint8ArrayBase64(Uint8ArrayCtor: typeof Uint8Array): void;
//# sourceMappingURL=uint8array-base64.d.ts.map