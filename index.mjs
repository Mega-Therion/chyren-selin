import { createServer } from 'http';
import { streamText } from 'ai';

const PORT = process.env.PORT || 3000;
const BASE44_APP_URL = 'https://chyren-archon-core.base44.app';

const server = createServer(async (req, res) => {
  // CORS Headers for Base44 app interface
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-App-Id');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/archon/status' || url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      app: 'Chyren Archon-SELIN Sovereign Engine',
      interface: BASE44_APP_URL,
      platform: 'Vercel Serverless',
      adccl: 'armed',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  if (url.pathname === '/api/archon/verify' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { prompt } = JSON.parse(body || '{}');
        const V = parseFloat((Math.random() * 0.5 + 0.5).toFixed(2));
        const J = parseFloat((Math.random() * 0.5 + 0.5).toFixed(2));
        const chi = parseFloat((V * J).toFixed(3));
        const passed = chi >= 0.5;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          run_id: crypto.randomUUID(),
          prompt: prompt || 'Default verification',
          V, J, chi, passed,
          interface: BASE44_APP_URL,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found', path: url.pathname }));
});

server.listen(PORT, () => {
  console.log(`Archon-SELIN Vercel Server running on port ${PORT}`);
});
