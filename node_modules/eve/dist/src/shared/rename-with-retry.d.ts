/**
 * Renames a path atomically, retrying the transient busy-handle errors that
 * Windows can report while another process briefly has either path open.
 */
export declare function renameWithTransientBusyRetry(sourcePath: string, destinationPath: string): Promise<void>;
