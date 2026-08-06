export declare function pathExists(path: string): Promise<boolean>;
export declare class WriteFileExistsError extends Error {
    readonly path: string;
    constructor(path: string);
}
export interface WriteFileOptions {
    force?: boolean;
}
export declare function writeTextFile(path: string, content: string, options?: WriteFileOptions): Promise<void>;
