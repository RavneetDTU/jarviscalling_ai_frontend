import React from "react";

const comparisons = [
  {
    feature: "Availability",
    jarvis: "24/7 support, no breaks",
    traditional: "Limited to working hours",
  },
  {
    feature: "Response Time",
    jarvis: "Instant replies",
    traditional: "Delays during peak hours",
  },
  {
    feature: "Multilingual Support",
    jarvis: "Supports multiple languages effortlessly",
    traditional: "Limited to staff's language skills",
  },
  {
    feature: "Order Handling",
    jarvis: "Can take orders automatically via chat/call",
    traditional: "Requires human intervention",
  },
  {
    feature: "Reservation Management",
    jarvis: "Instant booking confirmations via website/WhatsApp",
    traditional: "Manual confirmation needed",
  },
  {
    feature: "Cost Efficiency",
    jarvis: "Low operational cost (no staffing needed)",
    traditional: "High labor costs",
  },
  {
    feature: "Scalability",
    jarvis: "Handles unlimited queries simultaneously",
    traditional: "Limited by staff availability",
  },
  {
    feature: "Integration",
    jarvis: "Works on website, WhatsApp, and calls seamlessly",
    traditional: "Separate systems for calls/messages",
  },
];

export const ComparisonTable = () => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 md:bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-8 md:rounded-xl md:shadow-lg md:border border-gray-200">
      {/* Headings Row */}
      <div className="hidden md:grid grid-cols-3 gap-6 items-center font-semibold text-gray-900 ">
        <div className="text-center sm:text-left">Feature</div>
        <div className="text-center">Traditional Support</div>
        <div className="text-center">Jarvis AI</div>
      </div>

      {comparisons.map((comparison, index) => (
        <div
          key={index}
          className="bg-white/90 md:bg-none shadow-xl md:shadow-none border-0 md:border-none rounded-2xl md:rounded-none overflow-hidden md:overflow-visible space-y-0 p-0 md:space-y-0 md:p-0 transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-2 items-start md:items-center">
            {/* Feature Title - Mobile */}
            <div className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h3 className="text-lg font-bold text-white text-center">
                {comparison.feature}
              </h3>
            </div>

            {/* Feature Title - Desktop */}
            <div className="hidden md:block text-center md:text-left">
              <h3 className="text-base font-bold text-gray-800">
                {comparison.feature}
              </h3>
            </div>

            {/* Mobile Layout - Card Style */}
            <div className="md:hidden">
              {/* Traditional Support Card */}
              <div className="relative bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-400 p-6">
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                </div>
                <div className="pr-12">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-xs font-bold text-red-800 uppercase tracking-wider">
                      Traditional Support
                    </span>
                  </div>
                  <p className="text-sm text-red-900 leading-relaxed font-medium">
                    {comparison.traditional}
                  </p>
                </div>
              </div>

              {/* VS Divider */}
              <div className="relative py-4 bg-gray-50">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-50 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    VS
                  </span>
                </div>
              </div>

              {/* FoodiBot AI Card */}
              <div className="relative bg-gradient-to-br from-emerald-50 to-green-100 border-l-4 border-emerald-400 p-6">
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                </div>
                <div className="pr-12">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Jarvis AI
                    </span>
                  </div>
                  <p className="text-sm text-emerald-900 leading-relaxed font-medium">
                    {comparison.jarvis}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Layout for Comparisons */}
            {/* Traditional Support */}
            <div className="hidden md:flex items-center space-x-3 md:p-3 rounded-lg justify-start">
              <div className="text-carmine bg-red-100 p-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">
                {comparison.traditional}
              </span>
            </div>

            {/* Jarvis AI */}
            <div className="hidden md:flex items-center space-x-3 md:p-3 rounded-lg justify-start">
              <div className="text-emerald-500 bg-emerald-100 p-1.5 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <span className="text-sm text-gray-800">
                {comparison.jarvis}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};