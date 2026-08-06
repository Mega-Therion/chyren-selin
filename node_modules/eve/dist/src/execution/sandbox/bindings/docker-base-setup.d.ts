/**
 * One-time setup applied to containers created from the raw base image
 * (template builds and template-less sessions). Keeps the framework-owned
 * base layer deliberately tiny: create `/workspace` and verify Bash,
 * because the sandbox `bash` tool and command execution depend on it.
 */
export declare function buildDockerBaseSetupScript(): string;
