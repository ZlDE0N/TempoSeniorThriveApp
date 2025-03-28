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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
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

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }
    }
  };

  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        {/* Main Content */}
        <motion.div 
          className="bg-white rounded-xl surrounding-shadow p-12"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <motion.div variants={containerVariants}>
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-st_black mb-6"
              variants={itemVariants}
            >
              Let's take a look at your space—together
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-600 mb-8"
              variants={itemVariants}
            >
              You're almost there! A quick look at your room can reveal simple ways to boost safety, comfort, and confidence. Like a trusted guide, we'll help you spot easy wins to help you keep thriving at home—your way.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button 
                size="lg" 
                className="shadow-md text-lg md:text-xl text-white hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue px-8 py-6 h-auto"
                asChild
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/onboarding/room-selection">
                  Start Room Safety Check
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5
                    }}
                    className="ml-2"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </OnboardingLayout>
  );
}
