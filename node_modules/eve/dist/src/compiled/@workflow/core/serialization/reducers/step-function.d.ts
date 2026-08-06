/**
 * Reducer and reviver for step function references.
 *
 * In workflow mode, step functions are replaced by the SWC plugin with
 * proxies created by `globalThis[Symbol.for("WORKFLOW_USE_STEP")]("stepId")`.
 * These proxies have a `.stepId` property and optionally a `.__closureVarsFn`
 * for captured closure variables. They may additionally have `.__boundThis`
 * (and rarely `.__boundArgs`) when the SWC plugin emitted
 * `useStep(...).bind(this)` for a nested arrow step that lexically
 * captured `this` (see `packages/swc-plugin-workflow/spec.md` → "Lexical
 * `this` Capture in Nested Arrow Steps").
 *
 * The reducer serializes them as
 *   `{ stepId, closureVars?, boundThis?, boundArgs? }`.
 * The reviver reconstructs them by calling WORKFLOW_USE_STEP and, when
 * `boundThis` (or `boundArgs`) is present, re-binding the resulting
 * proxy so the caller's captured `this` (and prefilled args) survive the
 * round trip.
 */
import type { Reducers, Revivers } from '../types.js';
export declare function getStepFunctionReducer(): Partial<Reducers>;
/**
 * Create the StepFunction reviver for workflow context.
 *
 * The reviver calls WORKFLOW_USE_STEP to create the step proxy,
 * restoring the ability to call the step from workflow code. If the
 * serialized payload includes `boundThis` (and optionally `boundArgs`),
 * the reviver also re-binds the freshly-created proxy so a step proxy
 * that was constructed with `.bind(this, …)` in the workflow bundle
 * continues to carry that receiver and any prefilled arguments after
 * being deserialized in another bundle (e.g. when passed as a step
 * argument).
 */
export declare function getStepFunctionReviver(global?: Record<string, any>): Partial<Revivers>;
//# sourceMappingURL=step-function.d.ts.map