import { type RemoteAuthFlow } from "./remote-auth.js";
import type { RemoteConnectionController } from "./remote-connection.js";
import type { SetupFlowRenderer } from "./setup-flow.js";
interface RemoteAuthCommandInput {
    readonly connection: RemoteConnectionController;
    readonly flow?: RemoteAuthFlow;
    readonly renderer: SetupFlowRenderer;
}
/** Runs remote `/vc:login` through one TUI panel, connection operation, and auth flow. */
export declare function runRemoteAuthCommand(input: RemoteAuthCommandInput): Promise<string>;
export {};
