import { z } from "#compiled/zod/index.js";
/**
 * Runtime-owned authenticator kinds projected into eve session auth metadata.
 */
export type RuntimeSessionAuthenticator = "http-basic" | "jwt-hmac" | "jwt-ecdsa" | "oidc";
/**
 * Normalized principal classifications projected into public session metadata.
 */
export type RuntimeSessionPrincipalType = "service" | "user" | "runtime" | "unknown";
/**
 * Serializable string-only auth attributes preserved on runtime sessions.
 */
export type RuntimeSessionAuthAttributes = Readonly<Record<string, string | readonly string[]>>;
/**
 * Serializable auth context projected onto one runtime session turn.
 */
export type RuntimeSessionAuthContext = z.infer<typeof runtimeSessionAuthContextSchema>;
/**
 * Zod schema for one serializable runtime session auth context.
 */
declare const runtimeSessionAuthContextSchema: z.ZodObject<{
    attributes: z.ZodReadonly<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodReadonly<z.ZodArray<z.ZodString>>]>>>;
    authenticator: z.ZodEnum<{
        "http-basic": "http-basic";
        "jwt-ecdsa": "jwt-ecdsa";
        "jwt-hmac": "jwt-hmac";
        oidc: "oidc";
    }>;
    issuer: z.ZodOptional<z.ZodString>;
    principalId: z.ZodString;
    principalType: z.ZodEnum<{
        runtime: "runtime";
        service: "service";
        unknown: "unknown";
        user: "user";
    }>;
    subject: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export {};
