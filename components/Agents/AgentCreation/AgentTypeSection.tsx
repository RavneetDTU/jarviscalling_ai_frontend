// src/components/agent-creation/AgentTypeSelection.tsx
import { AgentOption, AgentType } from '../types/agent';
import { OptionCard } from './OptionCard';

interface AgentTypeSelectionProps {
  agentOptions: AgentOption[];
  selectedAgent: AgentType | null;
  onSelectAgent: (id: AgentType) => void;
}

export const AgentTypeSelection = ({ 
  agentOptions, 
  selectedAgent, 
  onSelectAgent 
}: AgentTypeSelectionProps) => (
  <div className="animate-fadeIn">
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        What type of agent would you like to create?
      </h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Select the type that best fits your needs. You can customize it later.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {agentOptions.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          isSelected={selectedAgent === option.id}
          onClick={() => onSelectAgent(option.id)}
        />
      ))}
    </div>
  </div>
);