'use client';

import SocietyHeader from "@/components/societies/SocietyHeader";
import SocietyAbout from "@/components/societies/SocietyAbout";

export default function SocietyProfilePage() {
  const mock = {
    name: "Enactus",
    logo: "",
    category: "Social Entrepreneurship",
    about: "Student-led organization building sustainable social impact projects.",
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 pb-20 px-4">
      <SocietyHeader {...mock} />
      <SocietyAbout about={mock.about} />
    </div>
  );
}
