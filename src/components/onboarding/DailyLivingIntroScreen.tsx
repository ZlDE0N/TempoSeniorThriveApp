import { Button } from "@/components/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function TransitionScreen() {
  const userName = localStorage.getItem("st_onboarding_name");
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <p className="text-2xl p-4 font-bold">
          Personal information
          <FontAwesomeIcon className="pl-2" icon={faCircleCheck}/>
        </p>
        {/* Progress Bar */}
        <div className="w-full bg-green-100 rounded-full h-4 mb-12">
          <motion.div className="bg-green-400 h-4 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="bg-white rounded-xl surrounding-shadow p-12">
          <h1 className="text-3xl font-bold text-st_black mb-6">
            Let's talk about your day.
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            These are moments that make life uniquely yours.
          </p>

          <div className="flex justify-center">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link to="/onboarding/morning-routine">Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
