// src/components/agent-settings/SystemPromptSettings.tsx
import { Section } from "@/components/ui/section";
import { AddVariableButton } from './AddVariableButton';

interface SystemPromptSettingsProps {
  systemPrompt: string;
  onSystemPromptChange: (prompt: string) => void;
}

export const SystemPromptSettings = ({ 
  systemPrompt, 
  onSystemPromptChange 
}: SystemPromptSettingsProps) => {
  const handleAddVariable = (variable: string) => {
    onSystemPromptChange(systemPrompt + variable);
  };

  return (
    <Section
      title="System prompt"
      description="The system prompt is used to determine the persona of the agent and the context of the conversation."
      className="bg-white rounded-xl p-4 border border-gray-200 "

    >
      <div className="relative">
        <textarea
          value={systemPrompt}
          onChange={(e) => onSystemPromptChange(e.target.value)}
          placeholder="Enter your system prompt"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[180px]"
        />
        <div className="absolute bottom-3 right-3">
          <AddVariableButton onAddVariable={handleAddVariable} />
        </div>
      </div>
    </Section>
  );
};