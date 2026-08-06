import { P as PostableObject, h as Adapter, i as PostableObjectContext, S as StreamChunk, j as ThreadHistoryCache, k as ThreadHistoryConfig, l as StreamEvent, E as EmojiFormats, m as EmojiMapConfig, n as EmojiValue, W as WellKnownEmoji, o as CustomEmojiMap, p as AdapterPostableMessage } from './messages-BSoJG691.js';
export { q as ActionEvent, r as ActionHandler, A as AiAssistantMessage, b as AiFilePart, c as AiImagePart, d as AiMessage, e as AiMessagePart, f as AiTextPart, g as AiUserMessage, s as AppContextCanvasEntity, u as AppContextChangedEvent, v as AppContextChangedHandler, w as AppContextChannelEntity, x as AppContextEntity, y as AppContextEntityBase, z as AppContextListEntity, B as AppContextMessageEntity, D as AppContextUnknownEntity, F as AppHomeOpenedEvent, G as AppHomeOpenedHandler, H as AppendInput, I as AppendOptions, J as AssistantContextChangedEvent, K as AssistantContextChangedHandler, L as AssistantThreadStartedEvent, N as AssistantThreadStartedHandler, O as Attachment, Q as Author, R as Channel, U as ChannelImpl, V as ChannelInfo, a as ChannelVisibility, C as Chat, X as ChatConfig, Y as ChatInstance, Z as ConcurrencyConfig, _ as ConcurrencyStrategy, $ as ConsoleLogger, a0 as CountQuery, a1 as DeleteTarget, a2 as DirectMessageHandler, a3 as DurationString, a4 as Emoji, a5 as EphemeralMessage, a6 as FetchDirection, a7 as FetchOptions, a8 as FetchResult, a9 as FileUpload, aa as FormattedContent, ab as IdentityContext, ac as IdentityResolver, ad as LinkPreview, ae as ListQuery, af as ListThreadsOptions, ag as ListThreadsResult, ah as Lock, ai as LockScope, aj as LockScopeContext, ak as LogLevel, al as Logger, am as MarkdownTextChunk, an as MemberJoinedChannelEvent, ao as MemberJoinedChannelHandler, ap as MentionHandler, M as Message, aq as MessageContext, ar as MessageData, as as MessageHandler, at as MessageMetadata, au as MessageSubject, av as ModalClearResponse, aw as ModalCloseEvent, ax as ModalCloseHandler, ay as ModalCloseResponse, az as ModalErrorsResponse, aA as ModalPushResponse, aB as ModalResponse, aC as ModalSubmitEvent, aD as ModalSubmitHandler, aE as ModalUpdateResponse, aF as OptionsLoadEvent, aG as OptionsLoadGroup, aH as OptionsLoadHandler, aI as OptionsLoadResult, aJ as PlanUpdateChunk, aK as PostEphemeralOptions, aL as Postable, aM as PostableAst, aN as PostableCard, aO as PostableMarkdown, aP as PostableMessage, aQ as PostableRaw, aR as QueueEntry, aS as RawMessage, aT as ReactionEvent, aU as ReactionHandler, aV as ScheduledMessage, aW as SentMessage, aX as SerializedChannel, aY as SerializedMessage, aZ as SerializedThread, a_ as SlashCommandEvent, a$ as SlashCommandHandler, b0 as StateAdapter, b1 as StreamOptions, b2 as SubscribedMessageHandler, b3 as THREAD_STATE_TTL_MS, b4 as TaskUpdateChunk, b5 as Thread, b6 as ThreadImpl, b7 as ThreadInfo, b8 as ThreadSummary, T as ToAiMessagesOptions, b9 as TranscriptEntry, ba as TranscriptRole, bb as TranscriptsApi, bc as TranscriptsConfig, bd as UserInfo, be as WebhookOptions, bf as deriveChannelId, bg as isPostableObject, t as toAiMessages } from './messages-BSoJG691.js';
import { Root, List, Content, Blockquote, Code, Emphasis, InlineCode, Delete, Link, ListItem, Paragraph, Strong, TableCell, Table as Table$1, TableRow, Text } from './_mdast.js';
export { Blockquote, Code, Content, Delete, Emphasis, InlineCode, Link, List, ListItem, Table as MdastTable, Nodes, Paragraph, Root, Strong, TableCell, TableRow, Text } from './_mdast.js';
import { C as CardElement, a as CardChild, b as ChartElement, A as ActionsComponent, B as ButtonComponent, c as CardComponent, d as CardLinkComponent, T as TextComponent, e as ChartComponent, D as DividerComponent, E as ExternalSelectComponent, F as FieldComponent, f as FieldsComponent, I as ImageComponent, L as LinkButtonComponent, M as ModalComponent, R as RadioSelectComponent, S as SectionComponent, g as SelectComponent, h as SelectOptionComponent, i as Table$2, j as TextInputComponent, k as cardChildToFallbackText$1, l as fromReactElement$1, m as fromReactModalElement$1, n as isCardElement$1, o as isJSX$1, p as isModalElement$1, t as toCardElement$1, q as toModalElement$1 } from './jsx-runtime-_JEEAotp.js';
export { r as ActionsElement, s as ButtonElement, u as ButtonOptions, v as ButtonProps, w as ButtonStyle, x as CardJSXElement, y as CardJSXProps, z as CardLinkProps, G as CardOptions, H as CardProps, J as ChartDataPoint, K as ChartDefinition, N as ChartOptions, O as ChartSegment, P as ChartSeries, Q as ChatElement, U as ContainerProps, V as DividerElement, W as DividerProps, X as ExternalSelectElement, Y as ExternalSelectOptions, Z as ExternalSelectProps, _ as FieldElement, $ as FieldProps, a0 as FieldsElement, a1 as ImageElement, a2 as ImageProps, a3 as LinkButtonElement, a4 as LinkButtonOptions, a5 as LinkButtonProps, a6 as LinkElement, a7 as ModalChild, a8 as ModalElement, a9 as ModalOptions, aa as ModalProps, ab as PieChartDefinition, ac as RadioSelectElement, ad as RadioSelectOptions, ae as SectionElement, af as SelectElement, ag as SelectOptionElement, ah as SelectOptionProps, ai as SelectOptions, aj as SelectProps, ak as SeriesChartDefinition, al as TableAlignment, am as TableElement, an as TableOptions, ao as TextElement, ap as TextInputElement, aq as TextInputOptions, ar as TextInputProps, as as TextProps, at as TextStyle } from './jsx-runtime-_JEEAotp.js';
import './_workflow-serde.js';

/**
 * Error types for chat-sdk
 */
declare class ChatError extends Error {
    readonly code: string;
    readonly cause?: unknown;
    constructor(message: string, code: string, cause?: unknown);
}
declare class RateLimitError extends ChatError {
    readonly retryAfterMs?: number;
    constructor(message: string, retryAfterMs?: number, cause?: unknown);
}
declare class LockError extends ChatError {
    constructor(message: string, cause?: unknown);
}
declare class NotImplementedError extends ChatError {
    readonly feature?: string;
    constructor(message: string, feature?: string, cause?: unknown);
}

type PlanTaskStatus = "pending" | "in_progress" | "complete" | "error";
interface PlanTask {
    id: string;
    status: PlanTaskStatus;
    title: string;
}
interface PlanModel {
    tasks: PlanModelTask[];
    title: string;
}
interface PlanModelTask {
    details?: PlanContent;
    id: string;
    output?: PlanContent;
    status: PlanTaskStatus;
    title: string;
}
type PlanContent = string | string[] | {
    markdown: string;
} | {
    ast: Root;
};
interface StartPlanOptions {
    /** Initial plan title and first task title */
    initialMessage: PlanContent;
}
interface AddTaskOptions {
    /** When true (default), mark existing in_progress tasks complete before adding. */
    autoCompletePrevious?: boolean;
    /** Task details/substeps. */
    children?: PlanContent;
    title: PlanContent;
}
type UpdateTaskInput = PlanContent | {
    /** Task ID to update. If omitted, updates the last in_progress task. */
    id?: string;
    /** Task output/results. */
    output?: PlanContent;
    /** Optional status override. */
    status?: PlanTaskStatus;
};
interface CompletePlanOptions {
    /** Final plan title shown when completed */
    completeMessage: PlanContent;
}
/**
 * A Plan represents a task list that can be posted to a thread.
 *
 * Create a plan with `new Plan({ initialMessage: "..." })` and post it with `thread.post(plan)`.
 * After posting, use methods like `addTask()`, `updateTask()`, and `complete()` to update it.
 * For parallel steps, pass `autoCompletePrevious: false` to `addTask()` and use `updateTask({ id })` to update individual tasks.
 *
 * @example
 * ```typescript
 * const plan = new Plan({ initialMessage: "Starting task..." });
 * await thread.post(plan);
 * await plan.addTask({ title: "Fetch data" });
 * await plan.updateTask("Got 42 results");
 * await plan.complete({ completeMessage: "Done!" });
 * ```
 */
declare class Plan implements PostableObject<PlanModel> {
    readonly $$typeof: symbol;
    readonly kind = "plan";
    private _model;
    private _bound;
    constructor(options: StartPlanOptions);
    isSupported(adapter: Adapter): boolean;
    getPostData(): PlanModel;
    getFallbackText(): string;
    onPosted(context: PostableObjectContext): void;
    get id(): string;
    get threadId(): string;
    get title(): string;
    get tasks(): readonly PlanTask[];
    get currentTask(): PlanTask | null;
    addTask(options: AddTaskOptions): Promise<PlanTask | null>;
    updateTask(update?: UpdateTaskInput): Promise<PlanTask | null>;
    reset(options: StartPlanOptions): Promise<PlanTask | null>;
    complete(options: CompletePlanOptions): Promise<void>;
    private canMutate;
    private enqueueEdit;
}

/**
 * Normalizes an async iterable stream for use with `thread.post()`.
 *
 * Handles three stream types automatically:
 * - **Text streams** (`AsyncIterable<string>`, e.g. AI SDK `textStream`) —
 *   passed through as-is.
 * - **Full streams** (`AsyncIterable<object>`, e.g. AI SDK `fullStream`) —
 *   extracts `text-delta` events and injects `"\n\n"` separators between
 *   steps so that multi-step agent output reads naturally.
 * - **StreamChunk objects** (`task_update`, `plan_update`, `markdown_text`) —
 *   passed through as-is for adapters with native structured chunk support.
 *
 * This is used internally by `thread.post()`, so you can pass either stream
 * directly:
 * ```ts
 * await thread.post(result.fullStream); // auto-detected
 * await thread.post(result.textStream); // still works
 * ```
 */
declare function fromFullStream(stream: AsyncIterable<unknown>): AsyncIterable<string | StreamChunk>;

/**
 * @deprecated Renamed — import from `./thread-history` instead.
 *
 * This module is preserved for backwards compatibility and re-exports the
 * new names under the old identifiers. New code should use `ThreadHistoryCache`
 * and `ThreadHistoryConfig` directly.
 */

/** @deprecated Use `ThreadHistoryConfig` from `./thread-history` instead. */
type MessageHistoryConfig = ThreadHistoryConfig;
/** @deprecated Use `ThreadHistoryCache` from `./thread-history` instead. */
declare const MessageHistoryCache: typeof ThreadHistoryCache;
/** @deprecated Use `ThreadHistoryCache` from `./thread-history` instead. */
type MessageHistoryCache = ThreadHistoryCache;

/**
 * Standalone JSON reviver for Chat SDK objects.
 *
 * Restores serialized Thread, Channel, and Message instances during
 * JSON.parse() without requiring a Chat instance. This is useful in
 * environments like Vercel Workflow functions where importing the full
 * Chat instance (with its adapter dependencies) is not possible.
 *
 * Thread instances created this way use lazy adapter resolution —
 * the adapter is looked up from the Chat singleton when first accessed,
 * so `chat.registerSingleton()` must be called before using thread
 * methods like `post()` (typically inside a "use step" function).
 */
declare function reviver(_key: string, value: unknown): unknown;

interface StreamingMarkdownRendererOptions {
    /**
     * Wrap confirmed table blocks in code fences for append-only consumers that
     * cannot render markdown tables while a stream is in flight.
     */
    wrapTablesForAppend?: boolean;
}
/**
 * A streaming markdown renderer that buffers potential table headers
 * until confirmed by a separator line, preventing tables from flashing
 * as raw pipe-delimited text during LLM streaming.
 *
 * Outputs markdown (not platform text). Format conversion still happens
 * in the adapter's editMessage → renderPostable → fromAst pipeline.
 */
declare class StreamingMarkdownRenderer {
    private accumulated;
    private dirty;
    private cachedRender;
    private finished;
    /** Number of code fence toggles from completed lines (odd = inside). */
    private fenceToggles;
    /** Incomplete trailing line buffer for incremental fence tracking. */
    private incompleteLine;
    private readonly options;
    constructor(options?: StreamingMarkdownRendererOptions);
    /** Append a chunk from the LLM stream. */
    push(chunk: string): void;
    /** O(1) check if accumulated text is inside an unclosed code fence. */
    private isAccumulatedInsideFence;
    /**
     * Get renderable markdown for an intermediate edit.
     * - Holds back trailing lines that look like a table header (|...|)
     *   until a separator line (|---|---|) confirms or the next line denies.
     * - Applies remend() to close incomplete inline markers.
     * - Idempotent: returns cached result if no push() since last call.
     */
    render(): string;
    /**
     * Get text safe for append-only streaming (e.g. Slack native streaming).
     *
     * - Holds back unconfirmed table headers until separator arrives.
     * - Optionally wraps confirmed tables in code fences so pipes render as
     *   literal text on append-only surfaces that lack native table support.
     *   The code fence is left OPEN while the table is still streaming,
     *   keeping output monotonic for deltas.
     * - Holds back unclosed inline markers (**, *, ~~, `, [).
     * - The final editMessage replaces everything with properly formatted text.
     */
    getCommittableText(): string;
    /** Raw accumulated text (no remend, no buffering). For the final edit. */
    getText(): string;
    /** Signal stream end. Flushes held-back lines. Returns final render. */
    finish(): string;
    private formatAppendOnlyText;
}

interface StreamingPlanOptions {
    /**
     * Block Kit elements to attach when the stream stops (Slack only).
     * Useful for adding feedback buttons after a streamed response.
     */
    endWith?: unknown[];
    /**
     * Controls how task_update chunks are displayed (Slack only).
     * - `"plan"` - all tasks grouped into a single plan block
     * - `"timeline"` - individual task cards shown inline with text (default)
     */
    groupTasks?: "plan" | "timeline";
    /**
     * Minimum interval between updates in ms (default: 500).
     * Used by post+edit streaming paths.
     */
    updateIntervalMs?: number;
}
interface StreamingPlanData {
    options: StreamingPlanOptions;
    stream: AsyncIterable<string | StreamChunk | StreamEvent>;
}
/**
 * A StreamingPlan wraps an async iterable with platform-specific streaming options.
 *
 * Use this when you need to pass options like task grouping or stop blocks
 * to the streaming API. For simple streaming without options, pass the
 * async iterable directly to `thread.post()`.
 *
 * @example
 * ```typescript
 * const stream = new StreamingPlan(result.fullStream, {
 *   groupTasks: "plan",
 *   endWith: [feedbackBlock],
 * });
 * await thread.post(stream);
 * ```
 */
declare class StreamingPlan implements PostableObject<StreamingPlanData> {
    readonly $$typeof: symbol;
    readonly kind = "stream";
    private readonly _stream;
    private readonly _options;
    constructor(stream: AsyncIterable<string | StreamChunk | StreamEvent>, options?: StreamingPlanOptions);
    get stream(): AsyncIterable<string | StreamChunk | StreamEvent>;
    get options(): StreamingPlanOptions;
    getFallbackText(): string;
    getPostData(): StreamingPlanData;
    isSupported(_adapter: Adapter): boolean;
    onPosted(_context: PostableObjectContext): void;
}

/**
 * Get or create an immutable singleton EmojiValue.
 *
 * Always returns the same frozen object for the same name,
 * enabling `===` comparison for emoji identity.
 *
 * @example
 * ```typescript
 * const e1 = getEmoji("thumbs_up");
 * const e2 = getEmoji("thumbs_up");
 * console.log(e1 === e2); // true - same object
 * ```
 */
declare function getEmoji(name: string): EmojiValue;
/**
 * Default emoji map for well-known emoji.
 * Maps normalized emoji names to platform-specific formats.
 */
declare const DEFAULT_EMOJI_MAP: Record<string, EmojiFormats>;
/**
 * Emoji resolver that handles conversion between platform formats and normalized names.
 */
declare class EmojiResolver {
    private readonly emojiMap;
    private readonly slackToNormalized;
    private readonly gchatToNormalized;
    constructor(customMap?: EmojiMapConfig);
    private buildReverseMaps;
    /**
     * Convert a Slack emoji name to normalized EmojiValue.
     * Returns an EmojiValue for the raw emoji if no mapping exists.
     */
    fromSlack(slackEmoji: string): EmojiValue;
    /**
     * Convert a Google Chat unicode emoji to normalized EmojiValue.
     * Returns an EmojiValue for the raw emoji if no mapping exists.
     */
    fromGChat(gchatEmoji: string): EmojiValue;
    /**
     * Convert a Teams reaction type to normalized EmojiValue.
     * Teams uses specific names: like, heart, laugh, surprised, sad, angry
     * Returns an EmojiValue for the raw reaction if no mapping exists.
     */
    fromTeams(teamsReaction: string): EmojiValue;
    /**
     * Convert a normalized emoji (or EmojiValue) to Slack format.
     * Returns the first Slack format if multiple exist.
     */
    toSlack(emoji: EmojiValue | string): string;
    /**
     * Convert a normalized emoji (or EmojiValue) to Google Chat format.
     * Returns the first GChat format if multiple exist.
     */
    toGChat(emoji: EmojiValue | string): string;
    /**
     * Convert a normalized emoji (or EmojiValue) to Discord format (unicode).
     * Discord uses unicode emoji, same as Google Chat.
     */
    toDiscord(emoji: EmojiValue | string): string;
    /**
     * Check if an emoji (in any format) matches a normalized emoji name or EmojiValue.
     */
    matches(rawEmoji: string, normalized: EmojiValue | string): boolean;
    /**
     * Add or override emoji mappings.
     */
    extend(customMap: EmojiMapConfig): void;
}
/**
 * Default emoji resolver instance.
 */
declare const defaultEmojiResolver: EmojiResolver;
/**
 * Convert emoji placeholders in text to platform-specific format.
 *
 * @example
 * ```typescript
 * convertEmojiPlaceholders("Thanks! {{emoji:thumbs_up}}", "slack");
 * // Returns: "Thanks! :+1:"
 *
 * convertEmojiPlaceholders("Thanks! {{emoji:thumbs_up}}", "gchat");
 * // Returns: "Thanks! 👍"
 * ```
 */
declare function convertEmojiPlaceholders(text: string, platform: "slack" | "gchat" | "teams" | "discord" | "messenger" | "github" | "linear" | "whatsapp" | "x", resolver?: EmojiResolver): string;
/** Base emoji object with well-known emoji as EmojiValue singletons */
type BaseEmojiHelper = {
    [K in WellKnownEmoji]: EmojiValue;
} & {
    /** Create an EmojiValue for a custom emoji name */
    custom: (name: string) => EmojiValue;
};
/** Extended emoji object including custom emoji from module augmentation */
type ExtendedEmojiHelper = BaseEmojiHelper & {
    [K in keyof CustomEmojiMap]: EmojiValue;
};
/**
 * Create a type-safe emoji helper with custom emoji.
 *
 * Returns immutable singleton EmojiValue objects that support:
 * - Object identity comparison (`event.emoji === emoji.thumbs_up`)
 * - Template string interpolation (`${emoji.thumbs_up}` → "{{emoji:thumbs_up}}")
 *
 * Custom emoji are automatically registered with the default resolver,
 * so placeholders will convert correctly in messages.
 *
 * @example
 * ```typescript
 * // First, extend the CustomEmojiMap type (usually in a .d.ts file)
 * declare module "chat" {
 *   interface CustomEmojiMap {
 *     unicorn: EmojiFormats;
 *     company_logo: EmojiFormats;
 *   }
 * }
 *
 * // Then create the emoji helper with your custom emoji
 * const emoji = createEmoji({
 *   unicorn: { slack: "unicorn_face", gchat: "🦄" },
 *   company_logo: { slack: "company", gchat: "🏢" },
 * });
 *
 * // Object identity works for comparisons
 * if (event.emoji === emoji.unicorn) { ... }
 *
 * // Template strings work for messages
 * await thread.post(`${emoji.unicorn} Magic!`);
 * // Slack: ":unicorn_face: Magic!"
 * // GChat: "🦄 Magic!"
 * ```
 */
declare function createEmoji<T extends Record<string, {
    slack: string | string[];
    gchat: string | string[];
}>>(customEmoji?: T): BaseEmojiHelper & {
    [K in keyof T]: EmojiValue;
};
/**
 * Type-safe emoji helper for embedding emoji in messages.
 *
 * @example
 * ```typescript
 * import { emoji } from "chat";
 *
 * await thread.post(`Great job! ${emoji.thumbs_up} ${emoji.fire}`);
 * // Slack: "Great job! :+1: :fire:"
 * // GChat: "Great job! 👍 🔥"
 * ```
 *
 * For custom emoji, use `createEmoji()` with module augmentation:
 * @example
 * ```typescript
 * // types.d.ts
 * declare module "chat" {
 *   interface CustomEmojiMap {
 *     unicorn: EmojiFormats;
 *   }
 * }
 *
 * // bot.ts
 * const emoji = createEmoji({ unicorn: { slack: "unicorn", gchat: "🦄" } });
 * await thread.post(`${emoji.unicorn} Magic!`);
 * ```
 */
declare const emoji: ExtendedEmojiHelper;

/**
 * Markdown parsing and conversion utilities using unified/remark.
 */

type PostableMessageInput = AdapterPostableMessage;

/**
 * Type guard for text nodes.
 */
declare function isTextNode(node: Content): node is Text;
/**
 * Type guard for paragraph nodes.
 */
declare function isParagraphNode(node: Content): node is Paragraph;
/**
 * Type guard for strong (bold) nodes.
 */
declare function isStrongNode(node: Content): node is Strong;
/**
 * Type guard for emphasis (italic) nodes.
 */
declare function isEmphasisNode(node: Content): node is Emphasis;
/**
 * Type guard for delete (strikethrough) nodes.
 */
declare function isDeleteNode(node: Content): node is Delete;
/**
 * Type guard for inline code nodes.
 */
declare function isInlineCodeNode(node: Content): node is InlineCode;
/**
 * Type guard for code block nodes.
 */
declare function isCodeNode(node: Content): node is Code;
/**
 * Type guard for link nodes.
 */
declare function isLinkNode(node: Content): node is Link;
/**
 * Type guard for blockquote nodes.
 */
declare function isBlockquoteNode(node: Content): node is Blockquote;
/**
 * Type guard for list nodes.
 */
declare function isListNode(node: Content): node is List;
/**
 * Type guard for list item nodes.
 */
declare function isListItemNode(node: Content): node is ListItem;
/**
 * Type guard for table nodes.
 */
declare function isTableNode(node: Content): node is Table$1;
/**
 * Type guard for table row nodes.
 */
declare function isTableRowNode(node: Content): node is TableRow;
/**
 * Type guard for table cell nodes.
 */
declare function isTableCellNode(node: Content): node is TableCell;
/**
 * Render an mdast table node as a padded ASCII table string.
 *
 * Produces output like:
 * ```
 * Name  | Age | Role
 * ------|-----|--------
 * Alice | 30  | Engineer
 * Bob   | 25  | Designer
 * ```
 *
 * Shared by adapters that lack native table support (Slack, GChat, Discord, Telegram).
 */
declare function tableToAscii(node: Table$1): string;
/**
 * Render a table from headers and string rows as a padded ASCII table.
 * Used for card TableElement fallback rendering.
 */
declare function tableElementToAscii(headers: string[], rows: string[][]): string;
/**
 * Render a chart element as text: the title followed by the underlying
 * data as a padded ASCII table.
 * Used for card ChartElement fallback rendering on platforms without
 * native chart support.
 */
declare function chartElementToFallbackText(element: ChartElement): string;
/**
 * Get children from a content node that has children.
 * Returns empty array for nodes without children.
 * This eliminates the need for `as Content` casts in adapter converters.
 */
declare function getNodeChildren(node: Content): Content[];
/**
 * Get value from a content node that has a value property.
 * Returns empty string for nodes without value.
 */
declare function getNodeValue(node: Content): string;
/**
 * Parse markdown string into an AST.
 * Supports GFM (GitHub Flavored Markdown) for strikethrough, tables, etc.
 */
declare function parseMarkdown(markdown: string): Root;
/**
 * Options for stringifyMarkdown.
 */
interface StringifyOptions {
    /** Bullet character for unordered lists. Default: `'*'` */
    bullet?: "*" | "-" | "+";
    /** Emphasis marker character. Default: `'*'` */
    emphasis?: "*" | "_";
}
/**
 * Stringify an AST back to markdown.
 */
declare function stringifyMarkdown(ast: Root, options?: StringifyOptions): string;
/**
 * Extract plain text from an AST (strips all formatting).
 */
declare function toPlainText(ast: Root): string;
/**
 * Extract plain text from a markdown string.
 */
declare function markdownToPlainText(markdown: string): string;
/**
 * Walk the AST and transform nodes.
 */
declare function walkAst<T extends Content | Root>(node: T, visitor: (node: Content) => Content | null): T;
/**
 * Create a text node.
 */
declare function text(value: string): Text;
/**
 * Create a strong (bold) node.
 */
declare function strong(children: Content[]): Strong;
/**
 * Create an emphasis (italic) node.
 */
declare function emphasis(children: Content[]): Emphasis;
/**
 * Create a delete (strikethrough) node.
 */
declare function strikethrough(children: Content[]): Delete;
/**
 * Create an inline code node.
 */
declare function inlineCode(value: string): InlineCode;
/**
 * Create a code block node.
 */
declare function codeBlock(value: string, lang?: string): Code;
/**
 * Create a link node.
 */
declare function link(url: string, children: Content[], title?: string): Link;
/**
 * Create a blockquote node.
 */
declare function blockquote(children: Content[]): Blockquote;
/**
 * Create a paragraph node.
 */
declare function paragraph(children: Content[]): Paragraph;
/**
 * Create a root node (top-level AST container).
 */
declare function root(children: Content[]): Root;
/**
 * Interface for platform-specific format converters.
 *
 * The AST (mdast Root) is the canonical representation.
 * All conversions go through the AST:
 *
 *   Platform Format <-> AST <-> Markdown String
 *
 * Adapters implement this interface to convert between
 * their platform-specific format and the standard AST.
 */
interface FormatConverter {
    /**
     * Extract plain text from platform format.
     * Convenience method - default implementation uses toAst + toPlainText.
     */
    extractPlainText(platformText: string): string;
    /**
     * Render an AST to the platform's native format.
     * This is the primary method used when sending messages.
     */
    fromAst(ast: Root): string;
    /**
     * Parse platform's native format into an AST.
     * This is the primary method used when receiving messages.
     */
    toAst(platformText: string): Root;
}
/**
 * @deprecated Use FormatConverter instead
 */
interface MarkdownConverter extends FormatConverter {
    fromMarkdown(markdown: string): string;
    toMarkdown(platformText: string): string;
    toPlainText(platformText: string): string;
}
/**
 * Base class for format converters with default implementations.
 */
declare abstract class BaseFormatConverter implements FormatConverter {
    abstract fromAst(ast: Root): string;
    abstract toAst(platformText: string): Root;
    protected renderList(node: List, depth: number, nodeConverter: (node: Content) => string, unorderedBullet?: string): string;
    /**
     * Default fallback for converting an unknown mdast node to text.
     * Recursively converts children if present, otherwise extracts the node value.
     * Adapters should call this in their nodeToX() default case.
     */
    protected defaultNodeToText(node: Content, nodeConverter: (node: Content) => string): string;
    /**
     * Template method for implementing fromAst with a node converter.
     * Iterates through AST children and converts each using the provided function.
     * Joins results with double newlines (standard paragraph separation).
     *
     * @param ast - The AST to convert
     * @param nodeConverter - Function to convert each Content node to string
     * @returns Platform-formatted string
     */
    protected fromAstWithNodeConverter(ast: Root, nodeConverter: (node: Content) => string): string;
    extractPlainText(platformText: string): string;
    fromMarkdown(markdown: string): string;
    toMarkdown(platformText: string): string;
    /** @deprecated Use extractPlainText instead */
    toPlainText(platformText: string): string;
    /**
     * Convert a PostableMessage to platform format (text only).
     * - string: passed through as raw text (no conversion)
     * - { raw: string }: passed through as raw text (no conversion)
     * - { markdown: string }: converted from markdown to platform format
     * - { ast: Root }: converted from AST to platform format
     * - { card: CardElement }: returns fallback text (cards should be handled by adapter)
     * - CardElement: returns fallback text (cards should be handled by adapter)
     *
     * Note: For cards, adapters should check for card content first and render
     * them using platform-specific card APIs, using this method only for fallback.
     */
    renderPostable(message: PostableMessageInput): string;
    /**
     * Generate fallback text from a card element.
     * Override in subclasses for platform-specific formatting.
     */
    protected cardToFallbackText(card: CardElement): string;
    /**
     * Convert card child element to fallback text.
     */
    protected cardChildToFallbackText(child: CardChild): string | null;
}

declare const Actions: ActionsComponent;
declare const Button: ButtonComponent;
declare const Card: CardComponent;
declare const cardChildToFallbackText: typeof cardChildToFallbackText$1;
declare const CardLink: CardLinkComponent;
declare const CardText: TextComponent;
declare const Chart: ChartComponent;
declare const Divider: DividerComponent;
declare const Field: FieldComponent;
declare const Fields: FieldsComponent;
declare const fromReactElement: typeof fromReactElement$1;
declare const Image: ImageComponent;
declare const isCardElement: typeof isCardElement$1;
declare const isJSX: typeof isJSX$1;
declare const LinkButton: LinkButtonComponent;
declare const Section: SectionComponent;
declare const Table: typeof Table$2;
declare const toCardElement: typeof toCardElement$1;
declare const toModalElement: typeof toModalElement$1;

declare const fromReactModalElement: typeof fromReactModalElement$1;
declare const isModalElement: typeof isModalElement$1;
declare const ExternalSelect: ExternalSelectComponent;
declare const Modal: ModalComponent;
declare const RadioSelect: RadioSelectComponent;
declare const Select: SelectComponent;
declare const SelectOption: SelectOptionComponent;
declare const TextInput: TextInputComponent;

export { Actions, ActionsComponent, Adapter, AdapterPostableMessage, type AddTaskOptions, BaseFormatConverter, Button, ButtonComponent, Card, CardChild, CardComponent, CardElement, CardLink, CardLinkComponent, CardText, Chart, ChartElement, ChatError, type CompletePlanOptions, CustomEmojiMap, DEFAULT_EMOJI_MAP, Divider, DividerComponent, EmojiFormats, EmojiMapConfig, EmojiResolver, EmojiValue, ExternalSelect, ExternalSelectComponent, Field, FieldComponent, Fields, FieldsComponent, type FormatConverter, Image, ImageComponent, LinkButton, LinkButtonComponent, LockError, type MarkdownConverter, MessageHistoryCache, type MessageHistoryConfig, Modal, ModalComponent, NotImplementedError, Plan, type PlanContent, type PlanModel, type PlanModelTask, type PlanTask, type PlanTaskStatus, PostableObject, PostableObjectContext, RadioSelect, RadioSelectComponent, RateLimitError, Section, SectionComponent, Select, SelectComponent, SelectOption, SelectOptionComponent, type StartPlanOptions, StreamChunk, StreamEvent, StreamingMarkdownRenderer, StreamingPlan, type StreamingPlanData, type StreamingPlanOptions, Table, TextComponent, TextInput, TextInputComponent, ThreadHistoryCache, ThreadHistoryConfig, type UpdateTaskInput, WellKnownEmoji, blockquote, cardChildToFallbackText, chartElementToFallbackText, codeBlock, convertEmojiPlaceholders, createEmoji, defaultEmojiResolver, emoji, emphasis, fromFullStream, fromReactElement, fromReactModalElement, getEmoji, getNodeChildren, getNodeValue, inlineCode, isBlockquoteNode, isCardElement, isCodeNode, isDeleteNode, isEmphasisNode, isInlineCodeNode, isJSX, isLinkNode, isListItemNode, isListNode, isModalElement, isParagraphNode, isStrongNode, isTableCellNode, isTableNode, isTableRowNode, isTextNode, link, markdownToPlainText, paragraph, parseMarkdown, reviver, root, strikethrough, stringifyMarkdown, strong, tableElementToAscii, tableToAscii, text, toCardElement, toModalElement, toPlainText, walkAst };
