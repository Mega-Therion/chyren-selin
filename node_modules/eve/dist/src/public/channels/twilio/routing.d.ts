import type { TwilioChannelConfig } from "#public/channels/twilio/twilioChannel.js";
export interface TwilioRoutes {
    readonly messages: string;
    readonly transcription: string;
    readonly voice: string;
}
export type TwilioVerifyResult = {
    readonly body: string;
    readonly params: URLSearchParams;
} | null;
export declare function buildTwilioRoutes(baseRoute: string): TwilioRoutes;
export declare function verifyTwilioInbound(req: Request, config: TwilioChannelConfig): Promise<TwilioVerifyResult>;
export declare function buildTwilioActionUrl(request: Request, config: TwilioChannelConfig, route: string): Promise<string>;
