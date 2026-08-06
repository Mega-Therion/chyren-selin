export declare const WORKFLOW_USE_STEP: unique symbol;
export declare const WORKFLOW_SET_ATTRIBUTES: unique symbol;
export declare const WORKFLOW_CREATE_HOOK: unique symbol;
export declare const WORKFLOW_SLEEP: unique symbol;
export declare const WORKFLOW_CONTEXT: unique symbol;
export declare const WORKFLOW_GET_STREAM_ID: unique symbol;
export declare const STABLE_ULID: unique symbol;
export declare const STREAM_NAME_SYMBOL: unique symbol;
export declare const STREAM_TYPE_SYMBOL: unique symbol;
export declare const STREAM_FRAMING_SYMBOL: unique symbol;
/**
 * Stamped on a real `WritableStream` (the user-visible `serialize.writable`
 * returned from a step-side reviver or step-context `getWritable()`) to
 * record the `runId` of the workflow run that owns the underlying server
 * stream. Used together with `STREAM_NAME_SYMBOL`.
 *
 * When `getExternalReducers.WritableStream` (the dehydration path used by
 * `start()`) sees both symbols on a writable, it includes the `runId` in
 * the descriptor it emits. The child run's step-side reviver then opens
 * a server writable against the original `(runId, name)` and resolves
 * that run's encryption key directly — so the child's writes land on
 * the parent's stream as-is, with no client process in the loop. That
 * keeps the forwarding alive for the full lifetime of the child run,
 * not just for the parent step that initiated `start()`.
 */
export declare const STREAM_SERVER_RUN_ID_SYMBOL: unique symbol;
/**
 * Stamped alongside `STREAM_SERVER_RUN_ID_SYMBOL` when the deployment that
 * owns a forwarded writable stream is known. Cross-deployment consumers use
 * it to resolve the owning run's encryption key without loading the run first.
 */
export declare const STREAM_SERVER_DEPLOYMENT_ID_SYMBOL: unique symbol;
/**
 * Stamped alongside `STREAM_SERVER_RUN_ID_SYMBOL` with the owning run's
 * X25519 public key (base64), when the run has one.
 *
 * This is what lets a forwarded writable be written to across a deployment
 * boundary at zero cost. The owning run derives its own public key locally
 * when it creates the stream, so the key travels inside the serialized
 * descriptor; a child on another deployment can then seal frames immediately.
 * Without it the child would have to either fetch the owning run or fetch its
 * symmetric key from the API — the round trip this whole mechanism exists to
 * avoid.
 */
export declare const STREAM_SERVER_PUBLIC_KEY_SYMBOL: unique symbol;
/**
 * Stamped on a `WorkflowServerWritableStream` instance to expose its
 * durability barrier: `() => Promise<void>` that resolves once every accepted
 * chunk has durably reached the server (nothing buffered, nothing in flight)
 * and rejects if any dispatch failed.
 *
 * The sink acks `write()` on buffer entry (group-commit batching), so
 * durability tracking lives here instead: `flushablePipe` feature-detects
 * this and awaits it before resolving its lock-release completion, keeping
 * the invariant that a step cannot complete while stream data is still
 * client-side. Sinks without it are fully durable per `write()` already.
 */
export declare const STREAM_DRAIN_SYMBOL: unique symbol;
export declare const BODY_INIT_SYMBOL: unique symbol;
export declare const WEBHOOK_RESPONSE_WRITABLE: unique symbol;
/**
 * Symbol used to store the class registry on globalThis in workflow mode.
 * This allows the deserializer to find classes by classId in the VM context.
 */
export declare const WORKFLOW_CLASS_REGISTRY: unique symbol;
export declare const ABORT_STREAM_NAME: unique symbol;
export declare const ABORT_HOOK_TOKEN: unique symbol;
export declare const ABORT_LISTENER_ATTACHED: unique symbol;
export declare const ABORT_READER_CANCEL: unique symbol;
//# sourceMappingURL=symbols.d.ts.map