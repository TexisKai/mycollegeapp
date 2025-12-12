import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-browser';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get the current user's session
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    if (!user) {
      return NextResponse.json({ error: 'No user found' }, { status: 401 });
    }

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `${user.id}/${fileName}`;

    // Upload to the student-documents bucket
    const { error: uploadError } = await supabase.storage
      .from('student-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage
      .from('student-documents')
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
