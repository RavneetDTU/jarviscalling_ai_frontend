"use client";
import AgentDashboard from "@/components/AgentDashboard";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FiBell, FiUser } from "react-icons/fi";
import { auth } from "@/lib/firebase";

function page() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.full_name || parsed.name || "User");
      } catch {
        setUserName(null);
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    router.push("/login");
  };

  const user = auth.currentUser;
  useEffect(() => {
    if (user) {
      setUserName(user.displayName || user.email || "User");
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full flex justify-between items-center px-4 py-3 md:px-6 md:py-4 border-b sticky top-0 z-10 bg-gradient-to-r from-indigo-50 to-blue-50 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-xl md:text-2xl font-semibold text-indigo-700">
            Agent Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-6 relative">
          <button className="p-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 transition">
            <FiBell className="h-5 w-5 text-indigo-700" />
          </button>

          {userName ? (
            <div ref={profileRef} className="relative">
              <button
                className="p-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 transition"
                onClick={() => setShowProfileMenu((prev) => !prev)}
              >
                <FiUser className="h-5 w-5 text-indigo-700" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 top-10 w-44 bg-white shadow-lg rounded-xl p-4 z-50 border border-gray-100">
                  <p className="text-sm text-gray-800 font-medium truncate mb-2">
                    {userName}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-sm py-1.5 px-3 rounded-md bg-red-100 hover:bg-red-200 text-red-700 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-white px-4 py-1.5 text-sm rounded-xl font-medium transition"
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      <AgentDashboard />
    </div>
  );
}
export default page;
