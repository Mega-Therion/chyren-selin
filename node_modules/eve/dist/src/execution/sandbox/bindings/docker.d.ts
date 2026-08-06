import { type DockerCli } from "#execution/sandbox/bindings/docker-cli.js";
import type { SandboxBackend } from "#public/definitions/sandbox-backend.js";
import type { DockerSandboxCreateOptions } from "#public/sandbox/docker-sandbox.js";
export { DOCKER_TEMPLATE_IMAGE_REPOSITORY, pruneDockerSandboxTemplates, } from "#execution/sandbox/bindings/docker-templates.js";
/**
 * Stable backend name. Participates in template/session key derivation
 * and persisted reconnect state.
 */
export declare const DOCKER_BACKEND_NAME = "docker";
/**
 * Construction input for {@link createDockerSandboxBackend}. Internal —
 * the public surface is the `docker()` factory under
 * `eve/sandbox`.
 */
export interface CreateDockerSandboxBackendInput {
    readonly createOptions?: DockerSandboxCreateOptions;
    /** Injectable Docker driver so backend logic is testable without a daemon. */
    readonly dockerCli?: DockerCli;
}
/**
 * Creates the Docker sandbox backend.
 *
 * Two-phase lifecycle mapped onto Docker primitives:
 *
 * - `prewarm` runs the base image, applies base setup, runs the
 *   authored `bootstrap`, writes seed files, then `docker commit`s the
 *   container into a reusable template image.
 * - `create` starts (or restarts) one long-lived container per session
 *   key from the template image. The container's filesystem carries
 *   session state across reconnects, so `shutdown` only stops the
 *   container and the next `create` restarts it with state intact.
 */
export declare function createDockerSandboxBackend(input?: CreateDockerSandboxBackendInput): SandboxBackend;
