'use client';

export default function SkeletonPost() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4 mb-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="w-32 h-3 bg-gray-200 rounded" />
          <div className="w-20 h-2 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Text lines */}
      <div className="space-y-2 mb-4">
        <div className="w-full h-3 bg-gray-200 rounded" />
        <div className="w-full h-3 bg-gray-200 rounded" />
        <div className="w-3/4 h-3 bg-gray-200 rounded" />
      </div>

      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4" />

      {/* Actions placeholder */}
      <div className="flex items-center gap-6 pt-2 border-t">
        <div className="w-14 h-6 bg-gray-200 rounded" />
        <div className="w-20 h-6 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
