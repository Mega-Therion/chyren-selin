interface SlackPlainTextObject {
    emoji?: boolean;
    text: string;
    type: "plain_text";
}
interface SlackMrkdwnTextObject {
    text: string;
    type: "mrkdwn";
    verbatim?: boolean;
}
type SlackTextObject = SlackMrkdwnTextObject | SlackPlainTextObject;
interface SlackTextOptions {
    emoji?: boolean;
    verbatim?: boolean;
}
interface SlackDateOptions {
    link?: string;
}
declare function escapeSlackText(text: string): string;
declare function unescapeSlackText(text: string): string;
declare function createSlackPlainText(text: string, options?: SlackTextOptions): SlackPlainTextObject;
declare function createSlackMrkdwn(text: string, options?: SlackTextOptions): SlackMrkdwnTextObject;
declare function formatSlackUser(userId: string): string;
declare function formatSlackChannel(channelId: string): string;
declare function formatSlackUserGroup(userGroupId: string): string;
declare function formatSlackSpecialMention(mention: "channel" | "everyone" | "here"): string;
declare function formatSlackLink(url: string, label?: string): string;
declare function formatSlackDate(timestamp: Date | number, token: string, fallback: string, options?: SlackDateOptions): string;
declare function slackMrkdwnToMarkdown(mrkdwn: string): string;
declare function markdownBoldToSlackMrkdwn(markdown: string): string;
declare function linkBareSlackMentions(text: string): string;

export { type SlackDateOptions, type SlackMrkdwnTextObject, type SlackPlainTextObject, type SlackTextObject, type SlackTextOptions, createSlackMrkdwn, createSlackPlainText, escapeSlackText, formatSlackChannel, formatSlackDate, formatSlackLink, formatSlackSpecialMention, formatSlackUser, formatSlackUserGroup, linkBareSlackMentions, markdownBoldToSlackMrkdwn, slackMrkdwnToMarkdown, unescapeSlackText };
