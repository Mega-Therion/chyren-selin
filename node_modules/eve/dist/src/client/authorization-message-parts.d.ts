import type { AuthorizationCompletedStreamEvent, AuthorizationRequiredStreamEvent } from "#protocol/message.js";
import type { EveAuthorizationPart } from "#client/message-reducer-types.js";
export declare function createAuthorizationRequiredPart(event: AuthorizationRequiredStreamEvent): EveAuthorizationPart;
export declare function createAuthorizationCompletedPart(event: AuthorizationCompletedStreamEvent, existing?: EveAuthorizationPart): EveAuthorizationPart;
