"use client";

import { useState } from "react";

import MyProfileClient from "@/components/MyProfileClient";
import MyBookingsClient from "@/components/MyBookingsClient";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 font-sans text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
        Dashboard
      </h1>
      <div className=" flex justify-center items-center">
        <div className="flex gap-2 mb-8">
          {[
            { key: "bookings", label: "My Bookings" },
            { key: "profile", label: "My Profile" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeTab === tab.key
                  ? "bg-white text-slate-900 border-slate-300 shadow-sm"
                  : "bg-transparent text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {activeTab === "bookings" ? <MyBookingsClient /> : <MyProfileClient />}
    </div>
  );
}
