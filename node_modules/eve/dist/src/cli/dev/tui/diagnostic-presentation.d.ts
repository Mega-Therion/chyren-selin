export type DiagnosticPresentation = {
    readonly kind: "inline";
    readonly text: string;
} | {
    readonly kind: "stored";
    readonly summary: string;
    /** First error-naming line of the collapsed body, when one exists. */
    readonly headline?: string;
    readonly omittedLines: number;
    readonly path: string;
};
/** Chooses whether process diagnostics stay inline or collapse to the local sink. */
export declare function presentDiagnostic(text: string, path: string): DiagnosticPresentation;
export declare function formatStoredDiagnostic(presentation: Extract<DiagnosticPresentation, {
    kind: "stored";
}>): string;
