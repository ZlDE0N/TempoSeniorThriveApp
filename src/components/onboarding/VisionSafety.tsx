import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function VisionSafety() {
  return (
    <OnboardingLayout showBackButton={true} backPath="/onboarding/movement">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: "11%" }}
          ></div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-slate-800 text-center mb-4">
            Let's ensure our recommendations match your needs
          </h1>
          <p className="text-center text-slate-600 mb-8">
            These questions help us suggest the most relevant safety
            enhancements
          </p>

          <form className="space-y-8">
            {/* Vision Profile */}
            <div className="space-y-4">
              <Label className="text-lg">Any vision considerations?</Label>
              <p className="text-sm text-slate-500">
                Multiple selection allowed
              </p>

              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="good-vision" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="good-vision" className="cursor-pointer">
                      General vision is good
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="lighting" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="lighting" className="cursor-pointer">
                      Need good lighting
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="depth" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="depth" className="cursor-pointer">
                      Depth perception challenges
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="peripheral" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="peripheral" className="cursor-pointer">
                      Limited peripheral vision
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="other-vision" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="other-vision" className="cursor-pointer">
                      Other vision considerations
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
                  <Checkbox id="none-vision" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="none-vision" className="cursor-pointer">
                      None of these
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Stability History */}
            <div className="space-y-4">
              <Label className="text-lg">
                Regarding stability in the past year:
              </Label>
              <RadioGroup defaultValue="no-falls">
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="no-falls" id="no-falls" />
                  <Label htmlFor="no-falls" className="cursor-pointer flex-1">
                    No falls or concerns
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="close-calls" id="close-calls" />
                  <Label
                    htmlFor="close-calls"
                    className="cursor-pointer flex-1"
                  >
                    Some close calls
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="one-fall" id="one-fall" />
                  <Label htmlFor="one-fall" className="cursor-pointer flex-1">
                    One fall
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-md hover:bg-slate-50">
                  <RadioGroupItem value="multiple-falls" id="multiple-falls" />
                  <Label
                    htmlFor="multiple-falls"
                    className="cursor-pointer flex-1"
                  >
                    Multiple falls
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
                <Link to="/onboarding/health">Next Step</Link>
              </Button>
            </div>
          </form>
        </div>

        {/* Skip option */}
        <div className="mt-4 text-center">
          <Link
            to="/onboarding/health"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            I'd prefer to skip this step
          </Link>
        </div>
      </div>
    </OnboardingLayout>
  );
}
