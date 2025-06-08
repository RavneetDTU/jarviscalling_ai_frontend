"use client"

import { useEffect, useState } from "react"

export default function VoiceAnimation() {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center space-x-2 p-8">
      {/* Phone Side */}
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-500 ${isAnimating ? "animate-pulse scale-110" : ""}`}
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </div>
        <p className="text-sm text-gray-600">Incoming Call</p>
      </div>

      {/* Voice Waveform */}
      <div className="flex items-center space-x-1 mx-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-1 bg-indigo-600 rounded-full transition-all duration-300 ${
              isAnimating ? "animate-pulse" : ""
            }`}
            style={{
              height: isAnimating ? `${Math.random() * 40 + 10}px` : "10px",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* AI Agent Side */}
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-500 ${isAnimating ? "animate-pulse scale-110" : ""}`}
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-600">AI Responding</p>
      </div>
    </div>
  )
}
