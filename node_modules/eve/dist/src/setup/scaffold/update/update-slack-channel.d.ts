/**
 * Replaces the connector UID literal in a scaffolded Slack channel definition.
 */
export declare function updateSlackChannelConnectorUid(slackChannelPath: string, connectorUid: string): Promise<{
    patched: boolean;
}>;
