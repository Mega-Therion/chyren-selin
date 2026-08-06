import type { EveEvalRunSummary } from "#evals/types.js";
/**
 * Resolves the artifact output directory for one `eve eval` run.
 *
 * Layout: `.eve/evals/<timestamp>/`
 */
export declare function resolveArtifactDirectory(appRoot: string): string;
/**
 * Writes all artifacts for a completed eval run: a run summary, a JSONL
 * results index, and per-eval detail/event files under `evals/`.
 */
export declare function writeArtifacts(artifactDir: string, summary: EveEvalRunSummary): Promise<void>;
