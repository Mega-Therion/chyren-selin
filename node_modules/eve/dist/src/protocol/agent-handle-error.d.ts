/** JSON error returned when an agent-handle operation cannot be completed. */
export interface AgentHandleErrorJson<TCode extends string = string> {
    readonly code: TCode;
    readonly error: string;
    readonly ok: false;
}
/** Stable agent-handle errors shared by HTTP producers and consumers. */
export declare const AgentHandleError: {
    readonly SessionNotResumable: {
        readonly code: "SESSION_NOT_RESUMABLE";
        readonly toJson: () => AgentHandleErrorJson<"SESSION_NOT_RESUMABLE">;
    };
};
