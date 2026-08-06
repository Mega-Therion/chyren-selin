import { type Server } from "node:http";
import { type DevelopmentRunnerFactory } from "#internal/nitro/host/dev-runner.js";
export interface DrainedDevServerListener {
    close(): Promise<void>;
    readonly node: {
        readonly server: Server;
    };
    ready(): Promise<void>;
    readonly url: string | undefined;
}
export interface DevelopmentWorkerReplacement {
    readonly dispose?: () => Promise<void>;
    readonly entry: string;
    readonly workerData: Readonly<Record<string, unknown>>;
}
interface DevServerLogger {
    error(message: unknown, ...details: unknown[]): unknown;
}
/**
 * Development server with drained worker replacement: `replaceWorker` swaps
 * to a ready candidate while the retired worker keeps serving the responses
 * and sockets it already admitted — without bound, a streaming turn can hold
 * one for minutes — and is terminated once its last exchange settles. Stock
 * Nitro's dev server terminates the previous worker as soon as the next one
 * attaches, which resets admitted work; this class exists solely to close
 * that gap and is intended to be deleted in favor of `createDevServer` once
 * equivalent drain semantics are available upstream.
 */
export declare class DrainedNitroDevServer {
    #private;
    constructor(logger?: DevServerLogger, createRunner?: DevelopmentRunnerFactory);
    setControlHandler(handler: (request: Request) => Promise<Response | undefined>): void;
    /**
     * Enables signed client-address metadata on requests forwarded to
     * workers. Without it the worker only ever observes the parent's loopback
     * hop as the request's peer address.
     */
    setClientAddressSecret(secret: string): void;
    /**
     * Swaps to a ready worker built from `entry`. Throws without touching the
     * active worker when the candidate fails readiness. `dispose` is invoked
     * once the worker created here has fully retired (drained, crashed, or
     * closed at shutdown), so a caller can tie workspace cleanup to it.
     */
    replaceWorker(replacement: DevelopmentWorkerReplacement): Promise<void>;
    listen(input: {
        readonly hostname: string;
        readonly port: number;
    }): DrainedDevServerListener;
    waitForActiveRunner(timeoutMs?: number): Promise<void>;
    close(): Promise<void>;
}
export {};
