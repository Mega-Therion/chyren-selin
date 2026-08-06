import { type AiGatewayEnvFile, type ResolvedAiGatewayCredentials, type SetupState } from "../state.js";
import type { SetupBox } from "../step.js";
/**
 * Returns the first env file (`.env.local`, then `.env`) defining a non-empty
 * value for `key`, or `undefined` when neither does. Exported for flows that
 * verify credentials landed after a `vercel env pull` (the `eve link` flow
 * checks both `VERCEL_OIDC_TOKEN` and `AI_GATEWAY_API_KEY`).
 */
export declare function findEnvFileWithKey(projectRoot: string, key: string): Promise<AiGatewayEnvFile | undefined>;
export declare function detectAiGatewayResolution(projectRoot: string): Promise<ResolvedAiGatewayCredentials>;
/**
 * THE AI GATEWAY DETECTION BOX: reads the scaffolded project's `.env.local` and
 * `.env` for an existing `AI_GATEWAY_API_KEY` so the credential step can skip
 * work already done. Pure detection: it prompts for nothing, so the single
 * gather produces an empty input in every mode.
 */
export declare function detectAiGateway(): SetupBox<SetupState, null, ResolvedAiGatewayCredentials>;
