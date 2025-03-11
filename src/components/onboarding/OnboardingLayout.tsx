import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface OnboardingLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backPath?: string;
}

export default function OnboardingLayout({
  children,
  showBackButton = false,
  backPath = "/onboarding",
}: OnboardingLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          SeniorThrive
        </Link>

        <div className="flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={() => navigate(backPath)}
              className="text-sm font-medium text-slate-600 hover:text-slate-800"
            >
              ← Back
            </button>
          )}
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            Skip to Dashboard
          </Link>
        </div>
      </header>

      {children}
    </div>
  );
}
