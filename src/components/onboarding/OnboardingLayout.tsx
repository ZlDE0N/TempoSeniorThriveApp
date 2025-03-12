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
    <div className="min-h-screen bg-gradient-to-b from-whit to-blue-50">
      <header className="fixed z-20 shadow-md w-dvw mx-auto px-10 md:px-20 bg-white py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          <span className="text-st_light_orange">Senior</span><span className="text-st_light_blue">Thrive™</span>
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
        </div>
      </header>

      <div className="pt-16">
        {children}
      </div>
    </div>
  );
}
