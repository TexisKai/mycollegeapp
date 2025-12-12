'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface StoriesUploaderProps {
  onUploadSuccess: () => void;
  onClose: () => void;
}

export default function StoriesUploader({ onUploadSuccess, onClose }: StoriesUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
      setError('Please select an image or video file');
      return;
    }

    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/stories/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      onUploadSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Story</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {!file ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 mb-4">Select an image or video</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Choose File
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              {file.type.startsWith('image/') ? (
                <img
                  src={preview!}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
              ) : (
                <video
                  src={preview!}
                  className="w-full h-64 object-cover rounded-xl"
                  muted
                  controls
                />
              )}
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg"
                disabled={uploading}
              >
                Change
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Share Story'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}