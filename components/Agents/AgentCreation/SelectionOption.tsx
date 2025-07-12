// src/components/agent-creation/SelectionOption.tsx
import { ReactNode } from 'react';

interface SelectionOptionProps {
  id: string;
  title: string;
  icon?: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export const SelectionOption = ({ 
  id, 
  title, 
  icon, 
  isSelected, 
  onClick,
  className = ''
}: SelectionOptionProps) => (
  <div
    key={id}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center ${
      isSelected 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
    } ${className}`}
    onClick={onClick}
  >
    {icon && (
      <div className={`p-2 rounded-lg mr-3 ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>
    )}
    <span className="font-medium">{title}</span>
  </div>
);