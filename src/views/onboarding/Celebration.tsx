import { Button } from "@/views/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faHome, faHeart, faCamera, faUserCircle, faSun, faCheckCircle, faArrowRight, faStar, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";

export default function RoomAssessmentIntroScreen() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const name = localStorage.getItem("st_onboarding_name") || "guest";
  const navigate = useNavigate();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const progressConnector = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const card = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <OnboardingLayout>
      <div className="container mx-auto py-12 max-w-2xl text-center">
        {/* Main Content */}
        <motion.div 
          className="bg-white rounded-xl surrounding-shadow md:p-12 p-8"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h1 
            className="text-xl md:text-3xl font-bold text-st_black mb-6"
            variants={item}
          >
            You're doing great, {name}!
          </motion.h1>

          <motion.div
            className="bg-white shadow-none md:surrounding-shadow rounded-xl m-8"
            variants={card}
          >
            <motion.div 
              className="text-xl md:text-2xl text-st_black"
              variants={item}
            >
              Your journey so far:
            </motion.div>

            {/* Progress Section */}
            <div className="w-full flex items-center justify-center my-8">
              <motion.div 
                className="grid md:grid-rows-1 grid-rows-5 md:grid-cols-5 items-start justify-start gap-10 md:gap-4"
                variants={container}
              >
                {[
                  { icon: faUserCircle, label: "Personal Profile", completed: true },
                  { icon: faSun, label: "Daily Living", completed: true },
                  { icon: faHome, label: "Mobility & Stability", completed: true },
                  { icon: faHeart, label: "Support & Connections", completed: true },
                  { icon: faCamera, label: "Safety Scan", completed: false, current: true }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center flex-1 min-w-[80px] w-full"
                    variants={item}
                    custom={index}
                  >

                    {/* Step indicator */}
                    <div className="relative">
                      <motion.div
                        className={cn(
                          "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center",
                          step.current ? "bg-blue-500 ring-0 ring-blue-300" : 
                          step.completed ? "bg-green-400" : "bg-gray-200"
                        )}
                      >
                        <FontAwesomeIcon 
                          icon={step.completed ? faCheckCircle : step.current ? faCamera : step.icon} 
                          className={cn(
                            "text-lg md:text-xl",
                            step.completed || step.current ? "text-white" : "text-gray-600"
                          )} 
                        />
                      </motion.div>
                    </div>

                    {/* Label */}
                    <motion.span 
                      className="text-base md:text-base text-center mt-2 font-medium text-st_black whitespace-normal"
                    >
                      {step.label.split(' ').join('\n')}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center"
            variants={item}
          >
            <motion.div 
              className="text-lg md:text-xl text-st_black pb-8"
              variants={item}
            >
              <FontAwesomeIcon 
                icon={faStar} 
                className="pr-2 text-base md:text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              />
              Congrats! You're almost ready to thrive at home - just one quick thing left!
            </motion.div>
            
            <motion.div 
              className="pt-4 w-full text-white flex justify-center"
              variants={container}
            >
              <div className="grid w-full gap-3 grid-rows-1 md:grid-cols-2">
                {/* Back button */}
                <motion.button 
                  type="button"
                  className="w-full text-lg md:text-xl p-5 shadow-md border-2 border-st_dark_blue bg-white hover:bg-gray-100 hover:gray-200 text-st_dark_blue rounded-md flex items-center justify-center gap-2"
                  onClick={() => navigate("/onboarding/connections")}
                >
                  Back
                </motion.button>
                
                {/* Next button */}
                <motion.div 
                  className="w-full flex justify-center"
                >
                  <Button 
                    onClick={() => navigate("/onboarding/room-assessment")}
                    size="lg" 
                    className="md:text-xl text-lg shadow-md w-full hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue px-8 py-6 h-auto"
                  >
                    Next
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </OnboardingLayout>
  );
}
