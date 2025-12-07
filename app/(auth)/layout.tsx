import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect("/");

  return (
    <div className="auth-split-layout">
      {/* Left Panel - Branding */}
      <div className="auth-branding-panel">
        <div className="space-y-8">
          {/* Logo and Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                PrepAgent
              </h1>
            </div>

            {/* Hero Text */}
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-primary-900">
                Ace Your Next Interview
              </h2>
              <p className="text-lg text-primary-700">
                Practice with AI-powered mock interviews and get instant feedback
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-primary-900">Realistic Interview Scenarios</h3>
                <p className="text-sm text-primary-700">Practice with industry-standard interview formats and questions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-primary-900">Instant AI Feedback</h3>
                <p className="text-sm text-primary-700">Get detailed analysis and suggestions to improve your performance</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-primary-900">Track Your Progress</h3>
                <p className="text-sm text-primary-700">Monitor improvement over time and identify areas to focus on</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="auth-form-panel">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
