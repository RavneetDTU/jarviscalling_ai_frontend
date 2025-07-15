// app/agents/AgentsTable.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface AccessInfo {
  is_creator: boolean;
  creator_name: string;
  creator_email: string;
  role: string;
}

interface Agent {
  agent_id: string;
  name: string;
  tags: string[];
  created_at_unix_secs: number;
  access_info: AccessInfo;
}

const AgentsTable = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://api.elevenlabs.io/v1/convai/agents', {
          headers: {
            'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLAB_API_KEY || 'xi-api-key',
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setAgents(data.agents || []);
      } catch (err) {
        setError('Failed to fetch agents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);


  const formatDate = (unixSecs: number) => {
    return format(new Date(unixSecs * 1000), 'dd MMM yyyy, HH:mm');
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Loading agents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }


  const handleRowClick = (agentId: string) => {
    router.push(`/agents/${agentId}`);
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created by
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
              Created at
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {agents.map((agent) => (
            <tr key={agent.agent_id} onClick={() => handleRowClick(agent.agent_id)} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{agent.name}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{agent.access_info.creator_name}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(agent.created_at_unix_secs)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentsTable;