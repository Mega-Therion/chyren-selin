type TwilioCredential = string | (() => Promise<string> | string);
type TwilioFetch = typeof fetch;
interface TwilioCredentials {
    accountSid?: TwilioCredential;
    authToken?: TwilioCredential;
}
type TwilioFormValue = boolean | number | readonly string[] | string | null | undefined;
type TwilioFormFields = Readonly<Record<string, TwilioFormValue>>;
interface TwilioApiOptions {
    apiBaseUrl?: string;
    apiUrl?: string;
    credentials?: TwilioCredentials;
    fetch?: TwilioFetch;
}
interface TwilioApiResponse {
    body: unknown;
    ok: boolean;
    status: number;
}
interface TwilioMessageResource {
    account_sid?: string;
    body?: string | null;
    date_created?: string | null;
    date_sent?: string | null;
    date_updated?: string | null;
    direction?: string;
    error_code?: number | null;
    error_message?: string | null;
    from?: string | null;
    messaging_service_sid?: string | null;
    num_media?: string;
    sid: string;
    status?: string;
    to?: string | null;
    uri?: string;
}
interface TwilioCallResource {
    account_sid?: string;
    answered_by?: string | null;
    caller_name?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    direction?: string;
    duration?: string | null;
    end_time?: string | null;
    from?: string | null;
    parent_call_sid?: string | null;
    sid: string;
    start_time?: string | null;
    status?: string;
    to?: string | null;
    uri?: string;
}
interface SendTwilioMessageOptions extends TwilioApiOptions {
    body?: string;
    from?: string;
    mediaUrl?: readonly string[] | string;
    messagingServiceSid?: string;
    statusCallbackUrl?: string;
    to: string;
}
interface FetchTwilioMessageOptions extends TwilioApiOptions {
    messageSid: string;
}
interface DeleteTwilioMessageOptions extends TwilioApiOptions {
    messageSid: string;
}
interface UpdateTwilioCallOptions extends TwilioApiOptions {
    callSid: string;
    method?: "GET" | "POST";
    status?: "canceled" | "completed";
    twiml?: string;
    url?: string;
}
interface FetchTwilioMediaOptions extends TwilioApiOptions {
    url: string;
}
interface ListTwilioMessagesOptions extends TwilioApiOptions {
    from?: string;
    limit?: number;
    pageSize?: number;
    to?: string;
}
interface CallTwilioApiOptions extends TwilioApiOptions {
    body?: TwilioFormFields | URLSearchParams;
    method?: "DELETE" | "GET" | "POST";
    path: string;
    search?: TwilioFormFields | URLSearchParams;
}
declare class TwilioApiError extends Error {
    body: unknown;
    status: number;
    constructor(message: string, options: {
        body: unknown;
        status: number;
    });
}
declare function resolveTwilioCredential(value: TwilioCredential | undefined, envName: string): Promise<string>;
declare function callTwilioApi(pathOrOptions: CallTwilioApiOptions | string, options?: Omit<CallTwilioApiOptions, "path">): Promise<TwilioApiResponse>;
declare function sendTwilioMessage(options: SendTwilioMessageOptions): Promise<TwilioMessageResource>;
declare function fetchTwilioMessage(options: FetchTwilioMessageOptions): Promise<TwilioMessageResource>;
declare function deleteTwilioMessage(options: DeleteTwilioMessageOptions): Promise<void>;
declare function updateTwilioCall(options: UpdateTwilioCallOptions): Promise<TwilioCallResource>;
declare function fetchTwilioMedia(options: FetchTwilioMediaOptions): Promise<ArrayBuffer>;
declare function listTwilioMessages(options?: ListTwilioMessagesOptions): Promise<TwilioMessageResource[]>;
declare function encodeTwilioForm(fields: TwilioFormFields): URLSearchParams;

export { type CallTwilioApiOptions, type DeleteTwilioMessageOptions, type FetchTwilioMediaOptions, type FetchTwilioMessageOptions, type ListTwilioMessagesOptions, type SendTwilioMessageOptions, TwilioApiError, type TwilioApiOptions, type TwilioApiResponse, type TwilioCallResource, type TwilioCredential, type TwilioCredentials, type TwilioFetch, type TwilioFormFields, type TwilioFormValue, type TwilioMessageResource, type UpdateTwilioCallOptions, callTwilioApi, deleteTwilioMessage, encodeTwilioForm, fetchTwilioMedia, fetchTwilioMessage, listTwilioMessages, resolveTwilioCredential, sendTwilioMessage, updateTwilioCall };
