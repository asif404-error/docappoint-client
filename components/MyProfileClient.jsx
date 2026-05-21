"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";

export default function MyProfileClient() {
  const { data: session } = authClient.useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  console.log(session);
  const handleUpdateClick = () => {
    setFormData({
      name: session?.user?.name || "",
      image: session?.user?.image || "",
    });
    setModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.updateUser({
        name: formData.name,
        image: formData.image,
      });
      toast.success("Profile updated successfully!");
      setModalOpen(false);
    } catch (error) {
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-10">
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              My Profile
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              View and manage your profile information.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-md p-8 max-w-lg ">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-400 mb-4">
                <Image
                  src={
                    session?.user?.image ||
                    "https://i.ibb.co/6bH9MkL/default-avatar.png"
                  }
                  alt={session?.user?.name || "User"}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {session?.user?.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {session?.user?.email}
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-500">
                  Full Name
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {session?.user?.name}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-500">
                  Email Address
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {session?.user?.email}
                </span>
              </div>
            </div>
            <button
              onClick={handleUpdateClick}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 text-sm"
            >
              <FiEdit size={16} />
              Update Profile
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <h2
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Update Profile
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-all duration-300 disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
