import { supabase } from './supabase';

export async function uploadFile(file: File, bucket: string, path: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);
  
  return publicUrl;
}
