'use client';

import { X } from "lucide-react";
import { useState, useRef } from "react";

export default function EditProfileModal({
  initialData,
  onClose,
  onSave,
}: {
  initialData: any;
  onClose: () => void;
  onSave: (updated: any) => void;
}) {
  const [form, setForm] = useState(initialData);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const INTERESTS = ["Tech", "Music", "Dance", "Sports", "Drama", "Reading"];
  const SKILLS = ["Video Editing", "Programming", "Design", "Public Speaking"];

  const toggleArrayValue = (key: string, value: string) => {
    const current = form[key] || [];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];

    setForm({ ...form, [key]: updated });
  };

  return (
    <div className="
      fixed inset-0 bg-black/40 backdrop-blur-sm 
      flex items-center justify-center z-50
    ">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Edit Profile
        </h2>

        {/* Avatar Upload */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={form.avatar || "/default-avatar.png"}
            className="w-20 h-20 rounded-full object-cover border"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Change Picture
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded-xl mt-1 bg-gray-50"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full p-3 border rounded-xl mt-1 bg-gray-50"
          />
        </div>

        {/* College */}
        <div className="mb-4">
          <label className="text-sm font-medium">College</label>
          <input
            type="text"
            value={form.college}
            onChange={(e) => setForm({ ...form, college: e.target.value })}
            className="w-full p-3 border rounded-xl mt-1 bg-gray-50"
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="text-sm font-medium">Course</label>
          <input
            type="text"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            className="w-full p-3 border rounded-xl mt-1 bg-gray-50"
          />
        </div>

        {/* Year */}
        <div className="mb-4">
          <label className="text-sm font-medium">Year</label>
          <select
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            className="w-full p-3 border rounded-xl mt-1 bg-gray-50"
          >
            {[1, 2, 3, 4].map((y) => (
              <option key={y} value={y}>{y} Year</option>
            ))}
          </select>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <label className="text-sm font-medium">Interests</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {INTERESTS.map((int) => (
              <button
                key={int}
                onClick={() => toggleArrayValue("interests", int)}
                className={`
                  px-4 py-2 rounded-xl text-sm 
                  ${form.interests.includes(int)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"}
                `}
              >
                {int}
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="text-sm font-medium">Skills</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleArrayValue("skills", skill)}
                className={`
                  px-4 py-2 rounded-xl text-sm 
                  ${form.skills.includes(skill)
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-800"}
                `}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-xl border"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => onSave(form)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
