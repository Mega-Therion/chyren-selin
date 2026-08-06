import type { Theme } from "./theme.js";
import type { LogDisplayMode } from "./log-display-mode.js";
import type { RemoteConnectionSnapshot } from "./remote-connection.js";
import type { VercelStatusSnapshot } from "./vercel-status.js";
import type { ModelEndpointStatus } from "#shared/model-endpoint-status.js";
export interface StatusLineInput {
    /** Port of the connected local development server; omitted for remote sessions. */
    serverPort?: string;
    /** Resolved model slug, e.g. "anthropic/claude-sonnet-5"; absent when `/eve/v1/info` failed. */
    model?: string;
    /** Authored reasoning effort, rendered bold after the model id, e.g. `(xhigh)`. */
    reasoning?: string;
    /** True when the Gateway priority tier is on; renders a `»fast` marker. */
    fastMode?: boolean;
    /**
     * Transient dev-TUI log-display mode shown after a Ctrl+L cycle, e.g.
     * `sandbox`. Rendered as a prominent leading `logs: <mode>` segment that
     * survives width degradation and can stand alone; absent once the hint times
     * out.
     */
    logLevel?: LogDisplayMode;
    /** Model endpoint readiness: external, or AI Gateway connected/not-connected. */
    endpoint?: ModelEndpointStatus;
    /** Workspace-scoped Vercel state; identity absent while unlinked or still resolving. */
    vercel?: VercelStatusSnapshot;
    /** Remote server identity and its current connection/authentication state. */
    remote?: RemoteConnectionSnapshot;
    theme: Theme;
    width: number;
}
/**
 * Builds a leading local `:port` or remote badge followed by the model (with
 * its reasoning level and Fast mode marker), and endpoint
 * segments. Both badges are the final narrow-width fallback. Remote sessions
 * omit endpoint state. Returns undefined when every segment is empty.
 */
export declare function buildStatusLine(input: StatusLineInput): string | undefined;
