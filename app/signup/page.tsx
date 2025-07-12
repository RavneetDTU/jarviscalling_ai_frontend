"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupWithEmail } from "@/lib/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, Mail, ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await signupWithEmail(email, password, name);
      setMessage("Verification email sent. Please check your inbox.");
      // Redirect to login after 3 seconds
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6 shadow-sm border-gray-200 bg-gray-100">

        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <UserPlus className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Create an account
          </h2>
          <p className="text-gray-600">Get started with your free account</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {message && (
            <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
              {message}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 border-gray-300 bg-gray-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
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
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="text-indigo-500 hover:text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}