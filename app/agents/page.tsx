import CreateAgent from "@/components/Agents/CreateAgent";
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
          <CreateAgent />
        </div>
      </div>
      {/* Footer can be added here if needed */}
    </div>
  );
}
export default page;
