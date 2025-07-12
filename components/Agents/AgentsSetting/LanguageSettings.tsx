// src/components/agent-settings/LanguageSettings.tsx
import { Section } from "@/components/ui/section";
import { ChevronDown } from 'lucide-react';

interface LanguageSettingsProps {
  defaultLanguage: string;
  onLanguageChange: (language: string) => void;
}

export const LanguageSettings = ({ defaultLanguage, onLanguageChange }: LanguageSettingsProps) => {
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
  ];

  return (
    <Section
      title="Agent Language"
      description="Choose the default language the agent will communicate in."
      className="bg-white rounded-xl p-4 border border-gray-200"
    >
      <div className="relative">
        <select
          value={defaultLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
  );
};