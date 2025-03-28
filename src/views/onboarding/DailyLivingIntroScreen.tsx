import { Button } from "@/views/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function DailyLivingIntroScreen() {
  const navigate = useNavigate();
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <OnboardingLayout showLoginLink={true}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 max-w-2xl text-center"
      >
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl p-4 font-bold"
        >
          Personal Profile
          <FontAwesomeIcon className="pl-2" icon={faCircleCheck} />
        </motion.p>

        {/* Progress Bar */}
        <div className="w-full bg-green-100 rounded-full h-4 mb-12">
          <motion.div
            className="bg-green-400 h-4 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl flex flex-col gap-8 surrounding-shadow p-12"
        >
          <h1 className="text-xl md:text-3xl font-bold text-st_black">
            Let's talk about your daily life, routines, and energy.
          </h1>

          <p className="text-sm md:text-xl text-slate-600">
            Understanding your 'why' behind your daily habits is a great way to continue creating a life you love and enjoy!
          </p>
          <div className="flex justify-center">
            <Button size="lg" 
              className="shadow-md text-sm md:text-xl text-white hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue px-8 py-6 h-auto"
              asChild>
              <Link to="/onboarding/morning-energy">Continue to Daily Life</Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </OnboardingLayout>
  );
}
