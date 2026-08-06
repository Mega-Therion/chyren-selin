/** Rolldown AST subset consumed by the dynamic-tool transform. */
export type DynamicToolAstNode = {
    argument?: DynamicToolAstNode | null;
    arguments?: DynamicToolAstNode[];
    async?: boolean;
    body?: DynamicToolAstNode | DynamicToolAstNode[] | {
        body?: DynamicToolAstNode[];
        type?: string;
        start?: number;
        end?: number;
    };
    callee?: DynamicToolAstNode;
    computed?: boolean;
    declaration?: DynamicToolAstNode | null;
    declarations?: DynamicToolAstNode[];
    end?: number;
    expression?: DynamicToolAstNode | null;
    id?: {
        name?: string;
        start?: number;
        end?: number;
    } | null;
    init?: DynamicToolAstNode | null;
    key?: DynamicToolAstNode | null;
    kind?: string;
    left?: DynamicToolAstNode | null;
    method?: boolean;
    name?: string;
    params?: DynamicToolAstNode[];
    properties?: DynamicToolAstNode[];
    right?: DynamicToolAstNode | null;
    start?: number;
    type?: string;
    value?: DynamicToolAstNode | unknown;
};
export declare function findProperty(object: DynamicToolAstNode, name: string): DynamicToolAstNode | undefined;
export declare function walkNode(node: DynamicToolAstNode, visitor: (node: DynamicToolAstNode) => boolean): void;
/**
 * Collects identifiers used as runtime references in a function body AST.
 */
export declare function collectReferencedIdentifierNames(node: DynamicToolAstNode): Set<string>;
