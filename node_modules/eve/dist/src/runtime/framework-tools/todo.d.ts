import type { ModelMessage } from "ai";
import { z } from "#compiled/zod/index.js";
import { ContextKey } from "#context/key.js";
import type { ResolvedToolDefinition } from "#runtime/types.js";
/**
 * Single item in the todo list.
 */
export type TodoItem = z.infer<typeof TODO_ITEM_SCHEMA>;
/**
 * Durable state for the framework todo tool.
 */
export interface TodoState {
    readonly items: readonly TodoItem[];
}
export declare const TodoStateKey: ContextKey<TodoState>;
/**
 * Typed input accepted by {@link executeTodoTool}.
 *
 * When `todos` is provided, the list is replaced (full replacement write).
 * When `todos` is omitted, the current list is returned without modification.
 */
export type TodoToolInput = z.infer<typeof TODO_INPUT_SCHEMA>;
/**
 * Builds the message that re-injects the current todo list after the harness
 * compacts message history, so the agent keeps its task list across
 * compaction. Returns `undefined` when there is no list to preserve.
 */
export declare function getTodoCompactionMessage(): ModelMessage | undefined;
/**
 * Executes the framework todo tool.
 *
 * - Read: omit `todos` → returns the current list.
 * - Write: provide `todos` → replaces the entire list, returns the new list.
 *
 * Both paths return the same formatted output so the model always sees
 * the full current state.
 */
export declare function executeTodoTool(input: TodoToolInput): unknown;
declare const TODO_ITEM_SCHEMA: z.ZodObject<{
    content: z.ZodString;
    priority: z.ZodEnum<{
        high: "high";
        low: "low";
        medium: "medium";
    }>;
    status: z.ZodEnum<{
        cancelled: "cancelled";
        completed: "completed";
        in_progress: "in_progress";
        pending: "pending";
    }>;
}, z.core.$strict>;
export declare const TODO_INPUT_SCHEMA: z.ZodObject<{
    todos: z.ZodOptional<z.ZodArray<z.ZodObject<{
        content: z.ZodString;
        priority: z.ZodEnum<{
            high: "high";
            low: "low";
            medium: "medium";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            completed: "completed";
            in_progress: "in_progress";
            pending: "pending";
        }>;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export declare const TODO_OUTPUT_SCHEMA: z.ZodObject<{
    counts: z.ZodObject<{
        cancelled: z.ZodNumber;
        completed: z.ZodNumber;
        in_progress: z.ZodNumber;
        pending: z.ZodNumber;
        total: z.ZodNumber;
    }, z.core.$strict>;
    todos: z.ZodArray<z.ZodObject<{
        content: z.ZodString;
        priority: z.ZodEnum<{
            high: "high";
            low: "low";
            medium: "medium";
        }>;
        status: z.ZodEnum<{
            cancelled: "cancelled";
            completed: "completed";
            in_progress: "in_progress";
            pending: "pending";
        }>;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const TODO_TOOL_DEFINITION: ResolvedToolDefinition;
export {};
