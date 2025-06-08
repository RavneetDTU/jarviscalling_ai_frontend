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
    traditional: "Limited to staff’s language skills",
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
    <div className="space-y-6 sm:space-y-8 md:bg-white/80 backdrop-blur-md p-4 sm:p-6 md:p-8 md:rounded-xl md:shadow-lg md:border border-gray-200">
      {/* Headings Row */}
      <div className="hidden md:grid grid-cols-3 gap-6 items-center font-semibold text-gray-900 ">
        <div className="text-center sm:text-left">Feature</div>
        <div className="text-center">Traditional Support</div>
        <div className="text-center">FoodiBot AI</div>
      </div>

      {comparisons.map((comparison, index) => (
        <div
          key={index}
          className="bg-white/80 md:bg-none shadow-lg md:shadow-none border md:border-none rounded md:rounded-none border-gray-200 space-y-4 p-4 md:space-y-0 md:p-0  transition-all duration-300 "
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 items-center">
            {/* Feature Title */}
            <div className="text-center sm:text-left text-sm sm:text-base font-bold text-gray-700">
              {comparison.feature}
            </div>

            {/* Traditional Support */}
            <div className="flex items-center space-x-3 md:p-3 rounded-lg  justify-start">
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
            <div className="flex items-center space-x-3 md:p-3  rounded-lg  justify-start">
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
