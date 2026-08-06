import type { CodeModeApprovalInterruptPayload, CodeModeApprovalResolution, CodeModeApprovalResponse, CodeModeInterruptPayload } from "./types.js";
/**
 * Reserved interruption payload kind for built-in nested tool approvals.
 *
 * Approval is implemented as a generic code-mode interruption tagged with this
 * kind. Host tools must not use this kind for their own
 * `requestCodeModeInterrupt` payloads.
 *
 * @internal
 */
export declare const CODE_MODE_TOOL_APPROVAL_KIND = "ai-sdk-code-mode/tool-approval";
/**
 * Returns true when a generic interruption payload is a built-in approval.
 *
 * @internal
 */
export declare function isCodeModeApprovalInterruptPayload(payload: CodeModeInterruptPayload): payload is CodeModeApprovalInterruptPayload;
/**
 * Validates an approval response from model/client history at runtime.
 *
 * @internal
 */
export declare function assertCodeModeApprovalResponse(value: unknown): asserts value is CodeModeApprovalResponse;
/**
 * Validates and normalizes the resolution used to resume an approval
 * interruption. The generic interrupt machinery passes this resolution through
 * `continueCodeModeInterrupt`; approval interrupts require a boolean decision.
 *
 * @internal
 */
export declare function normalizeApprovalResolution(resolution: unknown): CodeModeApprovalResolution;
//# sourceMappingURL=approval.d.ts.map