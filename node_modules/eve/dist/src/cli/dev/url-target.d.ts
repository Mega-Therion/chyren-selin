export type DevelopmentRequestHeaders = Readonly<Record<string, string>>;
export interface DevelopmentUrlTargetOptions {
    header?: DevelopmentRequestHeaders;
    host?: string;
    port?: number;
    ui?: boolean;
    url?: string;
}
export interface DevelopmentUrlTarget {
    readonly headers?: DevelopmentRequestHeaders;
    readonly serverUrl: string;
}
export declare function parseDevelopmentHeaderOption(value: string, previous?: DevelopmentRequestHeaders): DevelopmentRequestHeaders;
export declare function resolveDevelopmentUrlTarget(options: DevelopmentUrlTargetOptions, positionalUrl: string | undefined): DevelopmentUrlTarget | undefined;
