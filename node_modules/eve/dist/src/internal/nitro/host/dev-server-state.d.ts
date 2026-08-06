/**
 * The last ready development-server URL for one app root.
 *
 * The record lets a second interactive `eve dev` attach to the same server.
 * It is not a lock: a stale or malformed record simply causes the caller to
 * start a new server and overwrite it once that server is ready.
 */
export declare class DevelopmentServerState {
    #private;
    readonly appRoot: string;
    constructor(project: {
        readonly appRoot: string;
    });
    /** Returns the recorded URL, if the record exists and is valid. */
    read(): Promise<string | undefined>;
    /** Records a server after it is ready to accept clients. */
    write(url: string): Promise<void>;
    /** Clears the record after the listening server has stopped. */
    remove(): Promise<void>;
}
