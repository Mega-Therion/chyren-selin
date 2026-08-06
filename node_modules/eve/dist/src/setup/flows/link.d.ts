import { type GatewayCredentialResolution } from "#internal/resolve-model-endpoint-status.js";
import { type ApplyAiGatewayCredentialDeps } from "../boxes/apply-ai-gateway-credential.js";
import { findEnvFileWithKey } from "../boxes/detect-ai-gateway.js";
import { type LinkProjectDeps } from "../boxes/link-project.js";
import { type ResolveProvisioningDeps } from "../boxes/resolve-provisioning.js";
import { detectProjectIdentity } from "../project-resolution.js";
import type { Prompter } from "../prompter.js";
/** Injected for tests; defaults to the real detection and box effects. */
export interface LinkFlowDeps {
    detectProjectIdentity: typeof detectProjectIdentity;
    findEnvFileWithKey: typeof findEnvFileWithKey;
    /** Shell environment probed for a gateway key that would shadow OIDC. */
    env: Record<string, string | undefined>;
    resolveProvisioning?: ResolveProvisioningDeps;
    linkProject?: LinkProjectDeps;
    applyAiGatewayCredential?: ApplyAiGatewayCredentialDeps;
}
export type LinkFlowResult = {
    kind: "done";
    /**
     * The credential the runtime will actually resolve, from the one
     * precedence authority ({@link resolveGatewayCredential}): a gateway
     * API key — env file or shell — outranks the pulled OIDC token.
     */
    resolution?: GatewayCredentialResolution;
} | {
    kind: "cancelled";
};
/**
 * THE LINK FLOW, shared by `eve link` and the dev TUI `/model` menu's provider row (its
 * "Connect via a project" branch): the same
 * team/project pickers onboarding uses, then the actual `vercel link`, then a
 * `vercel env pull` so the AI Gateway credential lands in `.env.local`.
 *
 * Re-link semantics: an already-linked directory shows its current link as a
 * gate — one "Link to another project" option; Esc keeps the link and folds
 * to cancelled — and only then runs the pickers. The new choice is
 * authoritative (the state seeds an unresolved project so no stale link leaks
 * into the boxes). Reaching this flow IS the "use Vercel" decision, so
 * resolve-provisioning's deploy gate is pre-answered.
 *
 * Ends by verifying a model credential actually landed (`VERCEL_OIDC_TOKEN`
 * or `AI_GATEWAY_API_KEY` in an env file) — an env pull can succeed without
 * granting gateway access, and the difference is what the user acts on next.
 * The reported credential mirrors runtime resolution — `AI_GATEWAY_API_KEY`
 * (env file or shell) outranks the OIDC token, exactly as the AI SDK gateway
 * provider resolves it — so the outcome message, the status bar, and the
 * actual authentication can never disagree.
 */
export declare function runLinkFlow(input: {
    appRoot: string;
    prompter: Prompter;
    signal?: AbortSignal;
    /**
     * Whether the caller may only link an existing project (`eve link`, the
     * default) or may also create one (the `/model` "Connect via a project"
     * branch, where a fresh agent has no project yet).
     */
    projectSelection?: "create-or-link" | "existing-only";
    teamSelectMessage?: (currentTeam: string) => string;
    deps?: Partial<LinkFlowDeps>;
}): Promise<LinkFlowResult>;
