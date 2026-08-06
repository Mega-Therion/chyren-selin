export interface DevelopmentRunner {
    readonly closed: boolean;
    close(cause?: unknown): Promise<void>;
    fetch(request: Request, init?: RequestInit): Promise<Response>;
    onceClosed(listener: (cause?: unknown) => void): void;
    upgrade(input: {
        readonly node: {
            readonly head: Buffer;
            readonly req: import("node:http").IncomingMessage;
            readonly socket: import("node:net").Socket;
        };
    }): Promise<void>;
    waitForReady(timeout: number): Promise<void>;
}
export interface DevelopmentRunnerInput {
    readonly entry: string;
    readonly name: string;
    readonly workerData: Readonly<Record<string, unknown>>;
}
export type DevelopmentRunnerFactory = (input: DevelopmentRunnerInput) => DevelopmentRunner;
export declare const createNodeDevelopmentRunner: DevelopmentRunnerFactory;
