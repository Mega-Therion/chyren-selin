/**
 * Reducers and revivers for custom class serialization.
 *
 * Handles:
 * - Class: class constructors with a `classId` property
 * - Instance: instances of classes with custom WORKFLOW_SERIALIZE/DESERIALIZE methods
 */
import type { Reducers, Revivers } from '../types.js';
export declare function getClassReducers(): Partial<Reducers>;
export declare function getClassRevivers(global?: Record<string, any>): Partial<Revivers>;
//# sourceMappingURL=class.d.ts.map