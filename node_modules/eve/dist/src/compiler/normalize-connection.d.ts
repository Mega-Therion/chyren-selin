import type { ConnectionSourceRef } from "#discover/manifest.js";
import type { CompiledConnectionDefinition } from "#compiler/manifest.js";
import { type ModuleBackedDefinitionLoadOptions } from "#compiler/normalize-helpers.js";
/**
 * Compiles one authored connection module into the serializable metadata
 * stored on the compiled agent manifest.
 *
 * The compiled manifest holds only serializable data. The live authored
 * `auth` callback (and, for OpenAPI connections, the `spec` and
 * `operations` filter) is resolved at runtime by re-importing the
 * authored module -- see `runtime/resolve-connection.ts`. Compile-time
 * still imports and validates the module so authoring errors surface
 * during `eve build`.
 *
 * The wire protocol is read from the marker stamped by the `define*`
 * factory, defaulting to MCP, and selects which normalizer validates
 * the authored shape. `url` carries the MCP server endpoint for MCP
 * connections and the API base URL for OpenAPI connections, so the rest
 * of the connection pipeline (auth context, tool-result narrowing,
 * runtime resolution) stays protocol-agnostic.
 */
export declare function compileConnectionDefinition(agentRoot: string, source: ConnectionSourceRef, options?: ModuleBackedDefinitionLoadOptions): Promise<CompiledConnectionDefinition>;
