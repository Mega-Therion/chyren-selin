// Auto-generated stub for `@chat-adapter/shared` types referenced by a vendored .d.ts.
// Emitted by scripts/vendor-compiled/@chat-adapter/slack.mjs.

export interface EncryptedTokenData {
  data: string;
  iv: string;
  tag: string;
}
export declare function decodeKey(rawKey: string): Buffer;
