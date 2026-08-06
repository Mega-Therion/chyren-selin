export declare const WORKFLOW_STEP_EXTERNAL_PACKAGES: readonly ["@mongodb-js/zstd", "just-bash", "microsandbox", "node-liblzma"];
/**
 * Packages that must stay external during the initial workflow builder
 * pass so `node:*` transitive dependencies do not fail the workflow VM check.
 * Nitro performs the final bundling/tracing pass for hosted output.
 */
export declare const WORKFLOW_BUILDER_DEFERRED_PACKAGES: readonly ["@chat-adapter/slack", "chat"];
/**
 * Recreates the queue-triggered flow function from Nitro's completed server
 * output while retaining its route-specific Vercel configuration.
 *
 * Nitro copies function-rule output without preserving relative symlink text,
 * which can turn traced `.nf3` package links into absolute paths inside eve's
 * disposable build workspace. Materializing after Nitro finishes keeps those
 * links relative so the published function remains self-contained.
 */
export declare function materializeVercelWorkflowFunctionOutput(outputDir: string): Promise<void>;
/**
 * Keeps only eve-owned Vercel function output and rewrites eve route function
 * symlinks to a shared eve-owned server function.
 *
 * Nitro emits generic app routes such as `index.func -> ./__server.func` for
 * eve's standalone landing page. In a multi-service Next.js deployment those
 * root aliases collide with Next's own functions. The Next integration only
 * proxies eve's `/eve/v1/**` transport routes, so Vercel output should expose
 * those route functions and workflow trigger functions, not eve's root page.
 *
 * Nitro also dedupes every route function through `__server.func`. Preserve
 * that model by copying the shared target once into the eve-owned tree and
 * repointing eve route aliases at it before pruning the root target.
 */
export declare function normalizeEveVercelFunctionOutput(outputDir: string, options?: {
    readonly servicePrefix?: string;
}): Promise<void>;
