import TurndownService from"#compiled/turndown/index.js";function convertHtmlToMarkdown(t){let n=new TurndownService({bulletListMarker:`-`,codeBlockStyle:`fenced`,emDelimiter:`*`,headingStyle:`atx`,hr:`---`});return n.remove([`script`,`style`,`meta`,`link`]),n.turndown(t)}function extractTextFromHtml(e){let t=e;return t=t.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi,``),t=t.replace(/<\/(p|div|br|h[1-6]|li|tr|blockquote|pre|section|article|header|footer|nav|aside|main|figure|figcaption|details|summary)>/gi,`
`),t=t.replace(/<br\s*\/?>/gi,`
`),t=t.replace(/<[^>]+>/g,``),t=decodeHtmlEntities(t),t=t.split(`
`).map(e=>e.replace(/[ \t]+/g,` `).trim()).join(`
`).replace(/\n{3,}/g,`

`).trim(),t}const ENTITY_MAP={"&amp;":`&`,"&gt;":`>`,"&lt;":`<`,"&nbsp;":` `,"&quot;":`"`,"&#39;":`'`,"&#x27;":`'`,"&#x2F;":`/`},ENTITY_PATTERN=new RegExp(Object.keys(ENTITY_MAP).join(`|`),`gi`);function decodeHtmlEntities(e){return e.replace(ENTITY_PATTERN,e=>ENTITY_MAP[e.toLowerCase()]??e)}export{convertHtmlToMarkdown,extractTextFromHtml};