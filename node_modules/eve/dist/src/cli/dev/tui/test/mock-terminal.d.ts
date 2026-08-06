import { EventEmitter } from "node:events";
import type { TerminalInput, TerminalOutput } from "../terminal-renderer.js";
export declare class MockUserInput extends EventEmitter implements TerminalInput {
    isTTY: boolean;
    rawModes: boolean[];
    resumeCalls: number;
    pauseCalls: number;
    setRawMode(mode: boolean): this;
    resume(): this;
    pause(): this;
    type(text: string): void;
    /** Emits a raw key sequence (e.g. an escape sequence) as one chunk. */
    send(sequence: string): void;
    enter(): void;
    backspace(): void;
    up(): void;
    down(): void;
    left(): void;
    right(): void;
    ctrlC(): void;
    ctrlN(): void;
    ctrlP(): void;
}
export declare class MockScreen extends EventEmitter implements TerminalOutput {
    #private;
    isTTY: boolean;
    columns: number;
    rows: number;
    constructor({ columns, rows }: {
        columns: number;
        rows: number;
    });
    write(chunk: string | Uint8Array, encodingOrCallback?: BufferEncoding | ((error?: Error | null) => void), callback?: (error?: Error | null) => void): boolean;
    resize(columns: number, rows: number): void;
    snapshot(): string;
    rawOutput(): string;
    /**
     * Resolves once the runner parks at an idle prompt: a column-0 `›` row
     * with no live turn bar on screen. A streaming turn keeps an identical
     * `›` prompt anchored (Enter inert), so the glyph alone cannot signal
     * readiness — the bar's absence is the discriminator.
     */
    waitForIdlePrompt(timeoutMs?: number): Promise<void>;
    waitForText(text: string, timeoutMs?: number, getDebugOutput?: () => string): Promise<void>;
}
