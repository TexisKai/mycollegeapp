import { supabase } from './supabase';

export async function uploadFile(file: File) {
  // 1. Get current session to extract user ID
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Error('Not authenticated');
  }

  const user = session.user;

  // 2. Create file name and folder path REQUIRED by RLS
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}.${ext}`;

  // REQUIRED → matches your RLS policy
  const filePath = `${user.id}/${fileName}`;

  // 3. Upload to the ONLY correct bucket: student-documents
  const { error: uploadError } = await supabase.storage
    .from('student-documents')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) throw uploadError;

  // 4. Get public URL
  const {
    data: { publicUrl }
  } = supabase.storage
    .from('student-documents')
    .getPublicUrl(filePath);

  return publicUrl;
}
