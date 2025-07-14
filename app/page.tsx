import AgentDashboard from "@/components/AgentDashboard";
import { AgentDashboardHeader } from "@/components/Header";
import { AgentDashboardSidebar } from "@/components/Sidebar";
import React from "react";
function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <AgentDashboardHeader />

      <AgentDashboard />
    </div>
  );
}
export default page;
