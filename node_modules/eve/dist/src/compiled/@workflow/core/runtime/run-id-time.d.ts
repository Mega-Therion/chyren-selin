/**
 * Extracts the run's creation timestamp (epoch milliseconds) from a `wrun_`
 * run ID by decoding the embedded ULID time component.
 *
 * `@workflow/world-vercel`'s region-tagged run IDs mark an ID as carrying
 * metadata by setting the most-significant bit of the ULID's 48-bit
 * timestamp, which would otherwise skew the decoded time past the year 6400.
 * The tag-bit handling is delegated to the scheme's own codec —
 * `decode()` returns the ULID with the tag bit cleared — so if the tagged
 * layout ever evolves (the scheme carries a 5-bit version field for exactly
 * that), this anchor keeps tracking the codec instead of silently diverging.
 * For untagged input `decode()` is a passthrough.
 *
 * Returns `undefined` when `runId` is not a decodable `wrun_<ulid>` (e.g. a
 * legacy/non-ULID id, or a test fixture like `wrun_test`); callers fall back to
 * an authoritative timestamp from the run snapshot (`createdAt`) in that case.
 */
export declare function runIdCreatedAt(runId: string): number | undefined;
//# sourceMappingURL=run-id-time.d.ts.map