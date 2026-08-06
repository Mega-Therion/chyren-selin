/**
 * V8-only (Node, Bun, Chrome, Deno). Rewrites `err.stack` so the top frame is
 * the caller of `stackStartFn` instead of the framework function that threw.
 * Without this, terminal overlays (Next.js, Turbopack, VS Code) render the
 * code frame at our `throw` site inside `@workflow/core`, which is useless
 * to the user.
 *
 * No-op on engines that don't expose `Error.captureStackTrace` — the stack
 * degrades gracefully to the default behavior.
 *
 * Kept in its own tiny module so callers that can't participate in the
 * `context-errors.ts` ↔ `workflow/get-workflow-metadata.ts` import cycle can
 * still pull in the helper without pulling in the full error classes.
 */
export declare function redirectStackToCaller(err: Error, stackStartFn: Function): void;
//# sourceMappingURL=capture-stack.d.ts.map