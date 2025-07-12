// src/components/agent-settings/AgentHeader.tsx
import { Tag } from "@/components/ui/tag";

interface AgentHeaderProps {
  name: string;
  isPublic: boolean;
  agentId: string;
}

export const AgentHeader = ({ name, isPublic, agentId }: AgentHeaderProps) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-200">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{name}</h1>
      <div className="flex items-center space-x-3">
        <Tag variant={isPublic ? 'success' : 'secondary'}>
          {isPublic ? 'Public' : 'Private'}
        </Tag>
        <span className="text-sm text-gray-500 font-mono">{agentId}</span>
      </div>
    </div>
    <button className="mt-4 md:mt-0 px-4 py-2 bg-black hover:bg-gray-600 rounded-lg text-white font-medium transition-colors">
      Test Ai Agent
    </button>
  </div>
);