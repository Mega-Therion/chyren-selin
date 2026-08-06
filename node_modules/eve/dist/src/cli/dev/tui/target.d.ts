import type { DevelopmentTarget, LocalDevelopmentTarget, RemoteDevelopmentTarget } from "#services/dev-client/target.js";
export type { LocalDevelopmentTarget, RemoteDevelopmentTarget };
/** Local or remote server backing one development TUI session. */
export type DevelopmentTuiTarget = DevelopmentTarget;
/** Resolves the explicit name, remote host, or humanized local folder shown by the TUI. */
export declare function resolveTuiTitle(input: {
    readonly name: string | undefined;
    readonly target: DevelopmentTuiTarget;
}): string | undefined;
/** Returns the URL host shown in remote status and authentication messages. */
export declare function remoteHost(target: RemoteDevelopmentTarget): string;
