import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function PersonalProfile() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <OnboardingLayout showBackButton={true} backPath="/onboarding/process">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
          <div
            className="bg-st_light_blue h-2 rounded-full"
            style={{ width: `${0}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-xl surrounding-shadow p-8">
          <h1 className="text-2xl font-bold text-st_black text-center mb-8">
            Let's personalize your assessment
          </h1>

          <form className="space-y-8">
            {/* Name Input */}
            <div className="space-y-3">
              <Label htmlFor="name" className="text-lg">
                What name should we use?
              </Label>
              <Input
                id="name"
                placeholder="Your preferred name"
                className="text-lg py-6"
              />
            </div>

            {/* Age Range */}
            <div className="space-y-3">
              <Label className="text-lg">Which age range describes you?</Label>
              <RadioGroup defaultValue="60-69">
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="60-69" id="age-60-69" />
                  <Label htmlFor="age-60-69" className="cursor-pointer flex-1">
                    60-69 years young
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="70-79" id="age-70-79" />
                  <Label htmlFor="age-70-79" className="cursor-pointer flex-1">
                    70-79 years young
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="80-89" id="age-80-89" />
                  <Label htmlFor="age-80-89" className="cursor-pointer flex-1">
                    80-89 years young
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="90+" id="age-90+" />
                  <Label htmlFor="age-90+" className="cursor-pointer flex-1">
                    90+ years young
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                type="button"
                size="lg"
                className="w-full md:w-auto md:min-w-[200px] text-lg py-6"
                asChild
              >
                <Link to="/onboarding/movement">Next Step</Link>
              </Button>
            </div>
          </form>
        </div>

        {/* Skip option */}
        <div className="mt-4 text-center">
          <Link
            to="/onboarding/movement"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            I'd prefer to skip this step
          </Link>
        </div>
      </div>
    </OnboardingLayout>
  );
}
