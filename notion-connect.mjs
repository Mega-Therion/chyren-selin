import { getToken } from '@vercel/connect';

export async function getNotionUserToken(userId) {
  try {
    const token = await getToken('oauth/notion', {
      subject: { type: 'user', id: userId },
    });
    return token;
  } catch (error) {
    console.error('Vercel Connect token exchange error:', error);
    throw error;
  }
}

// Example usage execution
if (process.argv[1] && process.argv[1].endsWith('notion-connect.mjs')) {
  console.log('Testing Vercel Connect getToken("oauth/notion")...');
  try {
    const token = await getNotionUserToken('demo-user-123');
    console.log('Successfully retrieved token:', token ? `${token.substring(0, 8)}...` : 'empty');
  } catch (err) {
    console.log('Vercel Connect Notion connection test result:', err.message);
  }
}
