'use client';

import { useState } from "react";
import { resetPassword } from "@/lib/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Key, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-sm border-gray-200">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Key className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Reset your password</h2>
          <p className="text-gray-600">Enter your email to receive a reset link</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          {message && (
            <div className={`p-3 text-sm rounded-md ${
              message.includes("sent") 
                ? "text-green-600 bg-green-50" 
                : "text-red-600 bg-red-50"
            }`}>
              {message}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            Send reset email <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center text-sm text-gray-600">
            <span>Remember your password? </span>
            <Link href="/login" className="text-indigo-500 hover:text-indigo-600 hover:underline">
              Login here
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}