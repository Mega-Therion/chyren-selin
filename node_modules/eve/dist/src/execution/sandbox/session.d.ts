import type { InternalSandboxSession, SandboxSession } from "#shared/sandbox-session.js";
import type { SandboxNetworkPolicy } from "#shared/sandbox-network-policy.js";
export type { InternalSandboxSession };
/**
 * Builds a public {@link SandboxSession} from backend-specific primitives.
 *
 * Encoding handling, line-range slicing, and the binary/text/stream
 * variants live here so each backend only has to implement byte-oriented
 * read/write primitives. `run` is implemented as a thin wrapper over the
 * backend's `spawn`: collect stdout/stderr to strings, await `wait()`,
 * then return the combined result.
 *
 * `setNetworkPolicy` applies a firewall policy to the live sandbox. It
 * defaults to a no-op so backends without a firewall (and test doubles)
 * need not supply one; the Vercel backend wires it to `sandbox.update`.
 */
export declare function buildSandboxSession(primitives: InternalSandboxSession, setNetworkPolicy?: (policy: SandboxNetworkPolicy) => Promise<void>): SandboxSession;
