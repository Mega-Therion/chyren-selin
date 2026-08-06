/** Converts markdown into Slack mrkdwn for legacy Slack text surfaces. */
export declare function gfmToSlackMrkdwn(input: string): string;
/** Converts inbound Slack mrkdwn into markdown while preserving code spans and fences. */
export declare function slackMrkdwnToGfm(input: string): string;
