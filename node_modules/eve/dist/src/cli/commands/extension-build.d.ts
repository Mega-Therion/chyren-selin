export interface ExtensionBuildCliLogger {
    error(message: string): void;
    log(message: string): void;
}
/**
 * Builds the current package as an eve extension. Requires
 * `package.json#eve.extension` declaring distinct source and dist roots.
 */
export declare function runExtensionBuildCommand(logger: ExtensionBuildCliLogger, appRoot: string): Promise<void>;
