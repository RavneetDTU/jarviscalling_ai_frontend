"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { AgentHeader } from "@/components/Agents/AgentsSetting/AgentHeader";
import AgentsTab from "@/components/Agents/AgentsSetting/AgentsTab";
import AdvancedTab from "@/components/Agents/AgentsSetting/AdvancedTab";
import { Card } from "@/components/ui/card";
import { AgentDashboardHeader } from "@/components/Header";
import { AgentDashboardSidebar } from "@/components/Sidebar";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";

const TABS = ["Agent", "Advanced"];

type AgentSettings = {
  id: string;
  name: string;
  isPublic: boolean;
  defaultLanguage: string;
  firstMessage: string;
  systemPrompt: string;
  conversationConfig: any;
  metadata: {
    created_at_unix_secs: number;
  };
  access_info: {
    creator_name: string;
    role: string;
  };
};

export default function AgentSettingsPage() {
  const { id: agentId } = useParams();
  const router = useRouter();

  const [toastMessage, setToastMessage] = useState<{
    title: string;
    description: string;
    type: "success" | "error";
  } | null>(null);

  const [localFirstMessage, setLocalFirstMessage] = useState("");
  const [localSystemPrompt, setLocalSystemPrompt] = useState("");

  const [agentSettings, setAgentSettings] = useState<AgentSettings | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!agentId) return;

      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/convai/agents/${agentId}`,
          {
            headers: {
              "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLAB_API_KEY || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch agent: ${response.status}`);
        }

        const data = await response.json();

        setAgentSettings({
          id: data.agent_id,
          name: data.name,
          isPublic: false,
          defaultLanguage: data.conversation_config?.agent?.language || "en",
          firstMessage: data.conversation_config?.agent?.first_message || "",
          systemPrompt: data.conversation_config?.agent?.prompt?.prompt || "",
          conversationConfig: data.conversation_config,
          metadata: data.metadata,
          access_info: data.access_info,
        });

        setLocalFirstMessage(data.conversation_config?.agent?.first_message || "");
        setLocalSystemPrompt(data.conversation_config?.agent?.prompt?.prompt || "");

      } catch (error) {
        console.error("Error fetching agent details:", error);
        setToastMessage({
          title: "Failed to load agent",
          description: error instanceof Error ? error.message : "Unknown error",
          type: "error",
        });
        router.push("/agents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgentDetails();
  }, [agentId]);

  const updateSettings = async () => {
    if (!agentSettings) return;

    const updatedSettings = {
      ...agentSettings,
      firstMessage: localFirstMessage,
      systemPrompt: localSystemPrompt,
    };

    setAgentSettings(updatedSettings);

    try {
      const payload = {
        conversation_config: {
          agent: {
            first_message: updatedSettings.firstMessage,
            language: agentSettings.defaultLanguage,
            prompt: {
              prompt: updatedSettings.systemPrompt,
            },
          },
        },
      };

      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/agents/${agentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLAB_API_KEY || "",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update agent: ${response.status} - ${
            errorData.message || JSON.stringify(errorData)
          }`
        );
      }

      setToastMessage({
        title: "Agent updated",
        description: "Your agent is successfully updated.",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating agent:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setToastMessage({
        title: "Update failed",
        description: errorMessage,
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!agentSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 text-lg">Agent not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full bg-gray-20">
      <AgentDashboardHeader />

      <div className="flex flex-1 min-h-screen">
        <AgentDashboardSidebar />

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
            {selectedTab === 0 && (
              <AgentsTab
                defaultLanguage={agentSettings.defaultLanguage}
                firstMessage={localFirstMessage}
                systemPrompt={localSystemPrompt}
                onFirstMessageChange={setLocalFirstMessage}
                onSystemPromptChange={setLocalSystemPrompt}
              />
            )}

            {selectedTab === 1 && <AdvancedTab agentId={agentSettings.id} />}

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={updateSettings}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </Card>
        </div>
      </div>

      <ToastProvider>
        <ToastViewport />

        {toastMessage && (
          <Toast
            variant={toastMessage.type === "error" ? "destructive" : "default"}
            open
            onOpenChange={(open) => {
              if (!open) setToastMessage(null);
            }}
          >
            <div className="flex flex-col space-y-1">
              <ToastTitle>{toastMessage.title}</ToastTitle>
              <ToastDescription>{toastMessage.description}</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
        )}
      </ToastProvider>
    </div>
  );
}
