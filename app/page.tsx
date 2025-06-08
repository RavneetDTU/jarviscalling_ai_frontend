"use client";

import { useModalStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import EnhancedVoiceAnimation from "@/components/enhanced-voice-animation";
import AnimatedBackground from "@/components/animated-background";
import EarlyAccessModal from "@/components/early-access-modal";
import BookSetupModal from "@/components/book-setup-modal";
import { useEffect, useRef, useState } from "react";
import VoiceCallAnimationCircle from "@/components/voice-animation-circle";
import { ComparisonTable } from "@/components/comparision-table";
import CustomerReview from "@/components/customer-review";

import { useConversation } from "@elevenlabs/react";

export default function LandingPage() {
  const { openEarlyAccess, openBookSetup } = useModalStore();

  const [isCallActive, setIsCallActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const conversation = useConversation();
  const router = useRouter();

  const handleNavigationToWhatsApp = () => {
    router.push("https://wa.me/919728000432?text=Hi%2C%20I%20want%20to%20book%20a%20table");
  };

  const handleStartConversation = async () => {
    if (isCallActive) {
      await conversation.endSession();
      setIsCallActive(false);
      setErrorMsg("");
      return;
    }

    // Request microphone permission before starting the call
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
    } catch (error) {
      setErrorMsg((error as Error).message);
      console.error("Microphone permission denied:", error);
      return;
    }

    const conversationId = await conversation.startSession({
      agentId: "agent_01jwgkr5pbe6msff8n040gvge6",
    });

    if (conversationId) {
      setIsCallActive(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Failed to start conversation. Please try again.");
    }
  };

  const features = [
    {
      icon: (
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
          className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: "24/7 Phone Support",
      description: "Never miss a call again with AI that answers instantly",
      gradient: "from-indigo-600/10 to-indigo-500/10",
    },
    {
      icon: (
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
          className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      title: "WhatsApp Integration",
      description:
        "Handle bookings and queries on your customers' favorite platform",
      gradient: "from-emerald-500/10 to-emerald-400/10",
    },
    {
      icon: (
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
          className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Smart Scheduling",
      description: "Automatic booking management with calendar sync",
      gradient: "from-indigo-600/10 to-emerald-500/10",
    },
    {
      icon: (
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
          className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Customer Delight",
      description: "Personalized service that makes customers feel valued",
      gradient: "from-emerald-500/10 to-indigo-600/10",
    },
  ];

  const stats = [
    {
      number: "90%",
      label: "Fewer Missed Calls",
      icon: (
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
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
    },
    {
      number: "3x",
      label: "More Bookings",
      icon: (
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
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      number: "24/7",
      label: "Availability",
      icon: (
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
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      number: "99%",
      label: "Customer Satisfaction",
      icon: (
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
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-snow relative overflow-hidden">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Side - Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in-up order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-600/10 to-emerald-500/10 rounded-full border border-indigo-600/20">
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
                  className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 mr-1.5 sm:mr-2"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-graphite">
                  AI-Powered Restaurant Assistant
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-graphite leading-tight">
                Your AI Front Desk,{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                  24/7
                </span>{" "}
                – Never Miss a Reservation Again
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-graphite/70 leading-relaxed max-w-2xl">
                AI-powered phone and WhatsApp agents that take bookings, send
                reminders, and delight your customers with instant, personalized
                service.
              </p>
            </div>

            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={openEarlyAccess}
                className="group border-2 border-indigo-600 text-indigo-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
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
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Get Early Access
              </button>

              <button
                onClick={openBookSetup}
                className="group bg-white text-graphite px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Book Free Setup
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-graphite/60">
                  500+ restaurants trust us
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="text-xs sm:text-sm text-graphite/60 ml-1">
                  4.9/5 rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Animation */}
          <div className="h-full flex flex-col items-center justify-center gap-14 animate-slide-in-right order-1 lg:order-2">
            {isCallActive ? (
              <VoiceCallAnimationCircle />
            ) : (
              <EnhancedVoiceAnimation />
            )}

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={handleStartConversation}
                className="w-52 group bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl shadow-indigo-600/25 flex items-center justify-center"
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

              <div className="relative">
                <button
                  onClick={handleNavigationToWhatsApp}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="w-52 group bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl shadow-indigo-600/25 flex items-center justify-center"
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
                  Chat on WhatsApp
                </button>

                {showTooltip && (
                  <div className="w-48 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-100 text-black text-xs rounded-md px-3 py-1 shadow-lg z-10">
                    If WhatsApp isn't available, contact us at 919728000432
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Jarvis AI - Enhanced */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-600/10 to-emerald-500/10 rounded-full border border-indigo-600/20 mb-4 sm:mb-6">
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
                className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 mr-1.5 sm:mr-2"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-graphite">
                Why Choose Jarvis AI
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-graphite mb-4 sm:mb-6">
              Transform Your Restaurant Operations
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-graphite/70 max-w-3xl mx-auto">
              Intelligent automation that works around the clock to grow your
              business
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-gray-100 hover:border-indigo-200 transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-3 sm:space-y-4">
                  <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-graphite text-center">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-graphite/70 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Comparison Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-snow to-indigo-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-graphite mb-4 sm:mb-6">
              Jarvis AI vs Traditional Support
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-graphite/70">
              See the difference intelligent automation makes
            </p>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-graphite mb-4 sm:mb-6">
              Impact by Numbers
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-graphite/70">
              Real results from restaurants using Jarvis AI
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center space-y-2 sm:space-y-4 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-50 to-emerald-50 border border-indigo-100 hover:border-indigo-200 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-graphite/70 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Reviews Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-snow to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-graphite mb-4 sm:mb-6">
              Customer Reviews
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-graphite/70">
              Hear from restaurant owners who transformed their business
            </p>
          </div>
          <CustomerReview />
        </div>
      </section>

      {/* Modals */}
      <EarlyAccessModal />
      <BookSetupModal />
    </div>
  );
}
