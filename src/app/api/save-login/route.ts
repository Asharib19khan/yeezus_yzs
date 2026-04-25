import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? '';

export async function POST(req: NextRequest) {
  console.log('[/api/save-login] Request received');
  console.log('[/api/save-login] SUPABASE_URL:', SUPABASE_URL || 'MISSING');
  console.log('[/api/save-login] KEY present:', !!SUPABASE_ANON_KEY);

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('[/api/save-login] Missing Supabase credentials!');
    return NextResponse.json({ success: false, error: 'Missing credentials' }, { status: 500 });
  }

  let email: string;
  try {
    const body = await req.json();
    email = body.email?.trim();
    if (!email) throw new Error('No email provided');
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/logins`;
  console.log('[/api/save-login] Posting to:', endpoint, '— email:', email);

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

    const text = await response.text();

    if (!response.ok) {
      console.error('[/api/save-login] Supabase error:', response.status, text);
      return NextResponse.json({ success: false, error: `Supabase ${response.status}: ${text}` }, { status: 502 });
    }

    console.log('[/api/save-login] ✅ Email saved successfully:', email);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/save-login] Network error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
