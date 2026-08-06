import type { ScheduleSourceRef } from "#discover/manifest.js";
import type { CompiledScheduleDefinition } from "#compiler/manifest.js";
import { type ModuleBackedDefinitionLoadOptions } from "#compiler/normalize-helpers.js";
/**
 * Compiles one authored schedule into the normalized shape consumed by
 * the runtime scheduler.
 *
 * Schedules are single files: `schedules/<name>.{ts,md}`. The markdown
 * form always produces a fire-and-forget schedule (`markdown` body, no
 * `run`). The TypeScript form may declare either `markdown` or `run`
 * (exactly one). The schedule name is derived from the relative file
 * path under `schedules/` minus the extension
 * (`schedules/billing/invoice-sweep.ts` → `"billing/invoice-sweep"`).
 */
export declare function compileScheduleDefinition(agentRoot: string, source: ScheduleSourceRef, options?: ModuleBackedDefinitionLoadOptions): Promise<CompiledScheduleDefinition>;
