// src/pages/index.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { 
  AgentType, 
  Step, 
  AgentOption, 
  PurposeOption, 
  IndustryOption 
} from '@/components/Agents/types/agent';
import { AgentTypeSelection } from '@/components/Agents/AgentCreation/AgentTypeSection';
import { PurposeSelection } from '@/components/Agents/AgentCreation/PurposeSection';
import { IndustrySelection } from '@/components/Agents/AgentCreation/IndustrySection';
import { AgentNaming } from '@/components/Agents/AgentCreation/AgentNaming';

const AGENT_OPTIONS: AgentOption[] = [
  {
    id: 'blank',
    title: 'Blank Agent',
    description: 'Start from scratch with full customization',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    color: 'from-gray-500 to-gray-700'
  },
  {
    id: 'personal',
    title: 'Personal Assistant',
    description: 'Your everyday helper for scheduling, reminders, and tasks',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'business',
    title: 'Business Agent',
    description: 'Professional assistant for business operations and analytics',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-600'
  }
];

const PURPOSE_OPTIONS: PurposeOption[] = [
  {
    id: 'personal-assistant',
    title: 'Personal Assistant',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  },
  {
    id: 'learning',
    title: 'Learning Companion',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  },
  {
    id: 'creative',
    title: 'Creative Helper',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  },
  {
    id: 'tasks',
    title: 'Task Management',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  },
  {
    id: 'research',
    title: 'Research Assistant',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  },
  {
    id: 'other-purpose',
    title: 'Other',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  }
];

const INDUSTRY_OPTIONS: IndustryOption[] = [
  { id: 'retail', title: 'Retail & E-commerce' },
  { id: 'healthcare', title: 'Healthcare & Medical' },
  { id: 'finance', title: 'Finance & Banking' },
  { id: 'real-estate', title: 'Real Estate' },
  { id: 'education', title: 'Education & Training' },
  { id: 'hospitality', title: 'Hospitality & Travel' },
  { id: 'automotive', title: 'Automotive' },
  { id: 'services', title: 'Professional Services' },
  { id: 'tech', title: 'Technology & Software' },
  { id: 'government', title: 'Government & Public' },
  { id: 'food', title: 'Food & Beverage' },
  { id: 'manufacturing', title: 'Manufacturing' },
  { id: 'fitness', title: 'Fitness & Wellness' },
  { id: 'legal', title: 'Legal Services' },
  { id: 'nonprofit', title: 'Non-Profit' },
  { id: 'media', title: 'Media & Entertainment' },
  { id: 'other-industry', title: 'Other' }
];

export default function CreateAgent() {
  const [step, setStep] = useState<Step>('type');
  const [agentType, setAgentType] = useState<AgentType | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [agentName, setAgentName] = useState('');
  const [showCustomPurpose, setShowCustomPurpose] = useState(false);
  const [customPurpose, setCustomPurpose] = useState('');
  const [showCustomIndustry, setShowCustomIndustry] = useState(false);
  const [customIndustry, setCustomIndustry] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const Router = useRouter();

  const handleSelectAgent = (id: AgentType) => {
    setAgentType(id);
    if (id === 'blank') {
      setStep('naming');
    } else if (id === 'personal') {
      setStep('purpose');
    } else if (id === 'business') {
      setStep('industry');
    }
  };

  const handleSelectPurpose = (id: string) => {
    if (id === 'other-purpose') {
      setShowCustomPurpose(true);
      setPurpose(null);
    } else {
      setPurpose(id);
      setShowCustomPurpose(false);
      setCustomPurpose('');
      setStep('naming');
    }
  };

  const handleSelectIndustry = (id: string) => {
    if (id === 'other-industry') {
      setShowCustomIndustry(true);
      setIndustry(null);
    } else {
      setIndustry(id);
      setShowCustomIndustry(false);
      setCustomIndustry('');
      setStep('naming');
    }
  };

  const handleCreateAgent = () => {
    console.log('Creating agent:', {
      agentType,
      purpose: purpose === 'other-purpose' ? customPurpose : purpose,
      industry: industry === 'other-industry' ? customIndustry : industry,
      agentName
    });
    // Here you would typically call an API to create the agent
    setToast({
      message: 'Agent created successfully!',
      type: 'success'
    });

    Router.push('/agents/121213'); // Redirect to the agent settings page

  };

  const goBack = () => {
    if (step === 'naming') {
      if (agentType === 'blank') {
        setStep('type');
      } else if (agentType === 'personal') {
        setStep('purpose');
      } else if (agentType === 'business') {
        setStep('industry');
      }
    } else if (step === 'purpose' || step === 'industry') {
      setStep('type');
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100/30  py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Create New Agent</title>
        <meta name="description" content="Create a new AI agent" />
      </Head>
      
      {/* 
      <Toast
        open={!!toast}
        onOpenChange={() => setToast(null)}
        type={toast?.type === 'success' ? 'foreground' : toast?.type === 'error' ? 'background' : undefined}
      /> */}

      <div className="max-w-3xl mx-auto">
        {step === 'type' && (
          <AgentTypeSelection
            agentOptions={AGENT_OPTIONS}
            selectedAgent={agentType}
            onSelectAgent={handleSelectAgent}
          />
        )}

        {step === 'purpose' && (
          <PurposeSelection
            purposeOptions={PURPOSE_OPTIONS}
            purpose={purpose}
            showCustomPurpose={showCustomPurpose}
            customPurpose={customPurpose}
            onSelectPurpose={handleSelectPurpose}
            onCustomPurposeChange={setCustomPurpose}
            onContinue={() => {
              if (customPurpose.trim()) {
                setPurpose('other-purpose');
                setStep('naming');
              }
            }}
            onBack={() => setStep('type')}
          />
        )}

        {step === 'industry' && (
          <IndustrySelection
            industryOptions={INDUSTRY_OPTIONS}
            industry={industry}
            showCustomIndustry={showCustomIndustry}
            customIndustry={customIndustry}
            onSelectIndustry={handleSelectIndustry}
            onCustomIndustryChange={setCustomIndustry}
            onContinue={() => {
              if (customIndustry.trim()) {
                setIndustry('other-industry');
                setStep('naming');
              }
            }}
            onBack={() => setStep('type')}
          />
        )}

        {step === 'naming' && (
          <AgentNaming
            agentName={agentName}
            onAgentNameChange={setAgentName}
            onCreateAgent={handleCreateAgent}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  );
}