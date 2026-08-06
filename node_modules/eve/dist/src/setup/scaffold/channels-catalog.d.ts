/**
 * Build-time catalog of channels used by programmatic setup and
 * `eve add channel/slack`.
 *
 * Channel *identity* (slug, name, and whether it is scaffoldable) is owned by
 * `@eve/catalog`, the cross-surface source of truth shared with the docs
 * gallery. This module overlays the scaffolder-only concerns — the internal
 * {@link ChannelKind} (the catalog's `eve` web-chat channel is surfaced to users
 * as `web`), the picker copy, and the picker order — and validates that the
 * overlay and the catalog cannot drift apart.
 */
import type { ChannelKind } from "./update/channels.js";
/** A catalog channel the CLI can scaffold, paired with its picker presentation. */
export interface ScaffoldableChannel {
    /** Catalog slug. */
    slug: string;
    /** Internal scaffolder kind passed to `ensureChannel`. */
    kind: ChannelKind;
    /** Canonical item in the official eve registry. */
    registryItem: `channel/${ChannelKind}`;
    /** Picker label. */
    label: string;
    /** Optional picker hint. */
    hint?: string;
}
/**
 * Channels the CLI can scaffold, in picker order. Derived from
 * `@eve/catalog` (`surfaces.scaffoldable`) overlaid with
 * {@link CHANNEL_SCAFFOLDS}. Throws at module load if the two disagree.
 */
export declare const SCAFFOLDABLE_CHANNELS: readonly ScaffoldableChannel[];
