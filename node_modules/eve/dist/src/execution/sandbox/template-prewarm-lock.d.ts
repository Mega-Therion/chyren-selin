export interface SandboxTemplatePrewarmLockInput {
    readonly appRoot: string;
    readonly backendName: string;
    readonly log?: (message: string) => void;
    readonly templateKey: string;
}
export declare function waitForSandboxTemplatePrewarmLock(input: SandboxTemplatePrewarmLockInput): Promise<void>;
export declare function withSandboxTemplatePrewarmLock<T>(input: SandboxTemplatePrewarmLockInput, callback: () => Promise<T>): Promise<T>;
