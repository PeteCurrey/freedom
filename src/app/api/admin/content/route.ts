import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      global: {
        fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' })
      }
    }
  );
}

function getAnonClient(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || '';
  // Use anon client to verify the session token sent by the browser
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { 
      global: { 
        headers: { Cookie: cookieHeader },
        fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' })
      } 
    }
  );
}

async function getSession(request: NextRequest) {
  const supabase = getAnonClient(request);
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// -------------------------------------------------------
// POST — Upsert content fields for a page/section
// Body: { pageKey, sectionKey, fields: [{fieldKey, fieldType, value}] }
// -------------------------------------------------------
export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: {
    pageKey: string;
    sectionKey: string;
    fields: { fieldKey: string; fieldType: string; value: string }[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { pageKey, sectionKey, fields } = body;
  if (!pageKey || !sectionKey || !Array.isArray(fields)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const rows = fields.map(f => ({
    page_key: pageKey,
    section_key: sectionKey,
    field_key: f.fieldKey,
    field_type: f.fieldType,
    value: f.value,
    updated_at: new Date().toISOString(),
    updated_by: session.user.email ?? 'unknown',
  }));

  const supabase = getAdminClient();
  const { error } = await supabase
    .from('page_content')
    .upsert(rows, { onConflict: 'page_key,section_key,field_key' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// -------------------------------------------------------
// DELETE — Reset a section to defaults (removes DB rows)
// Body: { pageKey, sectionKey }
// -------------------------------------------------------
export async function DELETE(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { pageKey: string; sectionKey: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { pageKey, sectionKey } = body;
  if (!pageKey || !sectionKey) {
    return NextResponse.json({ error: 'Missing pageKey or sectionKey' }, { status: 400 });
  }

  const supabase = getAdminClient();
  const { error } = await supabase
    .from('page_content')
    .delete()
    .eq('page_key', pageKey)
    .eq('section_key', sectionKey);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
