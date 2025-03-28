import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./views/dashboard/base_layout_dashboard";
import routes from "tempo-routes";
import LandingPage from "./backup_views/LandingPage";
import OnboardingRoutes from "./views/onboarding/OnboardingRoutes";
import LoginPage from "./views/auth/LoginPage";
import RegisterPage from "./views/auth/RegisterPage";
import ForgotPasswordPage from "./views/auth/ForgotPasswordPage";
import ThriveScorePreview from "./backup_views/ThriveScorePreview";
import HomePage from "./views/landing/HomePage";
import ThriveScore from "./backup_views/components_backup/ThriveScore";
import VisionAssessment from "./backup_views/components_backup/VisionAssessment";
import Modal from "./views/dashboard/dashboard_components/Modal";
import MainLayout from "./backup_views/components_backup/Sidebar_Layout_Dashboard";
import WelcomeHeader from "./views/dashboard/dashboard-views/family/WelcomeHeader";
import Sidebar_Layout_Dashboard from "./backup_views/components_backup/Sidebar_Layout_Dashboard";

function App() {
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <p className="text-lg text-slate-600">
            Loading your wellness dashboard...
          </p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={< Sidebar_Layout_Dashboard/>} /> */}
          <Route path="/onboarding/*" element={<OnboardingRoutes />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/thrive-preview" element={<ThriveScorePreview />} />
          <Route
            path="/signin"
            element={<LoginPage showBackButton={true} backPath="/" />}
          />
          <Route
            path="/register"
            element={<RegisterPage showBackButton={true} backPath="/" />}
          />
          <Route
            path="/forgot-password"
            element={
              <ForgotPasswordPage showBackButton={true} backPath="/signin" />
            }
          />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
        {tempoRoutes}
      </>
    </Suspense>
  );
}

export default App;
