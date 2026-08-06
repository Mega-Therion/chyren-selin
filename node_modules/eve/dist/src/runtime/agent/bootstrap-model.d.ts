import type { LanguageModel } from "ai";
import { type RuntimeModelReference } from "#runtime/agent/bootstrap.js";
/**
 * Resolves the framework-owned bootstrap model into a deterministic local
 * language model.
 */
export declare function resolveBootstrapRuntimeModel(reference: RuntimeModelReference): LanguageModel | null;
