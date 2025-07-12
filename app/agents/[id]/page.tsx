// src/pages/agent/[agentId].tsx
"use client";

import { useRouter, useParams } from "next/navigation";

// Define the AgentSettings type
type AgentSettings = {
  id: string;
  name: string;
  isPublic: boolean;
  defaultLanguage: string;
  additionalLanguages: string[];
  firstMessage: string;
  systemPrompt: string;
};
import { useState, useEffect } from "react";
import Head from "next/head";
import { Tab } from "@headlessui/react";
import { AgentHeader } from "@/components/Agents/AgentsSetting/AgentHeader";
import { LanguageSettings } from "@/components/Agents/AgentsSetting/LanguageSettings";
import { AdditionalLanguages } from "@/components/Agents/AgentsSetting/AdditionalLanguage";
import { FirstMessageSettings } from "@/components/Agents/AgentsSetting/FirstMessafeSetting";
import { SystemPromptSettings } from "@/components/Agents/AgentsSetting/SystemPromptSettings";
import VoiceTab from "@/components/Agents/AgentsSetting/VoiceTab";
import AnalysisTab from "@/components/Agents/AgentsSetting/AnalysisTab";
import SecurityTab from "@/components/Agents/AgentsSetting/SecurityTab";
import AdvancedTab from "@/components/Agents/AgentsSetting/AdvancedTab";
import WidgetTab from "@/components/Agents/AgentsSetting/WidgetTab";
import { Card } from "@/components/ui/card";
import { Agent } from "http";
import { AgentDashboardHeader } from "@/components/Header";
import { AgentDashboardSidebar } from "@/components/Sidebar";

const TABS = ["Agent", "Voice", "Analysis", "Security", "Advanced", "Widget"];

export default function AgentSettingsPage() {
  const router = useRouter();
  const { id: agentId } = useParams();

  const [agentSettings, setAgentSettings] = useState<AgentSettings | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (agentId) {
      setTimeout(() => {
        setAgentSettings({
          id: agentId as string,
          name: "AI Assistant",
          isPublic: true,
          defaultLanguage: "en",
          additionalLanguages: ["es", "fr"],
          firstMessage: "Hello! How can I help you today?",
          systemPrompt:
            "You are a helpful AI assistant designed to provide support and answer questions in a friendly manner.",
        });
        setIsLoading(false);
      }, 500);
    }
  }, [agentId]);

  if (isLoading || !agentSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const updateSettings = (newSettings: Partial<AgentSettings>) => {
    setAgentSettings({ ...agentSettings, ...newSettings });
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
          <div className="space-y-8">
            <LanguageSettings
              defaultLanguage={agentSettings.defaultLanguage}
              onLanguageChange={(language) =>
                updateSettings({ defaultLanguage: language })
              }
            />
            <AdditionalLanguages
              languages={agentSettings.additionalLanguages}
              onLanguagesChange={(languages) =>
                updateSettings({ additionalLanguages: languages })
              }
            />
            <FirstMessageSettings
              firstMessage={agentSettings.firstMessage}
              onFirstMessageChange={(message) =>
                updateSettings({ firstMessage: message })
              }
            />
            <SystemPromptSettings
              systemPrompt={agentSettings.systemPrompt}
              onSystemPromptChange={(prompt) =>
                updateSettings({ systemPrompt: prompt })
              }
            />
          </div>
        );
      case 1:
        return <VoiceTab />;
      case 2:
        return <AnalysisTab />;
      case 3:
        return <SecurityTab />;
      case 4:
        return <AdvancedTab />;
      case 5:
        return <WidgetTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-20 ">
      <AgentDashboardHeader />

      <div className="flex flex-1 min-h-screen">
        <AgentDashboardSidebar />

        {/* <div>
          <Head>
            <title>{agentSettings.name} Settings</title>
          </Head> */}

          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <AgentHeader
              name={agentSettings.name}
              isPublic={agentSettings.isPublic}
              agentId={agentSettings.id}
            />

            <div className="mb-6 min-w-full w-full">
              <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                <Tab.List className="w-full flex space-x-1 rounded-xl bg-white p-1 border border-gray-200 shadow-sm">
                  {TABS.map((tab) => (
                    <Tab
                      key={tab}
                      className={({ selected }) =>
                        `w-full py-3 text-sm font-medium leading-5 rounded-lg transition-colors
                    ${
                      selected
                        ? "bg-blue-100 text-blue-700 shadow"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                      }
                    >
                      {tab}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>

            <Card className="p-6">
              {renderTabContent()}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </Card>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}
