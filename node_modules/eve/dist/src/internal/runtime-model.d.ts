import type { LanguageModel } from "ai";
/**
 * Formats an authored agent model reference as an AI Gateway model id.
 *
 * Handles both authored shapes:
 * - A `string` is treated as an already-formatted Gateway id.
 * - A `LanguageModel` instance is formatted as `${provider}/${modelId}`.
 *
 * Some providers expose `provider` as a dotted sub-path (e.g. `anthropic.messages`,
 * `openai.responses`) to disambiguate request shapes. The Gateway routes on the
 * top-level provider only, so any segments after the first dot are dropped.
 */
export declare function formatLanguageModelGatewayId(model: string | LanguageModel): string;
