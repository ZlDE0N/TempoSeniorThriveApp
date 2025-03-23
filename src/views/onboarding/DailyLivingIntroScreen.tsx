import { Button } from "@/views/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function TransitionScreen() {
  const navigate = useNavigate();
  // Scroll to top on mount
  // Auto advance after 2.5 seconds
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate("/onboarding/morning-energy");
    }, 2500);
  }, []);
  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <p className="text-2xl p-4 font-bold">
          Personal Profile
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

        <div className="bg-white rounded-xl flex flex-col gap-8 surrounding-shadow p-12">
          <h1 className="text-3xl font-bold text-st_black">
            Let's talk about your daily life, routines, and energy.
          </h1>

          <p className="text-xl text-slate-600">
            Understanding your 'why' behind your daily habits is a great way to continue creating a life you love and enjoy!
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
