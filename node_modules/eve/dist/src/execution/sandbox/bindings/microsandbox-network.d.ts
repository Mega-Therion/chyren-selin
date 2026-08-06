import type { SandboxNetworkPolicy } from "#shared/sandbox-network-policy.js";
import type { NetworkPolicy as MicrosandboxNetworkPolicy, SandboxBuilder as MicrosandboxSandboxBuilder } from "microsandbox";
interface MicrosandboxTransformHeaderRule {
    readonly domain: string;
    readonly headers: Readonly<Record<string, string>>;
    readonly match?: unknown;
    readonly placeholderHeaders: Readonly<Record<string, string>>;
}
export interface MicrosandboxNetworkPlan {
    readonly disabled: boolean;
    readonly policy: MicrosandboxNetworkPolicy | null;
    readonly transformHeaderRules: readonly MicrosandboxTransformHeaderRule[];
}
export declare function applyMicrosandboxNetwork(builder: MicrosandboxSandboxBuilder, networkPolicy: SandboxNetworkPolicy | undefined): MicrosandboxSandboxBuilder;
export declare function serializeMicrosandboxNetworkPolicyJson(policy: MicrosandboxNetworkPolicy): string;
export declare function createMicrosandboxNetworkPlan(policy: SandboxNetworkPolicy | undefined): MicrosandboxNetworkPlan;
export declare function createTransformBrokerEnvironment(plan: MicrosandboxNetworkPlan): Readonly<Record<string, string>>;
export {};
