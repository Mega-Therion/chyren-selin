/**
 * Builds the dev-only runtime artifact revision response.
 *
 * Auth: none. The route is mounted only by the local dev server and exposes
 * only an opaque revision token that changes when HMR publishes a new runtime
 * snapshot.
 */
export declare function handleDevRuntimeArtifactsRequest(input: {
    appRoot: string;
}): Response;
