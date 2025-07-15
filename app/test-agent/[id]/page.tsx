"use client";

import EnhancedVoiceAnimation from "@/components/enhanced-voice-animation";
import VoiceCallAnimationCircle from "@/components/voice-animation-circle";
import { useEffect, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import { useParams } from "next/navigation";
import { AgentDashboardHeader } from "@/components/Header";
import { AgentDashboardSidebar } from "@/components/Sidebar";

function page() {
  const { id: agentId } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const conversation = useConversation();

  const handleStartConversation = async () => {
    if (isCallActive) {
      await conversation.endSession();
      setIsCallActive(false);
      setErrorMsg("");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
    } catch (error) {
      setErrorMsg((error as Error).message);
      console.error("Microphone permission denied:", error);
      return;
    }

    if (!agentId) {
      setErrorMsg(
        "Agent ID is not configured. Please check your environment variables."
      );
      return;
    }

    setIsLoading(true); // Start loading animation

    try {
      const conversationId = await conversation.startSession({
        agentId: agentId as string,
      });

      if (conversationId) {
        setIsCallActive(true);
        setErrorMsg("");
      } else {
        setErrorMsg("Failed to start conversation. Please try again.");
      }
    } catch (e) {
      setErrorMsg("Error connecting to the agent.");
    }

    setIsLoading(false); // Stop loading animation
  };
  return (
    <div className="min-h-screen h-full bg-gray-20">
      <AgentDashboardHeader />

      <div className="flex flex-1 min-h-screen">
        <AgentDashboardSidebar />
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Right Side - Enhanced Animation */}
          <div className="h-full flex flex-col items-center justify-center gap-8 md:gap-14 animate-slide-in-right order-1 lg:order-2">
            {isLoading ? (
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-t-4 border-indigo-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-3 bg-indigo-600 rounded-full animate-ping" />
                </div>
              </div>
            ) : isCallActive ? (
              <VoiceCallAnimationCircle />
            ) : (
              <EnhancedVoiceAnimation />
            )}

            <div className="w-fit flex gap-4 md:gap-6">
              <button
                onClick={handleStartConversation}
                className="w-44 md:w-52 group bg-gradient-to-r from-indigo-600 to-indigo-500 text-white md:px-6 md:py-3 px-3 py-2 rounded-xl font-medium hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl shadow-indigo-600/25 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {isCallActive ? "End Call" : "Try Demo Call"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
