import React from "react";

interface AdvancedTabProps {
  agentId: string;
}
function AdvancedTab({ agentId }: AdvancedTabProps) {
  return (
    <div>
      <h2>Advanced Settings {agentId}</h2>
      <p>Currently in Development.</p>

    </div>
  );
}
export default AdvancedTab;
