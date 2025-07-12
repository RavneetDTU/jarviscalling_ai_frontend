import { AgentDashboardHeader } from "@/components/Header";
import { AgentDashboardSidebar } from "@/components/Sidebar";
import React from "react";
function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <AgentDashboardHeader />

      <div className="flex flex-1">
        <AgentDashboardSidebar />
        {/* Main content area */}
        <div className="container">
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-indigo-600 mb-4">
              Billing Page
            </h1>
            <p className="text-gray-700 mb-2">
              This page is currently under development.
            </p>
            <p className="text-gray-500">
              Please check back later for updates.
            </p>
          </div>
        </div>
      </div>
      {/* Footer can be added here if needed */}
    </div>
  );
}
export default page;
