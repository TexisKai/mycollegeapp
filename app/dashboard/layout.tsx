'use client';

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import RightSidebar from "@/components/dashboard/RightSidebar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Top Navigation */}
      <Header />

      <div className="flex w-full">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Main 3-Column Layout */}
        <DashboardLayout>

          {/* FEED (page.tsx content) */}
          {children}

        </DashboardLayout>

        {/* Right Sidebar */}
        <RightSidebar />

      </div>
    </div>
  );
}
