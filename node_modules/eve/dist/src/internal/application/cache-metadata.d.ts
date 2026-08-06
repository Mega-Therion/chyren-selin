/**
 * Clears one eve-owned cache directory when its recorded eve version is missing
 * or differs from the currently installed package version.
 */
export declare function prepareEveVersionedCacheDirectory(directoryPath: string): Promise<void>;
/**
 * Writes the current installed eve version into one eve-owned cache directory.
 */
export declare function writeEveVersionedCacheMetadata(directoryPath: string): Promise<void>;
