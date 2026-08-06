/**
 * Development environment files loaded by local CLI commands such as
 * `eve dev`, `eve build`, and `eve eval`, ordered from highest to lowest
 * precedence.
 */
export declare const DEVELOPMENT_ENV_FILE_NAMES: readonly [".env.development.local", ".env.local", ".env.development", ".env"];
export interface DevelopmentEnvironmentReload {
    commit(): void;
    rollback(): void;
}
/**
 * Returns the local development environment files eve loads from an
 * application root, ordered from highest to lowest precedence.
 */
export declare function getDevelopmentEnvironmentFilePaths(appRoot: string): string[];
/**
 * Loads or reloads local development environment files from the application
 * root.
 *
 * Variables that existed before the first load keep parent-process
 * precedence. Variables supplied by env files are refreshed on subsequent
 * reloads so dev-mode file watching can pick up changed values.
 */
export declare function loadDevelopmentEnvironmentFiles(appRoot: string): void;
export declare function stageDevelopmentEnvironmentFiles(appRoot: string): DevelopmentEnvironmentReload;
export declare function readDevelopmentEnvironmentHostValues(appRoot: string): Readonly<Record<string, string | null>>;
