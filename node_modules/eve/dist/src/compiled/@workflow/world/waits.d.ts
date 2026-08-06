import { z } from '#compiled/zod/index.js';
export declare const WaitStatusSchema: z.ZodEnum<{
    completed: "completed";
    waiting: "waiting";
}>;
export declare const WaitSchema: z.ZodObject<{
    waitId: z.ZodString;
    runId: z.ZodString;
    status: z.ZodEnum<{
        completed: "completed";
        waiting: "waiting";
    }>;
    resumeAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    completedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
    specVersion: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type WaitStatus = z.infer<typeof WaitStatusSchema>;
export type Wait = z.infer<typeof WaitSchema>;
//# sourceMappingURL=waits.d.ts.map