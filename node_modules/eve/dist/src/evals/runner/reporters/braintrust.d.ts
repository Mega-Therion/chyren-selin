import type { EvalReporter } from "#evals/runner/reporters/types.js";
/**
 * Configuration for the Braintrust reporter. Every field is optional and maps
 * onto the corresponding Braintrust SDK `init` option.
 */
export interface BraintrustReporterConfig {
    /** Braintrust project id. Maps to the `projectId` init option. */
    readonly projectId?: string;
    /** Braintrust project name. Defaults to the eval id when omitted. */
    readonly projectName?: string;
    /** Name for the created experiment. When omitted, Braintrust names it. */
    readonly experimentName?: string;
    /** Name of an existing experiment to compare results against (the diff base). */
    readonly baseExperimentName?: string;
    /** Id of an existing experiment to compare results against (the diff base). */
    readonly baseExperimentId?: string;
    /** When true, update a matching existing experiment instead of creating one. */
    readonly update?: boolean;
}
/**
 * Creates an {@link EvalReporter} that uploads eval results to Braintrust as an
 * experiment. Add it to an eval's `reporters` array; share one instance
 * across several evals (e.g. every entry of an array export) to group them
 * into a single experiment. Requires the optional `braintrust` peer package;
 * the reporter throws a descriptive error when the run starts if it is
 * missing. `config` is optional and defaults to an empty object (the project
 * name then falls back to the first observed eval id).
 */
export declare function Braintrust(config?: BraintrustReporterConfig): EvalReporter;
