/**
 * Builds an unsigned JWT (`alg: "none"`, fake signature) whose payload the
 * Codex auth helpers can decode. Test fixture only — no crypto involved.
 */
export declare function createUnsignedJwt(payload: object): string;
