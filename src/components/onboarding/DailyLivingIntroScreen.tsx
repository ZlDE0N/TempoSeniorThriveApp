import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

export default function TransitionScreen() {
  const userName = localStorage.getItem("st_onboarding_name");
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
            style={{ width: "18%" }}
          ></div>
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
              <Link to="/onboarding/morning-routine">Share your story</Link>
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
