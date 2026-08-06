type SlackButtonStyle = "danger" | "default" | "primary";
type SlackTextStyle = "bold" | "muted" | "plain";
type SlackTableAlignment = "center" | "left" | "right";
interface SlackCardElement {
    children: SlackCardChild[];
    imageUrl?: string;
    subtitle?: string;
    title?: string;
    type: "card";
}
type SlackCardChild = SlackActionsElement | SlackChartElement | SlackDividerElement | SlackFieldsElement | SlackImageElement | SlackLinkElement | SlackSectionElement | SlackTableElement | SlackTextElement;
interface SlackTextElement {
    content: string;
    style?: SlackTextStyle;
    type: "text";
}
interface SlackImageElement {
    alt?: string;
    type: "image";
    url: string;
}
interface SlackDividerElement {
    type: "divider";
}
interface SlackActionsElement {
    children: (SlackButtonElement | SlackLinkButtonElement | SlackRadioSelectElement | SlackSelectElement)[];
    type: "actions";
}
interface SlackButtonElement {
    callbackUrl?: string;
    disabled?: boolean;
    id: string;
    label: string;
    style?: SlackButtonStyle;
    type: "button";
    value?: string;
}
interface SlackLinkButtonElement {
    id?: string;
    label: string;
    style?: SlackButtonStyle;
    type: "link-button";
    url: string;
}
interface SlackSelectOptionElement {
    description?: string;
    label: string;
    value: string;
}
interface SlackSelectElement {
    id: string;
    initialOption?: string;
    label: string;
    options: SlackSelectOptionElement[];
    placeholder?: string;
    type: "select";
}
interface SlackRadioSelectElement {
    id: string;
    initialOption?: string;
    label: string;
    options: SlackSelectOptionElement[];
    type: "radio_select";
}
interface SlackSectionElement {
    children: SlackCardChild[];
    type: "section";
}
interface SlackLinkElement {
    label: string;
    type: "link";
    url: string;
}
interface SlackFieldElement {
    label: string;
    type: "field";
    value: string;
}
interface SlackFieldsElement {
    children: SlackFieldElement[];
    type: "fields";
}
interface SlackTableElement {
    align?: SlackTableAlignment[];
    /** Accessible table caption for the data table block */
    caption?: string;
    headers: string[];
    /** Rows per page (1-100; Slack defaults to 5) */
    pageSize?: number;
    rows: string[][];
    type: "table";
}
interface SlackChartSegment {
    /** Legend label (max 20 characters) */
    label: string;
    /** Segment value; must be greater than 0 */
    value: number;
}
interface SlackChartDataPoint {
    /** Category label; must match an entry in the chart's `categories` */
    label: string;
    /** Y-axis value (negative values are permitted) */
    value: number;
}
interface SlackChartSeries {
    /** One data point per category */
    data: SlackChartDataPoint[];
    /** Legend label; unique within the chart (max 20 characters) */
    name: string;
}
interface SlackPieChartDefinition {
    /** Pie segments (1-12) */
    segments: SlackChartSegment[];
    type: "pie";
}
interface SlackSeriesChartDefinition {
    /** X-axis category labels in display order (max 20 characters each) */
    categories: string[];
    /** Data series (1-12); each series needs one point per category */
    series: SlackChartSeries[];
    type: "area" | "bar" | "line";
    /** X-axis title (max 50 characters) */
    xLabel?: string;
    /** Y-axis title (max 50 characters) */
    yLabel?: string;
}
type SlackChartDefinition = SlackPieChartDefinition | SlackSeriesChartDefinition;
interface SlackChartElement {
    chart: SlackChartDefinition;
    /** Chart title (max 50 characters) */
    title: string;
    type: "chart";
}
interface SlackTextObject {
    emoji?: boolean;
    text: string;
    type: "mrkdwn" | "plain_text";
}
interface SlackBlock {
    block_id?: string;
    type: string;
    [key: string]: unknown;
}
interface SlackBlocksOptions {
    convertEmoji?: (text: string) => string;
    maxBlocks?: number;
}

declare class SlackBlockError extends Error {
    constructor(message: string);
}

declare const SLACK_INPUT_ACTION_PREFIX = "input:";
declare const SLACK_FREEFORM_ACTION_PREFIX = "input-freeform:";
declare const SLACK_FREEFORM_CALLBACK_ID = "input-freeform-submit";
declare const SLACK_FREEFORM_BLOCK_ID = "input-freeform-block";
declare const SLACK_FREEFORM_ACTION_ID = "input-freeform-text";
interface SlackInputOption {
    description?: string;
    id: string;
    label: string;
    style?: SlackButtonStyle;
}
interface SlackInputRequest {
    allowFreeform?: boolean;
    display?: "buttons" | "radio" | "select";
    options?: readonly SlackInputOption[];
    prompt: string;
    requestId: string;
}
interface SlackInputAction {
    actionId: string;
    selectedOptionValue?: string;
    value?: string;
}
interface SlackInputResponse {
    optionId?: string;
    requestId: string;
}
interface SlackFreeformViewOptions {
    metadata: unknown;
    prompt?: string;
    title?: string;
}
declare function inputRequestToSlackBlocks(request: SlackInputRequest): SlackBlock[];
declare function parseSlackInputResponse(action: SlackInputAction): SlackInputResponse | null;
declare function buildSlackFreeformView(options: SlackFreeformViewOptions): Record<string, unknown>;
declare function parseSlackFreeformValue(values: readonly {
    actionId: string;
    blockId: string;
    value?: string;
}[]): string | undefined;
declare function answeredSlackInputBlocks(input: {
    answer: string;
    promptBlock?: unknown;
    userId?: string;
}): SlackBlock[];

declare function cardToSlackBlocks(card: SlackCardElement, options?: SlackBlocksOptions): SlackBlock[];
declare const cardToBlockKit: typeof cardToSlackBlocks;
declare function cardToSlackFallbackText(card: SlackCardElement, options?: Pick<SlackBlocksOptions, "convertEmoji">): string;
declare const cardToFallbackText: typeof cardToSlackFallbackText;
declare function convertSlackEmojiPlaceholders(text: string): string;

export { SLACK_FREEFORM_ACTION_ID, SLACK_FREEFORM_ACTION_PREFIX, SLACK_FREEFORM_BLOCK_ID, SLACK_FREEFORM_CALLBACK_ID, SLACK_INPUT_ACTION_PREFIX, type SlackActionsElement, type SlackBlock, SlackBlockError, type SlackBlocksOptions, type SlackButtonElement, type SlackButtonStyle, type SlackCardChild, type SlackCardElement, type SlackChartDataPoint, type SlackChartDefinition, type SlackChartElement, type SlackChartSegment, type SlackChartSeries, type SlackDividerElement, type SlackFieldElement, type SlackFieldsElement, type SlackFreeformViewOptions, type SlackImageElement, type SlackInputAction, type SlackInputOption, type SlackInputRequest, type SlackInputResponse, type SlackLinkButtonElement, type SlackLinkElement, type SlackPieChartDefinition, type SlackRadioSelectElement, type SlackSectionElement, type SlackSelectElement, type SlackSelectOptionElement, type SlackSeriesChartDefinition, type SlackTableAlignment, type SlackTableElement, type SlackTextElement, type SlackTextObject, type SlackTextStyle, answeredSlackInputBlocks, buildSlackFreeformView, cardToBlockKit, cardToFallbackText, cardToSlackBlocks, cardToSlackFallbackText, convertSlackEmojiPlaceholders, inputRequestToSlackBlocks, parseSlackFreeformValue, parseSlackInputResponse };
