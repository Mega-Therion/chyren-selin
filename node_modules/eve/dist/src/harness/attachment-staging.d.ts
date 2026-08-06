import type { ModelMessage, UserContent } from "ai";
import type { ChannelAdapterContext } from "#channel/adapter.js";
import type { SandboxSession } from "#public/definitions/sandbox.js";
/**
 * Sandbox directory where inbound file attachments are staged before the
 * model call. Authored canonical path — {@link SandboxSession.writeFile}
 * translates to the backend-native location.
 */
export declare const ATTACHMENTS_ROOT = "/workspace/attachments";
/**
 * Writes inbound `FilePart` bytes into the sandbox and rewrites each
 * staged part to a compact `eve-sandbox:` ref.
 *
 * Remote HTTP URLs pass through for provider-side fetches; existing
 * `eve-sandbox:` refs pass through so staging is idempotent.
 */
export declare function stageAttachmentsForAdapter(content: string | UserContent, sandbox: SandboxSession, adapterCtx: ChannelAdapterContext): Promise<string | UserContent>;
/**
 * Context-bound variant of {@link stageAttachmentsForAdapter}. Returns
 * the input unchanged when there is no active sandbox or no file parts.
 */
export declare function stageAttachmentsToSandbox(message: string | UserContent): Promise<string | UserContent>;
/**
 * Hydrates `eve-sandbox:` file refs for a single model call.
 *
 * Small images and PDFs are inlined as bytes; larger or unsupported files
 * become text references to their sandbox path. The returned messages must
 * not be written back to session history, which stays ref-only across steps.
 */
export declare function hydrateSandboxAttachments(messages: readonly ModelMessage[]): Promise<ModelMessage[]>;
