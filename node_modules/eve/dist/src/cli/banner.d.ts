export declare const EVE_WORDMARK = "eve";
/**
 * The boot banner shared by every CLI command that announces itself: the eve
 * badge plus the installed version. Printed only by the CLI program's
 * pre-action hook so commands never compose their own variant.
 */
export declare function eveCliBanner(): string;
/**
 * The unstyled wordmark-and-version tag (`☰eve  v0.24.5`) — the boot banner's
 * plain-text form. The dev TUI dims it as its parting line on teardown.
 */
export declare function eveVersionTag(): string;
