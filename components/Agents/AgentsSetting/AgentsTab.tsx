// src/components/Agents/AgentsSetting/AgentsTab.tsx
import React from "react";
import { Section } from "@/components/ui/section";
import { ChevronDown } from "lucide-react";
import { AddVariableButton } from "./AddVariableButton";

interface AgentsTabProps {
  defaultLanguage: string;
  firstMessage: string;
  onFirstMessageChange: (message: string) => void;
  systemPrompt: string;
  onSystemPromptChange: (prompt: string) => void;
}

const AgentsTab: React.FC<AgentsTabProps> = ({
  defaultLanguage,
  firstMessage,
  onFirstMessageChange,
  systemPrompt,
  onSystemPromptChange
}) => {
  const handleAddVariable = (variable: string, target: "firstMessage" | "systemPrompt") => {
    const insertText = `{{${variable}}}`;
    if (target === "firstMessage") {
      onFirstMessageChange(firstMessage + insertText);
    } else {
      onSystemPromptChange(systemPrompt + insertText);
    }
  };

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "zh", label: "Chinese" },
    { value: "ja", label: "Japanese" },
    // Add more languages as needed
  ];

  return (
    <div className="space-y-8">
      <Section
        title="Agent Language"
        description="Choose the default language the agent will communicate in."
        className="bg-white rounded-xl p-4 border border-gray-200"
      >
        <div className="relative">
          <select
            value={defaultLanguage}
            disabled
            className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none bg-gray-100 text-gray-500 cursor-not-allowed"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={16} />
          </div>
        </div>
      </Section>

      <Section
        title="First message"
        description="The first message the agent will say. If empty, the agent will wait for the user to start the conversation."
        className="bg-white rounded-xl p-4 border border-gray-200"
      >
        <div className="relative">
          <textarea
            value={firstMessage}
            onChange={(e) => onFirstMessageChange(e.target.value)}
            placeholder="Enter your first message"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
          />
          <div className="absolute bottom-3 right-3">
            <AddVariableButton 
              onAddVariable={(variable) => handleAddVariable(variable, "firstMessage")} 
            />
          </div>
        </div>
      </Section>

      <Section
        title="System prompt"
        description="The system prompt is used to determine the persona of the agent and the context of the conversation."
        className="bg-white rounded-xl p-4 border border-gray-200"
      >
        <div className="relative">
          <textarea
            value={systemPrompt}
            onChange={(e) => onSystemPromptChange(e.target.value)}
            placeholder="Enter your system prompt"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[180px]"
          />
          <div className="absolute bottom-3 right-3">
            <AddVariableButton 
              onAddVariable={(variable) => handleAddVariable(variable, "systemPrompt")} 
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AgentsTab;
