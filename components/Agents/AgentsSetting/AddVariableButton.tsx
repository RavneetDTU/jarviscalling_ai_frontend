// src/components/agent-settings/AddVariableButton.tsx
"use client";

import { useState } from 'react';

interface AddVariableButtonProps {
  onAddVariable: (variable: string) => void;
}

export const AddVariableButton = ({ onAddVariable }: AddVariableButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [variableName, setVariableName] = useState('');

  const variables = [
    { name: 'user_name', description: "User's name" },
    { name: 'date', description: "Current date" },
    { name: 'time', description: "Current time" },
    { name: 'company', description: "Company name" },
  ];

  const handleAdd = () => {
    if (variableName) {
      onAddVariable(`{${variableName}}`);
      setVariableName('');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        <span className="mr-1">+</span> Add Variable
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <h3 className="font-medium text-gray-900 mb-2">Insert Variable</h3>
          
          <div className="mb-3">
            <input
              type="text"
              value={variableName}
              onChange={(e) => setVariableName(e.target.value)}
              placeholder="Variable name"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">Common variables:</p>
            <div className="flex flex-wrap gap-1">
              {variables.map((varItem) => (
                <button
                  key={varItem.name}
                  onClick={() => {
                    setVariableName(varItem.name);
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                >
                  {varItem.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button 
              onClick={handleAdd}
              disabled={!variableName}
              className={`px-3 py-1 text-sm rounded ${
                variableName 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};