import { type SemanticErrorRule } from "../rule.js";
/**
 * Error class names and body `type` discriminators are verified against
 * the vendored `@ai-sdk/gateway` source: the `Gateway*Error` classes and
 * the body types `authentication_error`, `invalid_request_error`,
 * `model_not_found`, `rate_limit_exceeded`, `timeout_error`,
 * `internal_server_error` all appear there verbatim. `overloaded_error`
 * is not gateway vocabulary — it is the Anthropic upstream error type the
 * gateway relays on provider overload.
 */
export declare const GATEWAY_RULES: readonly SemanticErrorRule[];
