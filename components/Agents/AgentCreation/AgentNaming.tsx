// src/components/agent-creation/AgentNaming.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/BackButton';

interface AgentNamingProps {
  agentName: string;
  onAgentNameChange: (value: string) => void;
  onCreateAgent: () => void;
  onBack: () => void;
}

export const AgentNaming = ({
  agentName,
  onAgentNameChange,
  onCreateAgent,
  onBack
}: AgentNamingProps) => (
  <div className="animate-fadeIn max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        Name your agent
      </h1>
      <p className="text-gray-600">
        Choose a name that reflects your agent's purpose
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <div className="mb-6">
        <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700 mb-1">
          Agent Name
        </label>
        <Input
          id="agent-name"
          value={agentName}
          onChange={(e) => onAgentNameChange(e.target.value)}
          placeholder="e.g. AI Assistant"
          className="text-lg"
          maxLength={50}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {agentName.length}/50 characters
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <BackButton onClick={onBack} />
        <Button
          onClick={onCreateAgent}
          disabled={!agentName.trim()}
          variant="default"
          className="flex items-center justify-center gap-2"
          size="lg"
        >
          Create Agent
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </Button>
      </div>
    </div>
  </div>
);