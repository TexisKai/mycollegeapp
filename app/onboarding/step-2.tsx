'use client';

import React, { useState, useRef } from 'react';
import { uploadFile } from '@/lib/storage';

interface StepProps {
  data: any;
  updateData: (updates: any) => void;
}

export default function Step2({ data, updateData }: StepProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file: File) => {
    try {
      setError(null);
      setUploading(true);

      const url = await uploadFile(file); // NEW FIXED HELPER
      setFileName(file.name);
      updateData({ du_id_url: url });
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Identity verification 🪪</h2>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition"
      >
        <p className="text-sm text-gray-600">
          Drag & drop your College ID here, or click to browse
        </p>
        <p className="text-xs text-gray-400">Accepted: JPG, PNG, PDF · Max: 10MB</p>

        {uploading && (
          <p className="text-indigo-600 mt-3 text-sm">Uploading...</p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={onInputChange}
        className="hidden"
      />

      {fileName && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-sm font-medium">{fileName}</p>
          <p className="text-gray-500 text-xs">Uploaded successfully</p>
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        We keep your ID private. Visible only to the verification team.
      </p>
    </div>
  );
}
