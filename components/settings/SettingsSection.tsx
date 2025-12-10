'use client';

export default function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}
