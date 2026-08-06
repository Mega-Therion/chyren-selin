/**
 * Workflow mode serialization.
 *
 * Provides serialize/deserialize for use inside the workflow execution
 * environment (QuickJS VM or Node.js vm). It is:
 * - Synchronous (no async operations)
 * - No encryption (encryption is handled outside the VM on the host side)
 *
 * Designed to be bundled into the workflow code by esbuild and executed
 * inside the sandboxed VM.
 */
import type { CodecOptions } from './codec.js';
/**
 * Serialize a value for storage/transmission from the workflow environment.
 *
 * @param value - The value to serialize
 * @param options - Optional global, extra reducers/revivers for VM-context serialization
 * @returns Format-prefixed serialized bytes
 */
export declare function serialize(value: unknown, options?: CodecOptions): Uint8Array;
/**
 * Deserialize a value received in the workflow environment.
 *
 * @param data - Format-prefixed serialized bytes, or legacy data
 * @param options - Optional global, extra revivers for VM-context deserialization
 * @returns The deserialized value
 */
export declare function deserialize(data: Uint8Array | unknown, options?: CodecOptions): unknown;
//# sourceMappingURL=workflow.d.ts.map