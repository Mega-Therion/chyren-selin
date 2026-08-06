import type { VercelCaptureFailure, VercelCaptureResult } from "#setup/primitives/index.js";
/** Treats a structured API error as a failure even when `vercel api --raw` exits zero. */
export declare function normalizeVercelApiResult(result: VercelCaptureResult): VercelCaptureResult;
/** Whether a Vercel API failure proves that the requested resource does not exist. */
export declare function isNotFoundApiFailure(failure: VercelCaptureFailure): boolean;
/** Whether a Vercel API failure proves that the requested resource already exists. */
export declare function isConflictApiFailure(failure: VercelCaptureFailure): boolean;
/** Whether a scoped Vercel API request was denied. */
export declare function isForbiddenApiFailure(failure: VercelCaptureFailure): boolean;
