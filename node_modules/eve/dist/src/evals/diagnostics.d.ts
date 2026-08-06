/** Adds an optional user label without replacing the assertion's stable family name. */
export declare function formatAssertionName(name: string, label: string): string;
/** Formats an assertion value for a compact human-readable diagnostic. */
export declare function formatDiagnosticValue(value: unknown, maxLength?: number): string;
/** Converts arbitrary assertion evidence into an artifact-safe JSON value. */
export declare function toDiagnosticMetadataValue(value: unknown): unknown;
/** Bounds diagnostic text while leaving full structured evidence in metadata. */
export declare function truncateDiagnostic(text: string, maxLength: number): string;
