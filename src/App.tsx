import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LandingPage from "./components/landing/LandingPage";
import OnboardingRoutes from "./components/onboarding/OnboardingRoutes";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ThriveScorePreview from "./components/dashboard/ThriveScorePreview";

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
          <Route path="/" element={<LandingPage />} />
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
