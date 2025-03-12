import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

export default function HealthContext() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, smooth: true });
  }, []);
  return (
    <OnboardingLayout showBackButton={true} backPath="/onboarding/vision">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: "75%" }}
          ></div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-slate-800 text-center mb-4">
            This helps us suggest appropriate activities
          </h1>
          <p className="text-center text-slate-600 mb-8">
            Your answers help us personalize recommendations for your comfort
            and confidence
          </p>

          <form className="space-y-8">
            {/* Health Considerations */}
            <div className="space-y-4">
              <Label className="text-lg">Health Considerations:</Label>
              <p className="text-sm text-slate-500">
                Multiple selection allowed
              </p>

              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="arthritis" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="arthritis" className="cursor-pointer">
                      Arthritis
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="heart" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="heart" className="cursor-pointer">
                      Heart condition
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="diabetes" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="diabetes" className="cursor-pointer">
                      Diabetes
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="breathing" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="breathing" className="cursor-pointer">
                      Breathing challenges
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="memory" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="memory" className="cursor-pointer">
                      Memory considerations
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="rather-not-say" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="rather-not-say" className="cursor-pointer">
                      Rather not say
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="none-health" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="none-health" className="cursor-pointer">
                      None of these
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                type="button"
                size="lg"
                className="w-full md:w-auto md:min-w-[200px] text-lg py-6"
                asChild
              >
                <Link to="/onboarding/transition">
                  Continue to Daily Living
                </Link>
              </Button>
            </div>
          </form>
        </div>

        {/* Skip option */}
        <div className="mt-4 text-center">
          <Link
            to="/onboarding/transition"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            I'd prefer to skip this step
          </Link>
        </div>
      </div>
    </OnboardingLayout>
  );
}
