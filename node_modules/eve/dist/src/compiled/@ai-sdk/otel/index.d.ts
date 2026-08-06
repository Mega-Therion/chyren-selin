import { Telemetry, InferTelemetryEvent, GenerateTextStartEvent, GenerateObjectStartEvent, EmbedStartEvent, RerankStartEvent, GenerateObjectStepStartEvent, GenerateObjectStepEndEvent, GenerateTextStepStartEvent, ToolSet, LanguageModelCallStartEvent, LanguageModelCallEndEvent, ToolExecutionStartEvent, ToolExecutionEndEvent, GenerateTextStepEndEvent, GenerateTextEndEvent, GenerateObjectEndEvent, EmbedEndEvent, RerankEndEvent, EmbeddingModelCallStartEvent, EmbeddingModelCallEndEvent, RerankingModelCallStartEvent, RerankingModelCallEndEvent, GenerateTextAbortEvent, Output } from 'ai';
import { Attributes, Tracer } from '#compiled/@opentelemetry/api/index.js';
import { LanguageModelV4Prompt } from '#compiled/@ai-sdk/provider/index.js';
import { Context } from '#compiled/@ai-sdk/provider-utils/index.js';

type OpenTelemetrySpanType = 'operation' | 'step' | 'languageModel' | 'tool' | 'embedding' | 'reranking';
type EnrichSpan = (options: {
    spanType: OpenTelemetrySpanType;
    operationId: string;
    callId: string;
    runtimeContext: Record<string, unknown> | undefined;
}) => Attributes | undefined;
type OpenTelemetryOptions = {
    /**
     * The tracer to use for the telemetry data.
     */
    tracer?: Tracer;
    /**
     * Adds custom attributes to spans when they are created. These attributes are
     * not AI SDK-owned semantics and are intended for observability integrations.
     */
    enrichSpan?: EnrichSpan;
    /**
     * Emit AI SDK usage details that are not represented by GenAI SemConv.
     */
    usage?: boolean;
    /**
     * Emit provider metadata on response spans.
     */
    providerMetadata?: boolean;
    /**
     * Emit embedding input and output values.
     */
    embedding?: boolean;
    /**
     * Emit reranking input documents and output ranking.
     */
    reranking?: boolean;
    /**
     * Emit runtime context values.
     */
    runtimeContext?: boolean;
    /**
     * Emit request headers.
     */
    headers?: boolean;
    /**
     * Emit selected tool choice information.
     */
    toolChoice?: boolean;
    /**
     * Emit object generation schema information.
     */
    schema?: boolean;
};

interface OtelStepStartEvent$1 extends GenerateTextStepStartEvent<ToolSet> {
    readonly stepToolChoice?: unknown;
}
declare class OpenTelemetry implements Telemetry {
    private readonly callStates;
    private readonly tracer;
    private readonly supplementalAttributes;
    private readonly enrichSpan;
    constructor(options?: OpenTelemetryOptions);
    private getCallState;
    private cleanupCallState;
    private getSpanAttributes;
    executeTool<T>({ callId, toolCallId, execute, }: {
        callId: string;
        toolCallId: string;
        execute: () => PromiseLike<T>;
    }): PromiseLike<T>;
    /**
     * Runs the provider `doGenerate`/`doStream` call with the active model-call
     * context.
     */
    executeLanguageModelCall<T>({ callId, execute, }: {
        callId: string;
        execute: () => PromiseLike<T>;
    }): PromiseLike<T>;
    onStart(event: InferTelemetryEvent<GenerateTextStartEvent> | InferTelemetryEvent<GenerateObjectStartEvent> | InferTelemetryEvent<EmbedStartEvent> | InferTelemetryEvent<RerankStartEvent>): void;
    private onGenerateStart;
    private onObjectOperationStart;
    /** @deprecated */
    onObjectStepStart(event: GenerateObjectStepStartEvent): void;
    /** @deprecated */
    onObjectStepEnd(event: GenerateObjectStepEndEvent): void;
    private onEmbedOperationStart;
    onStepStart(event: OtelStepStartEvent$1): void;
    onLanguageModelCallStart(event: LanguageModelCallStartEvent): void;
    onLanguageModelCallEnd(event: LanguageModelCallEndEvent<ToolSet>): void;
    onToolExecutionStart(event: ToolExecutionStartEvent<ToolSet>): void;
    onToolExecutionEnd(event: ToolExecutionEndEvent<ToolSet>): void;
    onStepEnd(event: GenerateTextStepEndEvent<ToolSet>): void;
    /** @deprecated Use `onStepEnd` instead. */
    onStepFinish(event: GenerateTextStepEndEvent<ToolSet>): void;
    onEnd(event: GenerateTextEndEvent<ToolSet> | GenerateObjectEndEvent<unknown> | EmbedEndEvent | RerankEndEvent): void;
    private onGenerateEnd;
    private onObjectOperationEnd;
    private onEmbedOperationEnd;
    onEmbedStart(event: EmbeddingModelCallStartEvent): void;
    onEmbedEnd(event: EmbeddingModelCallEndEvent): void;
    private onRerankOperationStart;
    private onRerankOperationEnd;
    onRerankStart(event: RerankingModelCallStartEvent): void;
    onRerankEnd(event: RerankingModelCallEndEvent): void;
    onAbort(event: GenerateTextAbortEvent<ToolSet>): void;
    onError(error: unknown): void;
}

interface OtelStepStartEvent<TOOLS extends ToolSet = ToolSet, RUNTIME_CONTEXT extends Context = Context, OUTPUT extends Output.Output = Output.Output> extends GenerateTextStepStartEvent<TOOLS, RUNTIME_CONTEXT, OUTPUT> {
    readonly promptMessages?: LanguageModelV4Prompt;
    readonly stepTools?: ReadonlyArray<Record<string, unknown>>;
    readonly stepToolChoice?: unknown;
}
declare class LegacyOpenTelemetry implements Telemetry {
    private readonly callStates;
    /**
     * The tracer to use for the telemetry data.
     */
    private readonly tracer;
    constructor(options?: {
        tracer?: Tracer;
    });
    private getCallState;
    private cleanupCallState;
    executeTool<T>({ callId, toolCallId, execute, }: {
        callId: string;
        toolCallId: string;
        execute: () => PromiseLike<T>;
    }): PromiseLike<T>;
    /**
     * Runs the provider `doGenerate`/`doStream` call with the active legacy
     * model-call context.
     */
    executeLanguageModelCall<T>({ callId, execute, }: {
        callId: string;
        execute: () => PromiseLike<T>;
    }): PromiseLike<T>;
    onStart(event: InferTelemetryEvent<GenerateTextStartEvent> | InferTelemetryEvent<GenerateObjectStartEvent> | InferTelemetryEvent<EmbedStartEvent> | InferTelemetryEvent<RerankStartEvent>): void;
    private onGenerateStart;
    private onObjectOperationStart;
    /** @deprecated */
    onObjectStepStart(event: GenerateObjectStepStartEvent): void;
    /** @deprecated */
    onObjectStepEnd(event: GenerateObjectStepEndEvent): void;
    private onEmbedOperationStart;
    onStepStart(event: OtelStepStartEvent): void;
    onToolExecutionStart(event: ToolExecutionStartEvent<ToolSet>): void;
    onToolExecutionEnd(event: ToolExecutionEndEvent<ToolSet>): void;
    onStepEnd(event: GenerateTextStepEndEvent<ToolSet>): void;
    /** @deprecated Use `onStepEnd` instead. */
    onStepFinish(event: GenerateTextStepEndEvent<ToolSet>): void;
    onEnd(event: GenerateTextEndEvent<ToolSet> | GenerateObjectEndEvent<unknown> | EmbedEndEvent | RerankEndEvent): void;
    private onGenerateEnd;
    private onObjectOperationEnd;
    private onEmbedOperationEnd;
    onEmbedStart(event: EmbeddingModelCallStartEvent): void;
    onEmbedEnd(event: EmbeddingModelCallEndEvent): void;
    private onRerankOperationStart;
    private onRerankOperationEnd;
    onRerankStart(event: RerankingModelCallStartEvent): void;
    onRerankEnd(event: RerankingModelCallEndEvent): void;
    onAbort(event: GenerateTextAbortEvent<ToolSet>): void;
    onError(error: unknown): void;
}

export { type EnrichSpan, LegacyOpenTelemetry, OpenTelemetry, type OpenTelemetryOptions, type OpenTelemetrySpanType };
