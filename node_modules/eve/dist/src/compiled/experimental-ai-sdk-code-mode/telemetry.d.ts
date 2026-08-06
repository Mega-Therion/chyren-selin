import type { CodeModeTelemetryOptions } from "./types.js";
type AttributeValue = string | number | boolean | Array<string | number | boolean>;
type Attributes = Record<string, AttributeValue>;
interface TelemetrySpan {
    setAttribute?: (key: string, value: AttributeValue) => void;
    setAttributes?: (attributes: Attributes) => void;
    addEvent?: (name: string, attributes?: Attributes) => void;
    recordException?: (exception: Error | string | unknown) => void;
    setStatus?: (status: {
        code: number;
        message?: string;
    }) => void;
    end?: () => void;
}
export declare function startTelemetrySpan(telemetry: CodeModeTelemetryOptions | undefined, name: string, attributes: Record<string, unknown>): TelemetrySpan | undefined;
export declare function addTelemetryEvent(span: TelemetrySpan | undefined, name: string, attributes?: Record<string, unknown>): void;
export declare function recordTelemetryError(span: TelemetrySpan | undefined, error: unknown): void;
export declare function endTelemetrySpan(span: TelemetrySpan | undefined): void;
export {};
//# sourceMappingURL=telemetry.d.ts.map