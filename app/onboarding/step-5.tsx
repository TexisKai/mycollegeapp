'use client';

import React, { useRef, useState } from 'react';
import { uploadFile } from '@/lib/storage';

interface StepProps {
  data: any;
  updateData: (updates: any) => void;
}

export default function Step5({ data, updateData }: StepProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>(data.profile_picture_url || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    try {
      setError(null);
      setUploading(true);

      const url = await uploadFile(file); // NEW FIXED HELPER
      updateData({ profile_picture_url: url });
      setPreview(url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Upload Profile Picture 📸</h2>

      <div
        onClick={() => inputRef.current?.click()}
        className="w-32 h-32 mx-auto rounded-full bg-gray-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition flex items-center justify-center"
      >
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" alt="Profile Preview" />
        ) : (
          <span className="text-gray-600 text-sm">
            {uploading ? 'Uploading...' : 'Tap to upload ✨'}
          </span>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={onSelect}
      />

      {error && (
        <p className="text-red-600 text-sm text-center mt-3">{error}</p>
      )}

      <p className="text-xs text-gray-500 text-center mt-3">
        You can change this anytime from your profile settings.
      </p>
    </div>
  );
}
