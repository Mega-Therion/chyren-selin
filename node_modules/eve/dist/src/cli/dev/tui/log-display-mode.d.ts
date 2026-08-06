/** Every supported captured-output filter, in CLI help order. */
export declare const LOG_DISPLAY_MODES: readonly ["all", "stderr", "sandbox", "none"];
export type LogDisplayMode = (typeof LOG_DISPLAY_MODES)[number];
/**
 * Order the dev TUI's Ctrl+L shortcut steps through {@link LogDisplayMode}
 * values, starting from `none`: each press reveals the next view and wraps
 * back to `none`.
 */
export declare const LOG_DISPLAY_MODE_CYCLE: readonly ["none", "all", "stderr", "sandbox"];
/** Parses one CLI or `/loglevel` argument into a supported display mode. */
export declare function parseLogDisplayMode(value: string): LogDisplayMode | undefined;
/** The mode after `current` in the Ctrl+L cycle, wrapping at the end. */
export declare function nextLogDisplayMode(current: LogDisplayMode): LogDisplayMode;
