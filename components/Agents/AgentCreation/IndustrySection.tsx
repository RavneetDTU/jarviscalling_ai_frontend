// src/components/agent-creation/IndustrySelection.tsx
import { BackButton } from '@/components/ui/BackButton';
import { IndustryOption } from '../types/agent';
import { SelectionOption } from './SelectionOption';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface IndustrySelectionProps {
  industryOptions: IndustryOption[];
  industry: string | null;
  showCustomIndustry: boolean;
  customIndustry: string;
  onSelectIndustry: (id: string) => void;
  onCustomIndustryChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const IndustrySelection = ({
  industryOptions,
  industry,
  showCustomIndustry,
  customIndustry,
  onSelectIndustry,
  onCustomIndustryChange,
  onContinue,
  onBack
}: IndustrySelectionProps) => (
  <div className="animate-fadeIn">
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        What industry is your business in?
      </h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Select the industry that best describes your business
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {industryOptions.map((option) => (
        <SelectionOption
          key={option.id}
          id={option.id}
          title={option.title}
          isSelected={industry === option.id}
          onClick={() => onSelectIndustry(option.id)}
        />
      ))}
    </div>

    {showCustomIndustry && (
      <div className="mt-6 animate-fadeIn">
        <div className="flex items-center mb-2">
          <div className="p-2 rounded-lg mr-3 bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-medium">Describe your industry</h3>
        </div>
        <Input
          value={customIndustry}
          onChange={(e) => onCustomIndustryChange(e.target.value)}
          placeholder="Enter your custom industry"
        />
        <Button
          onClick={onContinue}
          disabled={!customIndustry.trim()}
          className="mt-3 w-full"
        >
          Continue
        </Button>
      </div>
    )}

    <div className="mt-12 flex justify-between">
      <BackButton onClick={onBack} />
    </div>
  </div>
);