/**
 * Base44 Sovereign Archon Bridge
 * Connects local SELIN & AEON engines to https://chyren-archon-core.base44.app
 */

export const BASE44_ARCHON_CONFIG = {
  appId: '6a6eafc57676b03ba2194271',
  serverUrl: 'https://chyren-archon-core.base44.app',
  functionsVersion: 'prod',
};

export async function pingArchonCore() {
  try {
    const res = await fetch(`${BASE44_ARCHON_CONFIG.serverUrl}/manifest.json`);
    if (res.ok) {
      const manifest = await res.json();
      return { status: 'online', appName: manifest.name || 'Chyren Archon' };
    }
    return { status: 'error', code: res.status };
  } catch (err) {
    return { status: 'unreachable', error: err.message };
  }
}

// Test execution
if (process.argv[1] && process.argv[1].endsWith('base44-bridge.mjs')) {
  console.log('🔗 Testing connection to Base44 Archon Core (https://chyren-archon-core.base44.app)...');
  pingArchonCore().then((res) => {
    console.log('Result:', JSON.stringify(res, null, 2));
  });
}
