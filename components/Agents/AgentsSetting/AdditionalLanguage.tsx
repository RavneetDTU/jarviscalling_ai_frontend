// src/components/agent-settings/AdditionalLanguages.tsx
"use client";
import { Section } from "@/components/ui/section";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AdditionalLanguagesProps {
  languages: string[];
  onLanguagesChange: (languages: string[]) => void;
}

export const AdditionalLanguages = ({ languages, onLanguagesChange }: AdditionalLanguagesProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');

  const availableLanguages = [
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'ar', label: 'Arabic' },
  ];

  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      onLanguagesChange([...languages, newLanguage]);
    }
    setNewLanguage('');
    setIsAdding(false);
  };

  const removeLanguage = (language: string) => {
    onLanguagesChange(languages.filter(lang => lang !== language));
  };

  return (
    <Section
      title="Additional Languages"
      description="Specify additional languages which callers can choose from."
      className="bg-white rounded-xl p-4 border border-gray-200 "
      
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {languages.map(lang => {
            const languageInfo = availableLanguages.find(l => l.value === lang);
            return (
              <div 
                key={lang} 
                className="flex items-center bg-blue-50 rounded-full pl-3 pr-2 py-1 border border-blue-100"
              >
                <span className="text-sm text-blue-800">{languageInfo?.label || lang}</span>
                <button 
                  onClick={() => removeLanguage(lang)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
        
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <select
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a language</option>
                  {availableLanguages
                    .filter(lang => !languages.includes(lang.value))
                    .map(lang => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={addLanguage}
                  disabled={!newLanguage}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    newLanguage 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add Language
                </button>
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
    </Section>
  );
};