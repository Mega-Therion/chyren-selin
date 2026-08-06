import { type DockerCli } from "#execution/sandbox/bindings/docker-cli.js";
import type { ResolvedDockerSandboxOptions } from "#execution/sandbox/bindings/docker-options.js";
/**
 * Local image repository holding prewarmed sandbox template images.
 * One tag per template key; sessions run containers from these images.
 */
export declare const DOCKER_TEMPLATE_IMAGE_REPOSITORY = "eve-sandbox-template";
/**
 * Removes stale Docker sandbox template images for one application.
 *
 * Template usage is tracked through per-app marker files (touched on
 * prewarm and session create) because Docker images carry only an
 * immutable creation time. Markers beyond the retain count and recency
 * window get their image untagged; the marker is kept when `rmi` fails
 * (for example while a session container still references the image)
 * so the template stays managed.
 */
export declare function pruneDockerSandboxTemplates(input: {
    readonly appRoot: string;
    readonly dockerCli?: DockerCli;
    readonly now?: number;
    readonly recentWindowMs?: number;
    readonly retainCount?: number;
}): Promise<void>;
export declare function dockerTemplateImageReference(input: {
    readonly optionsHash: string;
    readonly templateKey: string;
}): string;
export declare function resolveDockerTemplateMarkerPath(appRoot: string, input: {
    readonly optionsHash: string;
    readonly templateKey: string;
}): string;
export declare function touchDockerTemplateMarker(markerPath: string, imageReference: string): Promise<void>;
export declare function dockerImageExists(cli: DockerCli, imageReference: string): Promise<boolean>;
export declare function ensureDockerBaseImage(cli: DockerCli, options: ResolvedDockerSandboxOptions): Promise<void>;
