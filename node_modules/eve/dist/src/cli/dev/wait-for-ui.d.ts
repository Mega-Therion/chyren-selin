import type { CommandLifecycle } from "#cli/shutdown.js";
import type { DevelopmentServer, DevelopmentServerHandle } from "#internal/nitro/host/types.js";
type WaitableServer = DevelopmentServer & {
    wait?: () => Promise<void>;
};
export declare function waitForServerOrStop(server: WaitableServer, lifecycle: CommandLifecycle): Promise<void>;
export declare function waitForUiOrServer(input: {
    readonly handle: DevelopmentServerHandle;
    readonly lifecycle: CommandLifecycle;
    readonly runUi: () => Promise<void>;
    readonly server: WaitableServer;
}): Promise<void>;
export {};
