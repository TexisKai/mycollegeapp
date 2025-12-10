'use client';

import { useState } from "react";
import SearchBar from "@/components/explore/SearchBar";
import ExploreGrid from "@/components/explore/ExploreGrid";

export default function ExplorePage() {
  const [query, setQuery] = useState("");

  const mockItems = [
    { name: "Enactus" },
    { name: "Dramatics" },
    { name: "Tech Club" },
    { name: "Music Society" },
    { name: "Dance Club" },
    { name: "Photography" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4 pb-20">
      <SearchBar value={query} onChange={setQuery} />
      <ExploreGrid items={mockItems} />
    </div>
  );
}
