'use server';

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

export async function saveLogin(email: string) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('[saveLogin] Missing Supabase environment variables.');
    return { success: false, error: 'Missing credentials' };
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/logins`;

  console.log('[saveLogin] POSTing to:', endpoint);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[saveLogin] HTTP Error:', response.status, errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    console.log('[saveLogin] Success — email saved:', email);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[saveLogin] Network error:', message);
    return { success: false, error: message };
  }
}
