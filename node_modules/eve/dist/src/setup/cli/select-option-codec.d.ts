import type { PromptOption, PromptValue } from "./prompt-ui.js";
export interface SelectOptionCodec<T extends PromptValue> {
    readonly options: PromptOption<string>[];
    encode(value: T): string;
    encodeOptions(options: readonly PromptOption<T>[]): PromptOption<string>[];
    decode(key: string): T;
}
/**
 * Gives prompt options opaque transport keys while preserving their typed
 * values. Primitive stringification is not injective (`1` and `"1"` collide),
 * so renderer-facing keys must not be derived from option values.
 */
export declare function createSelectOptionCodec<T extends PromptValue>(options: readonly PromptOption<T>[]): SelectOptionCodec<T>;
