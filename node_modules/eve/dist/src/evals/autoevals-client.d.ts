import { generateText, type LanguageModel } from "ai";
import { Factuality } from "autoevals";
/**
 * The OpenAI-shaped client surface autoevals expects. Extracted from the
 * library so we don't take a direct dependency on `openai` types.
 */
type AutoevalsClient = NonNullable<Parameters<typeof Factuality>[0]["client"]>;
type ProviderOptions = Parameters<typeof generateText>[0]["providerOptions"];
interface AutoevalsClientConfig {
    readonly languageModel: LanguageModel;
    readonly providerOptions?: ProviderOptions;
}
export declare function createAutoevalsClient(config: AutoevalsClientConfig): AutoevalsClient;
export {};
