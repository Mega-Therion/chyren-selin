import type { DockerCli } from "#execution/sandbox/bindings/docker-cli.js";
import type { SandboxNetworkPolicy } from "#shared/sandbox-network-policy.js";
/**
 * Applies a coarse-grained run-time network policy by attaching or
 * detaching the container's networks. Domain-level policies and
 * credential brokering require the firewall on the Vercel backend.
 */
export declare function setDockerNetworkPolicy(cli: DockerCli, containerName: string, policy: SandboxNetworkPolicy): Promise<void>;
