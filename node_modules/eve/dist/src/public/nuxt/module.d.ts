/**
 * Options for the eve Nuxt module.
 */
export interface EveNuxtModuleOptions {
    /**
     * Path to the eve application root, resolved relative to the Nuxt project
     * root unless absolute. Defaults to the Nuxt project root. The dev server is
     * spawned here, and on Vercel it is the root the generated eve service
     * builds from.
     */
    eveRoot?: string;
    /**
     * Command that builds the eve app inside the generated Vercel eve service.
     * Defaults to running the installed eve binary from the Nuxt app's
     * dependencies (`node <path-to>/eve/bin/eve.js build`).
     */
    eveBuildCommand?: string;
}
/**
 * Nuxt module that wires an eve agent into a Nuxt app. Register under `modules`
 * (configured via the `eve` config key). It auto-imports the `useEveAgent()`
 * composable and routes eve transport requests (`/eve/v1/**`) to the eve
 * service: a shared dev server spawned on demand in dev, a generated Vercel
 * service on Vercel deployments, and a configured origin/port in non-Vercel
 * production. Requires Nuxt >= 4.0.0. Configure via
 * {@link EveNuxtModuleOptions}.
 */
declare const _default: import("nuxt/schema").NuxtModule<EveNuxtModuleOptions, EveNuxtModuleOptions, false>;
export default _default;
