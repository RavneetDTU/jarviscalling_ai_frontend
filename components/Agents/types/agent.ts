export type Agent = {
    id: string;
    name: string;
    createdBy: string;
    createdAt: Date;
    voice?: string;
    firstMessage?: string;
    systemPrompt?: string;
  };
  
  export type Tab = {
    id: string;
    name: string;
    component: React.ReactNode;
  };

export type AgentType = 'blank' | 'personal' | 'business';
export type Step = 'type' | 'purpose' | 'industry' | 'naming';

export interface AgentOption {
  id: AgentType;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export interface PurposeOption {
  id: string;
  title: string;
  icon: any;
}

export interface IndustryOption {
  id: string;
  title: string;
}

export interface AgentCreationState {
  agentType: AgentType | null;
  purpose: string | null;
  industry: string | null;
  agentName: string;
  customPurpose: string;
  customIndustry: string;
  showCustomPurpose: boolean;
  showCustomIndustry: boolean;
}

// Alternatively, define the type locally if it doesn't exist in the module
export type AgentSetting = {
  id: string;
  name: string;
  isPublic: boolean;
  defaultLanguage: string;
  additionalLanguages: string[];
  firstMessage: string;
  systemPrompt: string;
};