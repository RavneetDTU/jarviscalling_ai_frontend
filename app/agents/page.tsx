// app/agents/page.tsx
"use client";
import React from "react";
import AgentsTable from "@/components/Agents/AgentTable";
import { useRouter } from "next/navigation";
import { AgentDashboardHeader } from "@/components/Header";
import { AgentDashboardSidebar } from "@/components/Sidebar";
const AgentsPage = () => {
  const router = useRouter();

  const handleNavigation = () => {
    // Navigate to the new agent creation page
    router.push("/agents/create-agent");
  };

  return (
    <div className="min-h-screen h-full bg-gray-20">
      <AgentDashboardHeader/>

      <div className="flex flex-1 min-h-screen">
        <AgentDashboardSidebar />
        <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Agents</h1>
              <p className="text-gray-600">Create and manage your AI agents</p>
            </header>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search agents..."
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <svg
                      className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <AgentsTable />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Playground
              </h2>
              <button
                onClick={handleNavigation}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>New agent</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
