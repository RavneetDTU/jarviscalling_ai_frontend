'use client';

import { useState } from "react";
import { login } from "@/lib/authService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-sm border-gray-200 bg-gray-100">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
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

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
            Log in <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Link href="/forgot-password" className="text-indigo-500 hover:text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <span>Don't have an account?</span>
              <Link href="/signup" className="text-indigo-500 hover:text-indigo-600 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}