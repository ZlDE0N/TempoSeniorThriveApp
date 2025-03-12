import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

export default function MovementProfile() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <OnboardingLayout showBackButton={true} backPath="/onboarding/profile">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
          <div
            className="bg-st_light_blue h-2 rounded-full"
            style={{ width: "25%" }}
          ></div>
        </div>

        <div className="bg-white rounded-xl surrounding-shadow p-8">
          <h1 className="text-2xl font-bold text-st_black text-center mb-4">
            Understanding how you move through your day
          </h1>
          <p className="text-center text-slate-600 mb-8">
            This helps us provide relevant insights for your comfort and
            confidence
          </p>

          <form className="space-y-8">
            {/* Mobility Aids */}
            <div className="space-y-4">
              <Label className="text-lg">
                Do you currently use any mobility aids?
              </Label>
              <p className="text-sm text-slate-500">
                Multiple selection allowed
              </p>

              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="no-aids" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="no-aids" className="cursor-pointer">
                      No aids needed
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="sometimes-cane" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="sometimes-cane" className="cursor-pointer">
                      Sometimes use a cane
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="regularly-cane" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="regularly-cane" className="cursor-pointer">
                      Regularly use a cane
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="walker" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="walker" className="cursor-pointer">
                      Use a walker
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="wheelchair" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="wheelchair" className="cursor-pointer">
                      Use a wheelchair
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="other-support" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="other-support" className="cursor-pointer">
                      Other support
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Movement Considerations */}
            <div className="space-y-4">
              <Label className="text-lg">Any movement considerations?</Label>
              <p className="text-sm text-slate-500">
                Multiple selection allowed
              </p>

              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="balance" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="balance" className="cursor-pointer">
                      Balance awareness
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="joint" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="joint" className="cursor-pointer">
                      Joint stiffness
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="strength" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="strength" className="cursor-pointer">
                      Limited strength
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="coordination" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="coordination" className="cursor-pointer">
                      Coordination challenges
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="none-movement" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="none-movement" className="cursor-pointer">
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
                <Link to="/onboarding/vision">Next Step</Link>
              </Button>
            </div>
          </form>
        </div>

        {/* Skip option */}
        <div className="mt-4 text-center">
          <Link
            to="/onboarding/vision"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            I'd prefer to skip this step
          </Link>
        </div>
      </div>
    </OnboardingLayout>
  );
}
