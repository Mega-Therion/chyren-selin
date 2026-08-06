import { type Hook } from '#compiled/@workflow/world/index.js';
import { type PayloadKey } from '../serialization.js';
/**
 * Get the hook by token to find the associated workflow run,
 * and hydrate the `metadata` property if it was set from within
 * the workflow run.
 *
 * A Hook kept by minimum retention remains available here after its run ends,
 * but cannot be resumed.
 *
 * @param token - The unique token identifying the hook
 */
export declare function getHookByToken(token: string): Promise<Hook>;
/**
 * The result of {@link resumeHook}: a {@link Hook} augmented with an optional
 * resilience signal.
 *
 * On the parallel fast path, `resumeHook()` writes the `hook_received` event and
 * dispatches the workflow queue message concurrently. When the direct event
 * write fails *transiently* — a 429/5xx, a transport error, or an expected
 * `(runId, resumeId)` conflict with its own re-ensuring consumer — but the queue
 * dispatch succeeds, the resume is still guaranteed: the queue consumer
 * idempotently materializes the `hook_received` event from the payload carried
 * on the message before replay. In that recovered case the returned hook carries
 * `resilientResume: true`.
 *
 * On the happy path (the direct write landed) and on the sequential fallback
 * path, the flag is absent (`undefined`). Callers that don't care about the
 * distinction can treat the result as a plain {@link Hook}.
 */
export type ResumedHook = Hook & {
    resilientResume?: boolean;
};
/**
 * Resumes a workflow run by sending a payload to a hook identified by its token.
 *
 * This function is called externally (e.g., from an API route or server action)
 * to send data to a hook and resume the associated workflow run.
 *
 * @param tokenOrHook - The unique token identifying the hook, or the hook object itself
 * @param payload - The data payload to send to the hook
 * @returns Promise resolving to the {@link ResumedHook}
 * @throws {HookNotFoundError} If the Hook does not exist or its run has ended
 *
 * @example
 *
 * ```ts
 * // In an API route
 * import { resumeHook } from '@workflow/core/runtime';
 *
 * export async function POST(request: Request) {
 *   const { token, data } = await request.json();
 *
 *   try {
 *     const hook = await resumeHook(token, data);
 *     return Response.json({ runId: hook.runId });
 *   } catch (error) {
 *     return new Response('Hook not found', { status: 404 });
 *   }
 * }
 * ```
 */
export declare function resumeHook<T = any>(tokenOrHook: string | Hook, payload: T, encryptionKeyOverride?: PayloadKey): Promise<ResumedHook>;
/**
 * Resumes a webhook by sending a {@link https://developer.mozilla.org/en-US/docs/Web/API/Request | Request}
 * object to a hook identified by its token.
 *
 * This function is called externally (e.g., from an API route or server action)
 * to send a request to a webhook and resume the associated workflow run.
 *
 * @param token - The unique token identifying the hook
 * @param request - The request to send to the hook
 * @returns Promise resolving to the response
 * @throws Error if the hook is not found or if there's an error during the process
 *
 * @example
 *
 * ```ts
 * // In an API route
 * import { resumeWebhook } from '@workflow/core/runtime';
 *
 * export async function POST(request: Request) {
 *   const url = new URL(request.url);
 *   const token = url.searchParams.get('token');
 *
 *   if (!token) {
 *     return new Response('Missing token', { status: 400 });
 *   }
 *
 *   try {
 *     const response = await resumeWebhook(token, request);
 *     return response;
 *   } catch (error) {
 *     return new Response('Webhook not found', { status: 404 });
 *   }
 * }
 * ```
 */
export declare function resumeWebhook(token: string, request: Request): Promise<Response>;
//# sourceMappingURL=resume-hook.d.ts.map