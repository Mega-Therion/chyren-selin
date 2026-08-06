import { appendEnv } from "../append-env.js";
import type { Prompter } from "../prompter.js";
import { runVercelEnvPull } from "../run-vercel-link.js";
import { type ResolvedAiGatewayCredentials, type SetupState } from "../state.js";
import type { SetupBox } from "../step.js";
import { detectAiGatewayResolution } from "./detect-ai-gateway.js";
/** Injected for tests; defaults to the real env-file and Vercel helpers. */
export interface ApplyAiGatewayCredentialDeps {
    appendEnv: typeof appendEnv;
    runVercelEnvPull: typeof runVercelEnvPull;
    detectAiGatewayResolution: typeof detectAiGatewayResolution;
}
export interface ApplyAiGatewayCredentialOptions {
    /** Reports credential progress and warnings. The box never prompts through it. */
    prompter: Prompter;
    deps?: ApplyAiGatewayCredentialDeps;
}
/**
 * THE AI GATEWAY CREDENTIAL BOX. Executes the resolved {@link ResolvedAiGateway}
 * after the project link is settled. It carries nothing about the project
 * decision: whether a project is linked is read from `state.project` (set by
 * the link box), and the credential choice is read from `state.aiGateway`
 * (set by the resolve-provisioning box). The gather prompts for nothing;
 * `perform` owns all the work: `byok` writes a pasted AI Gateway key, `inherit` pulls the
 * linked project's OIDC gateway, and `byop` leaves provider credentials to the
 * scaffolded provider block.
 */
export declare function applyAiGatewayCredential(options: ApplyAiGatewayCredentialOptions): SetupBox<SetupState, null, ResolvedAiGatewayCredentials>;
