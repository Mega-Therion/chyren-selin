/**
 * Session-local knowledge of file contents, so the write block can show a
 * real diff without any protocol addition. Two feeds keep it current: every
 * `write_file` input is a full replacement (exact), and every full-file
 * `read_file` result reconstructs to the file's exact lines. Files touched
 * outside these two paths (e.g. by `bash`) are invisible here — a write over
 * unknown prior content renders plain rather than pretending to be a diff.
 */
export declare class FileContentCache {
    #private;
    /**
     * Records one write and returns the content it replaced. Tool blocks
     * re-render on every lifecycle event of the same call, so a repeated
     * observation of `callId` keeps returning the original previous content
     * instead of diffing the write against itself.
     */
    observeWrite(input: {
        path: string;
        content: string;
        callId: string;
    }): string | undefined;
    /**
     * Forgets everything. A new conversation runs against a fresh session —
     * possibly a fresh sandbox — so stale bases would produce confidently
     * wrong diffs.
     */
    clear(): void;
    /**
     * Records a read result when it provably covers the whole file: not
     * truncated, starting at line 1, with exactly `totalLines` numbered lines.
     * Partial or truncated reads are ignored — caching them would produce
     * confidently wrong diffs later.
     */
    observeRead(output: unknown): void;
}
