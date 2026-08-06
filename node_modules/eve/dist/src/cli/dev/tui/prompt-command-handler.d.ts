import type { ApplyModelOutcome } from "#setup/flows/model-source-change.js";
import type { PromptCommandHandler } from "./runner.js";
import type { RemoteAuthFlow } from "./remote-auth.js";
import type { TuiSetupFlows } from "./setup-commands.js";
import type { DevelopmentTuiTarget } from "./target.js";
export interface PromptCommandHandlerOptions {
    readonly target: DevelopmentTuiTarget;
    /** Test seam; defaults to the model flow's shared source-change apply. */
    readonly applyModel?: (input: {
        appRoot: string;
        slug: string;
    }) => Promise<ApplyModelOutcome>;
    /** Test seam; defaults to the model flow's external-provider refusal check. */
    readonly modelChangeRefusal?: (appRoot: string) => Promise<string | null>;
    /** Test seam; forwarded to runTuiSetupCommand's injectable flows. */
    readonly flows?: Partial<TuiSetupFlows>;
    /** Test seam for remote authentication. */
    readonly remoteAuthFlow?: RemoteAuthFlow;
}
export declare function createPromptCommandHandler(options: PromptCommandHandlerOptions): PromptCommandHandler;
