import type { LanguageModel } from "ai";
import type { ModelRouting } from "#shared/agent-definition.js";
import type { JsonObject } from "#shared/json.js";
/**
 * Classifies how an authored model value will be routed at runtime, through the
 * Vercel AI Gateway or directly to a provider.
 *
 * A bare string id is *defined* as gateway-routed: that is the AI SDK's default
 * (`globalThis.AI_SDK_DEFAULT_PROVIDER ?? gateway`), and the runtime hands the
 * raw string back to the AI SDK to re-resolve. The compile-time global can
 * differ from the runtime global, so observing an override at build time was
 * unreliable and could make the manifest's routing false — we therefore classify
 * the string directly rather than resolving it through the global.
 *
 * For an instance we read its `provider`. AI SDK model construction is lazy
 * (auth and network happen per request), so this is safe to call at build time
 * with no credentials present. Fails closed for instances: a model without a
 * string `provider` throws rather than silently misclassifying.
 *
 * This answers *where* the model routes, not *whether* the model id is valid.
 * An unknown id still classifies as gateway-routed, which is the correct routing
 * answer. Model-existence is the catalog's concern, not this function's.
 */
export declare function classifyModelRouting(model: string | LanguageModel, providerOptions?: Record<string, JsonObject>): ModelRouting;
