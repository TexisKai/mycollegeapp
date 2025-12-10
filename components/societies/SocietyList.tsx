'use client';

import { useState } from "react";
import SocietyCard from "./SocietyCard";

export default function SocietyList() {
  const [search, setSearch] = useState("");

  const sampleSocieties = [
    {
      name: "Enactus",
      category: "Social Entrepreneurship",
      description: "A global community of student entrepreneurs driving positive social impact through sustainable projects.",
      logo: "/default-avatar.png",
    },
    {
      name: "Dramatics Club",
      category: "Cultural",
      description: "Performing arts society specializing in drama, theatre, and stage performances.",
      logo: "/default-avatar.png",
    },
    {
      name: "NSS (National Service Scheme)",
      category: "Community",
      description: "Student-led volunteer group focusing on social welfare and community service.",
      logo: "/default-avatar.png",
    },
    {
      name: "Tech Society",
      category: "Technical",
      description: "A community of students passionate about coding, AI, hackathons, and emerging technologies.",
      logo: "/default-avatar.png",
    },
  ];

  const filtered = sampleSocieties.filter((soc) =>
    soc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4 pb-20">

      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Societies & Clubs 🎭
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search societies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full p-3 rounded-xl border bg-gray-50 
          focus:bg-white focus:ring-2 ring-indigo-300 outline-none mb-6
        "
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filtered.map((soc, i) => (
          <SocietyCard
            key={i}
            name={soc.name}
            category={soc.category}
            description={soc.description}
            logo={soc.logo}
          />
        ))}
      </div>
    </div>
  );
}
