interface CliLiveRow {
    update(message: string, detail?: string): void;
    stop(): void;
}
interface CliLiveRowLogger {
    log(message: string): void;
}
interface CliLiveRowOutput {
    readonly columns?: number;
    readonly isTTY?: boolean;
    write(chunk: string): unknown;
}
interface CliLiveRowOptions {
    readonly output?: CliLiveRowOutput;
    readonly pulseSequence?: string;
}
/** Starts one transient CLI row, or logs its first message when repainting is unavailable. */
export declare function startCliLiveRow(logger: CliLiveRowLogger, options?: CliLiveRowOptions): CliLiveRow;
export {};
