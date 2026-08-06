export type DevBootProgressEvent = {
    readonly phase: string;
    readonly type: "phase-started";
} | {
    readonly elapsedMs: number;
    readonly phase: string;
    readonly type: "phase-finished";
} | {
    readonly type: "before-first-paint";
};
export type DevBootProgressReporter = (event: DevBootProgressEvent) => void;
/** Runs one measured boot phase and reports it to this invocation's observer. */
export declare function devBootPhase<T>(phase: string, run: () => Promise<T>, report?: DevBootProgressReporter): Promise<T>;
