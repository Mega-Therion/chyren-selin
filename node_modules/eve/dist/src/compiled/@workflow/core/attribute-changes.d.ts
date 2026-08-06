import { type AttributeChange } from '#compiled/@workflow/world/index.js';
interface AttributeChangeOptions {
    allowReservedAttributes?: boolean;
}
export declare function normalizeAttributeChanges(attrs: Record<string, string | undefined>, options?: AttributeChangeOptions): AttributeChange[];
export {};
//# sourceMappingURL=attribute-changes.d.ts.map