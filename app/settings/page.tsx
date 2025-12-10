'use client';

import { useState } from "react";
import SettingsSection from "@/components/settings/SettingsSection";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4 pb-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings ⚙️</h1>

      <SettingsSection title="Preferences">
        <div className="flex items-center justify-between py-2">
          <p className="text-gray-800">Dark Mode</p>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
      </SettingsSection>
    </div>
  );
}
