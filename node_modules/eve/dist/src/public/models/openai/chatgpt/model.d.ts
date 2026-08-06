import type { LanguageModelV4 } from "#compiled/@ai-sdk/provider/index.js";
import { type CodexTransportOptions } from "./transport.js";
/** Configures the Codex model selected by the local Codex login. */
export interface CodexModelOptions {
    /** OpenAI model ID passed to the Codex Responses endpoint, for example `gpt-5.6-sol`. */
    readonly model: string;
}
export declare function createCodexSubscriptionModel(input: CodexModelOptions, options?: CodexTransportOptions): LanguageModelV4;
