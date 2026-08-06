import type { VerifiedVercelTarget } from "#setup/vercel-deployment.js";
import { type DevelopmentOidcTokenFailure, type DevelopmentOidcTokenResolution } from "./request-headers.js";
export interface DevelopmentCredentialGrant {
    readonly target: VerifiedVercelTarget;
    readonly resolveToken: () => Promise<DevelopmentOidcTokenResolution | string>;
}
/** Per-client authority for resolving and emitting remote Vercel credentials. */
export interface DevelopmentCredentialGate {
    /** The origin this gate is permanently bound to. */
    readonly serverOrigin: string;
    /**
     * Installs authority after Vercel verifies the exact origin.
     * Returns a rollback that restores the prior grant if this grant is still current.
     */
    authorize(grant: DevelopmentCredentialGrant): () => void;
    /** The verified target's OIDC token for one request, or "" when unavailable. */
    resolveToken(): Promise<string>;
    /** Non-credential Vercel headers (protection bypass), or {} when anonymous. */
    resolveBypassHeaders(): Promise<Readonly<Record<string, string>>>;
    /** Token failure from the most recent {@link resolveToken}, or `undefined` if it resolved one. */
    lastTokenFailure(): DevelopmentOidcTokenFailure | undefined;
}
/** Creates an anonymous credential gate bound to one client origin. */
export declare function createDevelopmentCredentialGate(serverUrl: string): DevelopmentCredentialGate;
