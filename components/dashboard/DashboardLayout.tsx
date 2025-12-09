'use client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 flex justify-center px-4 md:px-8 lg:px-12">

      {/* Center feed container */}
      <div className="w-full max-w-2xl mt-20">
        {children}
      </div>

    </main>
  );
}
