/**
 * The AI Gateway service tier a model's `providerOptions` requests:
 * `standard` (no tier authored), the `priority` tier eve's Fast mode writes,
 * or any other authored `custom` tier value.
 */
export type GatewayServiceTierState = {
    kind: "standard";
} | {
    kind: "priority";
} | {
    kind: "custom";
    value: string;
};
/**
 * Reads `gateway.serviceTier` from an unknown-shaped `providerOptions` value
 * (compiled manifest or `/eve/v1/info` payload). Anything absent or malformed
 * reads as `standard`.
 */
export declare function readGatewayServiceTier(providerOptions: unknown): GatewayServiceTierState;
