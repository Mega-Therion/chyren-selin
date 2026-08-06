/** Posts one framework callback payload with the shared callback transport policy. */
export declare function postSessionCallbackRequest(input: {
    readonly body: unknown;
    readonly url: string;
}): Promise<Response>;
