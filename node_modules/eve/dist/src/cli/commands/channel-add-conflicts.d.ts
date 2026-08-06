import type { ChannelKind } from "#setup/scaffold/index.js";
import type { DisabledChannelReasons } from "#setup/cli/index.js";
/**
 * Existing authored registrations that affect the scaffolded channel picker
 * or would conflict with a generated channel module.
 */
export interface ExistingChannelRegistrations {
    readonly disabledChannelReasons: DisabledChannelReasons;
    readonly webRouteOwners: readonly string[];
    readonly slackOwners: readonly string[];
}
/**
 * Inspects compiled authored channels so custom filenames still disable the
 * scaffold option for the channel behavior they register.
 */
export declare function inspectExistingChannelRegistrations(projectRoot: string): Promise<ExistingChannelRegistrations>;
/**
 * Rejects scaffolding when another authored module already owns behavior
 * emitted by the generated channel module.
 */
export declare function assertCanAddSelectedChannels(selectedChannels: readonly ChannelKind[], registrations: ExistingChannelRegistrations): void;
