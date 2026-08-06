import type { CodeModeWorkerUrl, RunCodeModeInput } from "../types.js";
/**
 * Sets the process-global worker script URL used for new code-mode workers.
 *
 * This is intended for advanced integrations that provide a custom,
 * self-contained worker. Call this before starting invocations.
 * Active workers keep running; idle workers are retired so future invocations
 * use the new location.
 *
 * @param workerUrl - Node.js worker path or URL, or `undefined` to reset.
 */
export declare function setCodeModeWorkerUrl(workerUrl?: CodeModeWorkerUrl): void;
/**
 * Returns the worker script URL currently used for new code-mode workers.
 */
export declare function getCodeModeWorkerUrl(): CodeModeWorkerUrl;
/**
 * Returns the package default worker script URL.
 */
export declare function getDefaultCodeModeWorkerUrl(): URL;
export declare function runManagedCodeMode(input: RunCodeModeInput): Promise<unknown>;
//# sourceMappingURL=manager.d.ts.map