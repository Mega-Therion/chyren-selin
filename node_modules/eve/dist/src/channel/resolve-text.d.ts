import type { InputRequest, InputResponse } from "#runtime/input/types.js";
/**
 * Maps freeform text to an {@link InputResponse} for a single request.
 *
 * Emitters import this utility to resolve text-based user input against
 * pending request options. The harness and runtime do not call it.
 *
 * Resolution order:
 * 1. Exact option ID (case-insensitive)
 * 2. Exact option label (case-insensitive)
 * 3. 1-based numeric index into the options array
 * 4. Freeform text if {@link InputRequest.allowFreeform} is not `false`
 */
export declare function resolveTextToResponse(text: string, request: InputRequest): InputResponse | undefined;
/**
 * Resolves text against all pending requests, returning one
 * {@link InputResponse} for each request that could be matched.
 */
export declare function resolveTextToResponses(text: string, requests: readonly InputRequest[]): readonly InputResponse[];
