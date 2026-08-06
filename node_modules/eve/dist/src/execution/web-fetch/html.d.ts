/**
 * Converts an HTML string to Markdown using Turndown.
 *
 * Removes `<script>`, `<style>`, `<meta>`, and `<link>` elements before
 * conversion to keep the output focused on document content.
 */
export declare function convertHtmlToMarkdown(html: string): string;
/**
 * Strips HTML tags and extracts readable text content.
 *
 * Removes content inside `<script>`, `<style>`, and `<noscript>` elements,
 * replaces block-level tags with newlines, decodes common HTML entities, and
 * normalises whitespace.
 */
export declare function extractTextFromHtml(html: string): string;
