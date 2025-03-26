import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/views/dashboard/ui/button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from "framer-motion";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import useGuestStore from '../../store/onboarding_store/guestStore';

export default function ThriveScorePreview() {
  const [showBlur, setShowBlur] = useState(false);
  const [thriveScore, setThriveScore] = useState(0);
  const { analysisResults, setAnalysisResult } = useGuestStore();

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
    <OnboardingLayout showBackButton={false} backPath="/onboarding/transition">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-bold text-st_black mb-8 text-center">
            Your Personalized ThriveScore™
          </h1>

          <div className="flex flex-col gap-10 items-center">
            {/* ThriveScore Gauge - Larger and Centered */}

            {/* Recommendations Section - Below the Gauge */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
            {/* Recomendations here */}
            </motion.div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
