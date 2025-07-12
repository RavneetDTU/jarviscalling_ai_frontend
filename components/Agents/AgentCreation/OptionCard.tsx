// src/components/agent-creation/OptionCard.tsx
import { AgentOption } from "../types/agent";

interface OptionCardProps {
  option: AgentOption;
  isSelected: boolean;
  onClick: () => void;
}

export const OptionCard = ({ option, isSelected, onClick }: OptionCardProps) => (
  <div
    className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
      isSelected 
        ? 'ring-4 ring-blue-400 scale-[1.02]' 
        : 'ring-1 ring-gray-200'
    }`}
    onClick={onClick}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-20`} />
    
    <div className="relative z-10 p-6 bg-white">
      <div className="flex justify-center mb-4">
        <div className={`p-3 rounded-full bg-gradient-to-br ${option.color} text-white`}>
          {option.icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
        {option.title}
      </h3>
      
      <p className="text-gray-600 text-center text-sm h-12">
        {option.description}
      </p>
      
      <div className="mt-6 flex justify-center">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected 
            ? 'border-blue-500 bg-blue-500' 
            : 'border-gray-300'
        }`}>
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  </div>
);