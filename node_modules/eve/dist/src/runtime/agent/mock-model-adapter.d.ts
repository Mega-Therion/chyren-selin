import type { LanguageModel } from "ai";
import { type RuntimeModelReference } from "#runtime/agent/bootstrap.js";
/**
 * Returns true when authored runtime models should resolve through the
 * dedicated deterministic mock adapter. The adapter is internal to the test
 * tiers: unit, integration, and scenario tests activate it through
 * `NODE_ENV=test`; spawned smoke servers use the explicit opt-in environment
 * variable so their package-manager build keeps its normal environment.
 */
export declare function shouldMockAuthoredRuntimeModels(): boolean;
/**
 * Creates a deterministic authored-model mock for one runtime model reference.
 */
export declare function createMockAuthoredRuntimeModel(reference: RuntimeModelReference): LanguageModel;
/**
 * Resolves the current authored runtime model onto the deterministic mock
 * adapter when the test seam is active.
 */
export declare function resolveMockAuthoredRuntimeModel(reference: RuntimeModelReference): LanguageModel | null;
