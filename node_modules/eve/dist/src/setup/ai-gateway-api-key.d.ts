import { appendEnv } from "./append-env.js";
export declare const AI_GATEWAY_API_KEY_ENV_VAR = "AI_GATEWAY_API_KEY";
export declare const AI_GATEWAY_API_KEY_ENV_FILE = ".env.local";
/** The location written by eve when a user supplies an AI Gateway API key. */
export interface AiGatewayApiKeyLocation {
    envKey: typeof AI_GATEWAY_API_KEY_ENV_VAR;
    envFile: typeof AI_GATEWAY_API_KEY_ENV_FILE;
    envPath: string;
}
/** Trims and saves an explicit AI Gateway API key, replacing any prior value. */
export declare function writeAiGatewayApiKey(input: {
    projectRoot: string;
    apiKey: string;
    appendEnv?: typeof appendEnv;
}): Promise<AiGatewayApiKeyLocation>;
