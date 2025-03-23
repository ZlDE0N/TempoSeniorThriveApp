import { Button } from "@/views/dashboard/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function RoomAssessmentIntroScreen() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <p className="text-2xl p-4 font-bold">
          Support & Connections
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

        <motion.div
          className="bg-white rounded-xl surrounding-shadow p-12"
        >
          <h1 className="text-3xl font-bold text-st_black mb-6">
            Let's add one more layer to your story!
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            A quick peek at your space can reveal simple ways to enhance your
            daily confidence. Just like a friend offering a fresh perspective,
            we'll look at the room where you spend time and spot opportunities
            for even more ease and independence.
          </p>

          <div className="flex justify-center">
            <Button size="lg" 
              className="shadow-md text-white hover:shadow-xl border-2 border-st_dark_blue hover:border-white text-lg bg-st_dark_blue hover:bg-st_light_blue px-8 py-6 h-auto"
              asChild>
              <Link to="/onboarding/room-selection">Continue to Room Assessment</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </OnboardingLayout>
  );
}
