import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import OnboardingLayout from "./OnboardingLayout";

export default function RoomAssessmentIntroScreen() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-12">
          <div
            className="bg-st_light_blue h-2 rounded-full"
            style={{ width: "85%" }}
          ></div>
        </div>

        <div className="bg-white rounded-xl surrounding-shadow p-12">
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
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link to="/onboarding/room-selection">Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
