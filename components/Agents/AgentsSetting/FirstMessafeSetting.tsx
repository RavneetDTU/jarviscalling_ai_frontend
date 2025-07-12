// src/components/agent-settings/FirstMessageSettings.tsx
import { Section } from '@/components/ui/section';
import { AddVariableButton } from './AddVariableButton';

interface FirstMessageSettingsProps {
  firstMessage: string;
  onFirstMessageChange: (message: string) => void;
}

export const FirstMessageSettings = ({ 
  firstMessage, 
  onFirstMessageChange 
}: FirstMessageSettingsProps) => {
  const handleAddVariable = (variable: string) => {
    onFirstMessageChange(firstMessage + variable);
  };

  return (
    <Section
      title="First message"
      description="The first message the agent will say. If empty, the agent will wait for the user to start the conversation."
      className="bg-white rounded-xl p-4 border border-gray-200 "

    >
      <div className="relative">
        <textarea
          value={firstMessage}
          onChange={(e) => onFirstMessageChange(e.target.value)}
          placeholder="Enter your first message"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
        />
        <div className="absolute bottom-3 right-3">
          <AddVariableButton onAddVariable={handleAddVariable} />
        </div>
      </div>
    </Section>
  );
};