import { type SemanticErrorRule } from "../rule.js";
/**
 * Discriminators verified against the vendored `@ai-sdk/provider` /
 * `@ai-sdk/provider-utils` source: the error classes set
 * `name = "AI_LoadAPIKeyError"` / `"AI_UnsupportedFunctionalityError"`,
 * and `loadApiKey` builds its message as
 * `"<provider> API key is missing. Pass it using the …"`. The bare
 * `LoadAPIKeyError` spelling is defensive, for provider adapters that
 * rethrow under the unprefixed class name.
 */
export declare const MODEL_PROVIDER_RULES: readonly SemanticErrorRule[];
