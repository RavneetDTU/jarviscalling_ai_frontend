// src/components/agent-creation/PurposeSelection.tsx
import { PurposeOption } from '../types/agent';
import { SelectionOption } from './SelectionOption';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/BackButton';

interface PurposeSelectionProps {
  purposeOptions: PurposeOption[];
  purpose: string | null;
  showCustomPurpose: boolean;
  customPurpose: string;
  onSelectPurpose: (id: string) => void;
  onCustomPurposeChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const PurposeSelection = ({
  purposeOptions,
  purpose,
  showCustomPurpose,
  customPurpose,
  onSelectPurpose,
  onCustomPurposeChange,
  onContinue,
  onBack
}: PurposeSelectionProps) => (
  <div className="animate-fadeIn">
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        What will your agent help with?
      </h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Select the primary purpose for your personal assistant
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {purposeOptions.map((option) => (
        <SelectionOption
          key={option.id}
          id={option.id}
          title={option.title}
          icon={option.icon}
          isSelected={purpose === option.id}
          onClick={() => onSelectPurpose(option.id)}
        />
      ))}
    </div>

    {showCustomPurpose && (
      <div className="mt-6 animate-fadeIn">
        <div className="flex items-center mb-2">
          <div className="p-2 rounded-lg mr-3 bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-medium">Describe your purpose</h3>
        </div>
        <Input
          value={customPurpose}
          onChange={(e) => onCustomPurposeChange(e.target.value)}
          placeholder="Enter your custom purpose"
        />
        <Button
          onClick={onContinue}
          disabled={!customPurpose.trim()}
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