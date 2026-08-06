const DEPLOYMENT_URL_PLACEHOLDER=`{{DEPLOYMENT_URL}}`,AGENT_NAME_PLACEHOLDER=`{{AGENT_NAME}}`,HOME_PAGE_HTML_TEMPLATE=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta name="referrer" content="no-referrer">
<title>eve</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #fff;
    --fg: #0a0a0a;
    --muted: #6b6b6b;
    --faint: #999;
    --border: rgba(0, 0, 0, 0.09);
    --accent: #00c46a;
    --divider: rgba(0, 0, 0, 0.22);
    --brand-opacity: 0.08;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0a0a0a;
      --fg: #f5f5f5;
      --muted: #a3a3a3;
      --faint: #737373;
      --border: rgba(255, 255, 255, 0.14);
      --accent: #46d4a4;
      --divider: rgba(255, 255, 255, 0.22);
      --brand-opacity: 0.12;
    }
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    background: var(--bg);
    color: var(--fg);
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    font-feature-settings: "cv11", "ss01";
    font-size: 15px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    display: grid;
    place-items: center;
    padding: 2rem;
  }
  .mono {
    font-family: ui-monospace, "SF Mono", "Menlo", "JetBrains Mono",
      "Cascadia Code", Consolas, "Liberation Mono", monospace;
    font-feature-settings: "zero", "ss01";
  }
  main {
    width: 100%;
    max-width: 28rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
  .brand {
    margin: 0;
    display: flex;
    justify-content: flex-start;
    color: var(--fg);
    opacity: var(--brand-opacity);
  }
  .logo {
    display: block;
    width: 4.875rem;
    height: auto;
  }
  .panel {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  .agent-row {
    display: flex;
    align-items: center;
    gap: 0.9375rem;
    min-width: 0;
  }
  .agent-name {
    color: var(--fg);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.55;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: inherit;
    line-height: inherit;
    color: var(--accent);
    margin: 0;
  }
  .status-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }
  .lede-divider {
    color: var(--divider);
  }
  .lede {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    color: var(--muted);
    font-size: 0.875rem;
  }
  .lede a {
    color: var(--fg);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    text-decoration-color: var(--border);
    transition: text-decoration-color 0.15s ease;
    white-space: nowrap;
  }
  .lede a:hover { text-decoration-color: var(--fg); }
  .lede-arrow {
    display: inline-block;
    margin-left: 0.125rem;
    transition: transform 0.15s ease;
  }
  .lede a:hover .lede-arrow { transform: translateX(2px); }
  .terminal {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    max-width: 28rem;
    padding: 0.8125rem 1.0625rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    text-align: left;
    font-size: 0.8125rem;
    margin: 1rem 0 0;
    overflow-x: auto;
    white-space: nowrap;
  }
  .terminal-prompt {
    color: var(--faint);
    user-select: none;
    flex-shrink: 0;
  }
  .terminal-cmd { color: var(--fg); }
</style>
</head>
<body>
<main>
  <div class="brand" aria-label="eve"><svg aria-hidden="true" class="logo" fill="none" viewBox="0 0 169 53" xmlns="http://www.w3.org/2000/svg">
    <path d="M169 8.47h-51.39L81.73 53H70.36L113 0H169zM169 44.51v8.47h-45.87V44.5zM45.87 52.98H0V44.5h45.87zM38.66 30.55H0v-8.47h38.66z" fill="currentColor"></path>
    <path d="M169 30.55h-38.66v-8.47H169zM75.52 8.47H0V0h75.52z" fill="currentColor"></path>
  </svg></div>
  <section class="panel" aria-label="Agent status">
    <div class="agent-row">
      <strong class="agent-name">${AGENT_NAME_PLACEHOLDER}</strong>
    </div>
    <p class="lede"><span class="status"><span class="status-dot" aria-hidden="true"></span>Ready</span><span class="lede-divider" aria-hidden="true">／</span><span>Agent is up and accepting messages.</span> <a href="https://eve.dev/docs">Docs<span class="lede-arrow" aria-hidden="true">&nbsp;&rarr;</span></a></p>
    <div class="terminal mono" role="group" aria-label="Send a message from your terminal">
      <span class="terminal-prompt" aria-hidden="true">$</span>
      <span class="terminal-cmd">eve dev ${DEPLOYMENT_URL_PLACEHOLDER}</span>
    </div>
  </section>
</main>
</body>
</html>
`;function escapeHtml(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function pickFirstForwardedValue(e){if(e===null)return;let t=e.split(`,`)[0]?.trim();if(!(t===void 0||t.length===0))return t}function resolveDeploymentUrl(e){let t=e.headers,n=new URL(e.url),r=pickFirstForwardedValue(t.get(`x-forwarded-host`)),i=pickFirstForwardedValue(t.get(`x-forwarded-proto`)),a=r??t.get(`host`)??n.host;return`${i??n.protocol.replace(/:$/,``)}://${a}`}function buildHomePageResponse(r,i){let a=resolveDeploymentUrl(i),o=HOME_PAGE_HTML_TEMPLATE.replace(AGENT_NAME_PLACEHOLDER,()=>escapeHtml(r.agentName)).replace(DEPLOYMENT_URL_PLACEHOLDER,()=>escapeHtml(a));return new Response(o,{headers:{"cache-control":`no-store`,"content-type":`text/html; charset=utf-8`}})}function handleHomePageRequest(e,t){return buildHomePageResponse(e,t)}function handleStaticHomePageRequest(e){return buildHomePageResponse({agentName:`eve`},e.req)}export{buildHomePageResponse,handleStaticHomePageRequest as default,handleHomePageRequest};