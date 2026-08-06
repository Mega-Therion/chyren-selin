# Vercel Speed Insights Integration Guide

This document describes how Vercel Speed Insights has been integrated into the SELIN project.

## Installation

The `@vercel/speed-insights` package has been installed as a project dependency:

```bash
npm install @vercel/speed-insights
```

## Integration Options

Since SELIN is primarily a Rust CLI application with optional HTTP server capabilities, Speed Insights can be integrated in different ways depending on your use case:

### Option 1: HTML/Vanilla JavaScript (Recommended for Static Pages)

For static HTML pages or basic web interfaces, use the vanilla JavaScript integration:

```html
<!DOCTYPE html>
<html>
<head>
    <title>SELIN Interface</title>
</head>
<body>
    <!-- Your content here -->
    
    <!-- Vercel Speed Insights -->
    <script>
        window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/speed-insights/script.js"></script>
</body>
</html>
```

**See `examples/speed-insights.html` for a complete working example.**

### Option 2: Node.js/Express Integration

If you build a Node.js/Express web server for SELIN, you can use:

```javascript
import { track } from '@vercel/speed-insights';

// Track custom events
track('custom-event', {
  metadata: { example: 'value' }
});
```

### Option 3: React Integration (Future)

If you build a React frontend:

```typescript
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div>
      {/* Your components */}
      <SpeedInsights />
    </div>
  );
}
```

### Option 4: Next.js Integration (Future)

If you build a Next.js frontend:

```typescript
// app/layout.tsx (Next.js 13+ App Router)
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## Vercel Dashboard Setup

1. Log in to your Vercel dashboard
2. Navigate to your SELIN project
3. Select **Speed Insights** from the sidebar
4. Click **Enable** to activate Speed Insights for your project
5. Deploy your application with `vercel deploy`

After deployment and user visits, Speed Insights will collect and display:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)
- Interaction to Next Paint (INP)

## Current Implementation

The package is installed and ready to use. A demonstration HTML file is available at:
- `examples/speed-insights.html` - Shows Speed Insights integration in a static HTML page

## Usage in SELIN HTTP Server

If you're developing a web interface for the SELIN HTTP server (launched with `selin serve --port 8080`), you can serve the example HTML file or integrate Speed Insights into your custom web interface using one of the methods above.

## Environment Variables

Speed Insights works automatically when deployed to Vercel. For self-hosted deployments, the script route `/_vercel/speed-insights/script.js` must be properly configured in your deployment environment.

## Documentation

For the latest Speed Insights documentation, visit:
- [Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart)
- [Speed Insights API Reference](https://vercel.com/docs/speed-insights)

## Notes

- Speed Insights is designed for web applications and requires a web interface to function
- The core SELIN CLI functionality is unaffected by this integration
- Metrics are only collected when the web interface is accessed via HTTP/HTTPS
- All performance data is sent to Vercel's analytics platform (if enabled in your Vercel dashboard)
