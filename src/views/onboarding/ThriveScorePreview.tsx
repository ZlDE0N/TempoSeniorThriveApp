import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/views/dashboard/ui/button";
import Gauge from "@/views/dashboard/ui/gauge";
import Recommendations from "@/backup_views/components_backup/Recommendations";
import { motion } from "framer-motion";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";

export default function ThriveScorePreview() {
  const [showBlur, setShowBlur] = useState(false);
  const [thriveScore, setThriveScore] = useState(0);

  // Animate the ThriveScore on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setThriveScore(78);
    }, 500);

    // Show blur effect after 3 seconds
    const blurTimer = setTimeout(() => {
      setShowBlur(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(blurTimer);
    };
  }, []);

  return (
    <OnboardingLayout showBackButton={true} backPath="/onboarding/transition">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-st_black mb-8 text-center">
            Your Personalized ThriveScore™
          </h1>

          <div className="flex flex-col gap-10 items-center">
            {/* ThriveScore Gauge - Larger and Centered */}
            <motion.div
              className="w-full max-w-md flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-white rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-st_black mb-6 text-center">
                Your ThriveScore™
              </h2>
              <div className="scale-150 mb-8">
                <Gauge
                  value={thriveScore}
                  label="Overall Wellness"
                  color="#3761D5"
                />
              </div>
              <p className="text-center text-slate-600 mt-6 max-w-sm">
                Based on your responses, we've calculated your initial
                ThriveScore™. This score will improve as you implement our
                recommendations.
              </p>
              <div className="mt-4 text-center">
                <span className="text-2xl font-bold text-st_light_blue">
                  {thriveScore}
                </span>
                <span className="text-slate-500 text-lg"> / 100</span>
              </div>
            </motion.div>

            {/* Recommendations Section - Below the Gauge */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                className={`transition-all duration-500 ${showBlur ? "blur-sm" : ""}`}
              >
                <Recommendations className="w-full" />
              </div>

              {/* Overlay that appears after delay */}
              {showBlur && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-xl backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-st_black mb-4 text-center px-6">
                    Want to see more recommendations?
                  </h3>
                  <p className="text-slate-600 mb-8 text-center max-w-md px-6">
                    Create an account to access all your personalized
                    recommendations and start improving your ThriveScore™
                    today.
                  </p>
                  <Button
                    size="lg"
                    className="text-lg bg-st_light_blue hover:bg-st_dark_blue text-white px-10 py-6 h-auto rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    asChild
                  >
                    <Link to="/register">Create Account</Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
