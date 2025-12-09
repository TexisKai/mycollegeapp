'use client';
import React, { useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface StepProps {
  data: any;
  updateData: (updates: any) => void;
}

export default function Step5({ data, updateData }: StepProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>(data.profile_picture_url || '');

  const uploadPic = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);

    const {
      data: { session }
    } = await supabase.auth.getSession();

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: fd,
    });

    const json = await res.json();
    if (json.url) {
      updateData({ profile_picture_url: json.url });
      setPreview(json.url);
    }
  };

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) uploadPic(f);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upload Profile Picture 📸</h2>

      <div
        onClick={() => inputRef.current?.click()}
        className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-400 transition"
      >
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center h-full justify-center text-gray-500 text-sm">
            Tap to upload ✨
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onSelect}
        className="hidden"
      />

      <p className="text-center text-sm text-gray-600">
        You can always change this later.
      </p>
    </div>
  );
}
