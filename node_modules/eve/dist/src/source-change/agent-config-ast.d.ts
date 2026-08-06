/**
 * The AST plumbing shared by the agent-config source editors: the loose
 * Rolldown node shapes, the parse-and-locate-`defineAgent({ ... })` pipeline,
 * and the string-splicing helpers. Editors own their edit policies; this
 * module owns how an agent config is read.
 */
export type Program = {
    readonly body?: readonly AstNode[];
};
export type AstNode = {
    readonly arguments?: readonly AstNode[];
    readonly callee?: AstNode;
    readonly computed?: boolean;
    readonly declaration?: AstNode | null;
    readonly end?: number;
    readonly expression?: AstNode | null;
    readonly key?: AstNode;
    readonly name?: string;
    readonly properties?: readonly AstNode[];
    readonly raw?: string;
    readonly start?: number;
    readonly type?: string;
    readonly value?: AstNode | string | number | boolean | null;
};
export type ObjectExpression = AstNode & {
    readonly end: number;
    readonly properties: readonly AstNode[];
    readonly start: number;
    readonly type: "ObjectExpression";
};
export type ParsedAgentObject = {
    readonly kind: "ok";
    readonly object: ObjectExpression;
} | {
    readonly kind: "bail";
    readonly reason: string;
    readonly line: number;
};
/** Parses a source and locates the `export default defineAgent({ ... })` object. */
export declare function parseAgentObject(sourceText: string): Promise<ParsedAgentObject>;
/**
 * The write-guard invariant: an edited source must still parse and still
 * carry the `defineAgent({ ... })` object. Returns the failure reason, or
 * undefined when the source is sound. Callers bail instead of writing, so an
 * editor bug degrades to a "change it by hand" message rather than a broken
 * agent.ts.
 */
export declare function checkAgentConfigSource(sourceText: string): Promise<string | undefined>;
/** Strips `as`, `satisfies`, and parentheses to reach the underlying expression. */
export declare function unwrapExpression(expression: AstNode): AstNode;
export declare function keyMatches(key: AstNode | undefined, name: string): boolean;
export declare function isAstNode(value: unknown): value is AstNode;
export declare function escapeForQuote(value: string, quote: '"' | "'"): string;
export declare function lineAt(source: string, offset: number): number;
