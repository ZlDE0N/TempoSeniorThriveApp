import { Button } from "@/views/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { faHome, faUserCircle, faSun, faCheckCircle, faArrowRight, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";

export default function RoomAssessmentIntroScreen() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const name = localStorage.getItem("st_onboarding_name") || "guest";

  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <motion.h1 
          className="text-xl md:text-3xl font-bold text-st_black mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          You're doing great, {name}!
        </motion.h1>
        <motion.div
          className="bg-st_light_blue border-st_light_blue border-2 bg-opacity-[0.05] border-opacity-50 rounded-xl m-8 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-lg md:text-xl text-st_black">Your journey so far:</div>

          {/* Progress Section */}
          <div className="grid grid-cols-5 items-center justify-center space-x-4 my-4">
            {[
              { icon: faUserCircle, label: "Personal \n Profile" },
              { icon: faSun, label: "Daily \n Living" },
              { icon: faHome, label: "Mobility & Stability" },
              { icon: faSun, label: "Support & Connections" },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-row items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-400 text-white rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
                  </div>
                  <span className="text-sm text-st_black font-semibold mt-2 text-center whitespace-pre-line">
                    {step.label}
                  </span>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="flex flex-row items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faClock} className="text-2xl" />
                </div>
                <span className="text-sm text-st_black font-semibold mt-2 text-center whitespace-pre-line">
                  {"Safety\nScan"}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-row items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{  opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
        <div className="text-lg md:text-xl text-st_black pb-8">
          <FontAwesomeIcon icon={faStar} className="pr-2" />
          You're almost ready to thrive at home - just one quick thing left!
        </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="bg-white rounded-xl surrounding-shadow p-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl md:text-3xl font-bold text-st_black mb-6">
            Let’s take a look at your space—together
          </h2>
          <p className="text-sm md:text-xl text-slate-600 mb-8">
            You're almost there! A quick look at your room can reveal simple ways to boost safety, comfort, and confidence. Like a trusted guide, we’ll help you spot easy wins to help you keep thriving at home—your way.
          </p>

            <Button size="lg" 
              className="shadow-md text-sm md:text-xl text-white hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue px-8 py-6 h-auto"
              asChild>
              <Link to="/onboarding/room-selection">Start Room Safety Check</Link>
            </Button>
        </motion.div>
      </div>
    </OnboardingLayout>
  );
}

