/** Internal signal used to stop an eval after a recorded required assertion fails. */
export declare class EvalRequirementFailed extends Error {
    constructor();
}
/** Internal signal used by `t.skip()` to produce a skipped verdict. */
export declare class EvalSkipped extends Error {
    readonly reason: string;
    constructor(reason: string);
}
