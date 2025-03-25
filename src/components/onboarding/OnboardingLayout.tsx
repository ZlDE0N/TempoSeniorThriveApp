import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLink from '@/components/home/HomeLink';
import fullLogo from "@/assets/icons/seniorthrive-full-logo.svg";


interface OnboardingLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backPath?: string;
}

export default function OnboardingLayout({
  children,
  showBackButton = false,
  showLoginLink = true,
  backPath = "/onboarding",
}: OnboardingLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-whit to-blue-50">
      <header className="fixed z-20 shadow-md w-dvw mx-auto px-4 md:px-16 bg-white py-4 flex gap-4 items-center">
        <Link to="/" className="md:block block text-xl font-bold text-blue-600">
          <img src={fullLogo} alt="SeniorThrive Logo"
            className="h-10 w-auto"
          />
        </Link>

        <div className="w-full md:flex flex items-center justify-end gap-6">
          {showLoginLink && (
          <Link
            to="/signin"
            className="text-sm md:block hidden font-medium text-st_light_blue hover:text-st_dark_blue transition-colors"
          >
            Already have an account? Sign in
          </Link>
          )}
          {showBackButton && (
            <button
              onClick={() => navigate(backPath)}
              className="text-sm w-20 bg-st_dark_blue p-3 rounded-md text-white"
            >
              ← Back
            </button>
          )}
        </div>
      </header>

      <div className="pt-20 md:pt-16">{children}</div>
      {showLoginLink && (
        <Link
          to="/signin"
          className="text-sm w-full pb-6 text-center md:hidden block font-medium text-st_light_blue hover:text-st_dark_blue transition-colors"
        >
          Already have an account? Sign in
        </Link>
      )}
    </div>
  );
}
