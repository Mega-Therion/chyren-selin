import type { MarkdownSourceRef } from "#shared/source-ref.js";
import type { ProjectSource } from "#discover/project-source.js";
/**
 * Input for lowering one discovered markdown file into a typed source ref.
 */
interface DiscoverMarkdownSourceInput<TDefinition> {
    logicalPath: string;
    lower: (source: string, input: {
        name: string;
    }) => TDefinition;
    source: ProjectSource;
    sourcePath: string;
}
/**
 * Reads one markdown-authored source from a {@link ProjectSource} and lowers
 * it into the shared manifest shape.
 */
export declare function discoverMarkdownSource<TDefinition>(input: DiscoverMarkdownSourceInput<TDefinition>): Promise<MarkdownSourceRef<TDefinition>>;
export {};
