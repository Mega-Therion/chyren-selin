import type { ConnectionRegistry } from "#runtime/connections/types.js";
import type { FrameworkContextProvider } from "#context/provider.js";
export { ConnectionRegistryKey } from "#context/providers/connection-key.js";
export declare const connectionProvider: FrameworkContextProvider<ConnectionRegistry>;
