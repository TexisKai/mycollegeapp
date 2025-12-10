'use client';

import { useState } from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileInterests from "@/components/profile/ProfileInterests";
import ProfileSkills from "@/components/profile/ProfileSkills";
import EditProfileModal from "@/components/profile/EditProfileModal";

export default function ProfilePage() {
  // temp mock data — replace with Supabase later
  const [profile, setProfile] = useState({
    name: "Your Name",
    bio: "Welcome to my profile!",
    college: "Miranda House",
    course: "B.A. Economics",
    year: 2,
    interests: ["Tech", "Music", "Dance"],
    skills: ["Programming", "Video Editing"],
  });

  const [editing, setEditing] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-20 pb-20 px-4">

      <ProfileHeader
        name={profile.name}
        avatar=""
        onEdit={() => setEditing(true)}
      />

      <ProfileInfo
        bio={profile.bio}
        college={profile.college}
        course={profile.course}
        year={profile.year}
      />

      <ProfileInterests interests={profile.interests} />
      <ProfileSkills skills={profile.skills} />

      {editing && (
        <EditProfileModal
          initialData={profile}
          onClose={() => setEditing(false)}
          onSave={(updated) => {
            setProfile(updated);
            setEditing(false);
          }}
        />
      )}
    </div>
  );
}
