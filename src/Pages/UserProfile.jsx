import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNotification } from "../context/NotificationContext";

const UserProfile = () => {
  const { theme, setTheme, updateProfile, user } = useContext(AppContext);

  let showToast = () => {};
  try {
    const notify = useNotification();
    showToast = notify?.showToast || (() => {});
  } catch {}

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ LOAD PROFILE (fallback from user also)
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));

    if (savedProfile) {
      setName(savedProfile.name || "");
      setEmail(savedProfile.email || "");
      setProfileImage(savedProfile.image || "");
    } else if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // 📸 IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Upload valid image ❌", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast("Max size 2MB ❌", "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => setProfileImage("");

  // 💾 SAVE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("Name required ❌", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Invalid email ❌", "error");
      return;
    }

    setLoading(true);

    const data = { name, email, image: profileImage };
    localStorage.setItem("profile", JSON.stringify(data));

    updateProfile({
      name,
      email,
      profilePic: profileImage
    });

    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      showToast("Profile updated ✅", "success");
    }, 800);
  };

  const handleCancel = () => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    setName(savedProfile?.name || "");
    setEmail(savedProfile?.email || "");
    setProfileImage(savedProfile?.image || "");
    setIsEditing(false);
  };

  const completion =
    (name ? 33 : 0) + (email ? 33 : 0) + (profileImage ? 34 : 0);

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white text-black dark:bg-slate-800 dark:text-white">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User Profile</h2>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 text-sm"
            >
              Edit
            </button>
          )}
        </div>

        {/* PROGRESS */}
        <div className="mb-4">
          <div className="h-2 bg-gray-300 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="text-xs mt-1 text-gray-500">
            Profile completion: {completion}%
          </p>
        </div>

        {/* IMAGE */}
        <div className="flex flex-col items-center mb-4 relative group">
          <img
            src={
              profileImage ||
              "https://via.placeholder.com/100?text=No+Image"
            }
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />

          {isEditing && (
            <>
              <label className="absolute bottom-0 bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer opacity-0 group-hover:opacity-100">
                Change
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {profileImage && (
                <button
                  onClick={removeImage}
                  className="text-xs text-red-500 mt-2"
                >
                  Remove
                </button>
              )}
            </>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="text"
            disabled={!isEditing}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md"
            placeholder="Name"
          />

          <input
            type="email"
            disabled={!isEditing}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md"
            placeholder="Email"
          />

          {/* THEME */}
          <div>
            <p className="text-sm mb-1">Theme</p>
            <div className="flex bg-gray-200 rounded-full p-1">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex-1 py-1 rounded ${
                  theme === "light" ? "bg-white" : ""
                }`}
              >
                Light
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex-1 py-1 rounded ${
                  theme === "dark" ? "bg-black text-white" : ""
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 mt-3">
              <button className="flex-1 bg-green-600 text-white py-2 rounded">
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-400 text-white py-2 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;