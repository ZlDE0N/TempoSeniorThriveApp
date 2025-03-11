import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function ExpectationScreen() {
  return (
    <OnboardingLayout showBackButton={true} backPath="/onboarding">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
          Your Personalized Independence Journey
        </h1>

        {/* Journey Path Visualization */}
        <div className="relative py-10 mb-12">
          {/* Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex items-center mb-16">
            <div className="w-1/2 pr-8 text-right">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Quick Profile (2 min)
              </h3>
              <p className="text-slate-600 mb-2">
                Simple questions to understand your unique needs
              </p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• Basic information</li>
                <li>• Movement patterns</li>
                <li>• Vision & health considerations</li>
              </ul>
            </div>
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="w-1/2 pl-8"></div>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex items-center mb-16">
            <div className="w-1/2 pr-8"></div>
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
            <div className="w-1/2 pl-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Daily Living (3 min)
              </h3>
              <p className="text-slate-600 mb-2">
                Understanding your natural rhythms
              </p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• Morning routines</li>
                <li>• Activity patterns</li>
                <li>• Energy levels</li>
                <li>• Social connections</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex items-center mb-16">
            <div className="w-1/2 pr-8 text-right">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Room Review (2 min)
              </h3>
              <p className="text-slate-600 mb-2">A fresh look at your space</p>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• Choose a key room</li>
                <li>• Quick photo or upload</li>
                <li>• Spot simple opportunities</li>
              </ul>
            </div>
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div className="w-1/2 pl-8"></div>
          </div>

          {/* Result */}
          <div className="relative z-10 flex items-center">
            <div className="w-1/2 pr-8"></div>
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center border-4 border-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="w-1/2 pl-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Your Result: Personal ThriveScore™
              </h3>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• Safety enhancement opportunities</li>
                <li>• Independence-boosting recommendations</li>
                <li>• Practical confidence builders</li>
                <li>• Room-specific insights</li>
                <li className="text-xs italic">* Private and secure</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Preview */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <h3 className="font-semibold text-slate-700 mb-4 text-center">
            Your Journey
          </h3>
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                1
              </div>
              <span className="text-sm mt-2">Profile</span>
            </div>
            <div className="flex-1 h-1 bg-blue-100"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-medium">
                2
              </div>
              <span className="text-sm mt-2">Living</span>
            </div>
            <div className="flex-1 h-1 bg-blue-100"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-medium">
                3
              </div>
              <span className="text-sm mt-2">Room</span>
            </div>
            <div className="flex-1 h-1 bg-blue-100"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-medium">
                4
              </div>
              <span className="text-sm mt-2">Score</span>
            </div>
          </div>
        </div>

        {/* Action Trigger */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6 text-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Thousands have discovered new insights through their ThriveScore™.
            <br />
            Ready to see yours?
          </h3>
          <p className="text-slate-600 mb-8">
            Join the community of confident living
            <br />
            No medical terms. No judgments. Just real insights.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto mb-4" asChild>
            <Link to="/onboarding/process">Let's Begin Your Journey</Link>
          </Button>
          <p className="text-sm text-slate-500">
            Just 7 minutes to more confidence at home
          </p>
        </div>

        {/* Privacy Promise */}
        <div className="text-center">
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            <strong>Your Privacy Matters:</strong>
            <br />
            Everything you share, from answers to photos,
            <br />
            stays private and secure. You control your journey.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
