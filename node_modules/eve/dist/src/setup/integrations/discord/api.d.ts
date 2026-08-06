/** Non-secret Discord application metadata resolved from a bot token. */
export interface DiscordApplication {
    id: string;
    name: string;
    publicKey: string;
}
/** Validates a bot token and returns its Discord application. */
export declare function resolveDiscordApplication(botToken: string, fetchImpl?: typeof fetch): Promise<DiscordApplication>;
/** Registers the global command consumed by the default Discord channel. */
export declare function registerDiscordCommand(applicationId: string, botToken: string, command: {
    name: string;
    description: string;
}, fetchImpl?: typeof fetch): Promise<void>;
/** Points Discord HTTP Interactions at a persisted Connect connector. */
export declare function configureDiscordInteractionsEndpoint(botToken: string, connectorId: string, fetchImpl?: typeof fetch): Promise<void>;
