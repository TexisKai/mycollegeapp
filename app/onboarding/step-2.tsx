'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface StepProps {
  data: any;
  updateData: (updates: any) => void;
}

export default function Step2({ data, updateData }: StepProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadFile = async (file: File) => {
    setError(null);
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
      updateData({ du_id_url: json.url });
      setFileName(file.name);
    } else {
      setError(json.error || 'Upload failed');
    }
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) uploadFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) uploadFile(f);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Identity verification 🪪</h2>

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition"
      >
        <p className="text-sm text-gray-600 mb-2">Drag & drop your College ID here, or click to browse</p>
        <p className="text-xs text-gray-400">Accepted: JPG, PNG, PDF · Max: 10MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={onFile}
        className="hidden"
      />

      {fileName && (
        <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
          <p className="text-sm font-medium text-green-700">{fileName}</p>
          <p className="text-xs text-gray-500">Uploaded</p>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      <p className="mt-4 text-xs text-gray-500 text-center">We keep your ID private. Only visible to the verification team.</p>
    </div>
  );
}
