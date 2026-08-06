import type { ErrorLink, ErrorSignals } from "./signals.js";
/**
 * Classification tags a rule carries in addition to its domain:
 *
 * - `config` — the failure points at a fixable setup mistake (missing or
 *   invalid credentials, unknown model id). The model-call classifier
 *   treats a matched `config` rule as terminal.
 * - `transient` — the failure is expected to clear on retry.
 */
export type SemanticErrorTag = "gateway" | "model-provider" | "workflow" | "sandbox" | "system" | "config" | "transient";
/** A predicate over one extracted cause-chain link. */
export type LinkPredicate = (link: ErrorLink) => boolean;
/**
 * One catalog rule, in the linter shape: a stable id, a headline, a
 * declarative predicate over extracted {@link ErrorLink} facts, and the
 * remediation copy. Rules are pure and independent; the catalog is an
 * ordered list where the first match wins, so put specific rules before
 * general ones.
 */
export interface SemanticErrorRule {
    /** Stable kebab-case catalog identifier, greppable across logs and code. */
    readonly id: string;
    /** Short human-readable failure title used as the display headline. */
    readonly name: string;
    readonly tags: readonly SemanticErrorTag[];
    /** Matches when ANY link on the cause chain satisfies the predicate. */
    readonly when: LinkPredicate;
    /**
     * What happened — one factual sentence, or a projection of the matched
     * link (e.g. pass-through for eve-authored error messages).
     */
    readonly message: string | ((link: ErrorLink) => string);
    /**
     * What to do about it. Structured separately from `message` so render
     * surfaces can style, replace, or suppress the remediation
     * independently of the description (the dev TUI swaps in local
     * `/model` hints; a channel adapter may drop CLI advice entirely).
     */
    readonly hint?: string | ((link: ErrorLink) => string | undefined);
}
/** A matched rule projected into a displayable summary. */
export interface SemanticErrorSummary {
    readonly id: string;
    readonly name: string;
    /**
     * The matched rule's tags, carried so consumers with a recovery policy
     * (the model-call classifier) can read the catalog's judgment —
     * `config` is terminal, `transient` retries — without a second registry
     * of the same knowledge.
     */
    readonly tags: readonly SemanticErrorTag[];
    /** What happened. */
    readonly message: string;
    /** What to do about it, when the rule carries remediation. */
    readonly hint?: string;
}
/** Evaluates an ordered rule list against extracted signals; first match wins. */
export declare function evaluateSemanticErrorRules(rules: readonly SemanticErrorRule[], signals: ErrorSignals): SemanticErrorSummary | null;
/** Matches when the link's `name` equals any of the given class names. */
export declare function nameIs(...names: readonly string[]): LinkPredicate;
/** Matches when the link's `code` equals any of the given codes. */
export declare function codeIs(...codes: readonly string[]): LinkPredicate;
/** Matches when the link's gateway body `type` equals any of the given types. */
export declare function typeIs(...types: readonly string[]): LinkPredicate;
/**
 * Matches when the link's message equals one of the given strings exactly
 * (after trimming). Exact equality, not containment: a user error that
 * merely *mentions* a known failure string must not be reclassified.
 */
export declare function messageIs(...messages: readonly string[]): LinkPredicate;
/** Matches when the link's message matches the pattern. */
export declare function messageMatches(pattern: RegExp): LinkPredicate;
/** Matches when every given predicate matches the same link. */
export declare function allOf(...predicates: readonly LinkPredicate[]): LinkPredicate;
/** Matches when any given predicate matches the link. */
export declare function anyOf(...predicates: readonly LinkPredicate[]): LinkPredicate;
