import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import OnboardingRoutes from "./components/onboarding/OnboardingRoutes";
import { LandingPage } from "./components/landing";

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
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/onboarding/*" element={<OnboardingRoutes />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {tempoRoutes}
      </>
    </Suspense>
  );
}

export default App;
