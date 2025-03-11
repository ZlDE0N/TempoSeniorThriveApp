import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function ProcessExplanation() {
  return (
    <OnboardingLayout showBackButton={true} backPath="/onboarding/expectations">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-6">
          Your Journey to Confidence Starts Here
        </h1>

        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          In the next few minutes, we'll have a relaxed checkin about your day –
          <br />
          the simple things that matter most for thriving at home.
        </p>

        {/* Process Explanation */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Here's how our friendly checkin works:
          </h2>

          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-medium text-slate-800">
                  Quick Profile (2 min)
                </h3>
                <p className="text-slate-600">
                  Basic information to personalize your assessment
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-medium text-slate-800">
                  Daily Living (3 min)
                </h3>
                <ul className="text-slate-600 space-y-1">
                  <li>• Morning routines</li>
                  <li>• Movement patterns</li>
                  <li>• Energy levels</li>
                  <li>• Social connections</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-medium text-slate-800">
                  Room Review (2 min)
                </h3>
                <p className="text-slate-600">
                  A simple photo helps spot opportunities for confidence
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-medium text-slate-800">
                  Your result: A personalized ThriveScore™ with practical
                  recommendations
                </h3>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link to="/onboarding/profile">Let's Begin</Link>
            </Button>
          </div>
        </div>

        {/* Experience Description */}
        <div className="bg-blue-50 rounded-xl p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">
            You'll Love How Easy This Is:
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">✦</div>
              <p className="text-slate-700">Just like chatting with a friend</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">✦</div>
              <p className="text-slate-700">Answer at your own pace</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">✦</div>
              <p className="text-slate-700">No medical knowledge needed</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-blue-600 text-xl">✦</div>
              <p className="text-slate-700">Skip any question you prefer</p>
            </div>
          </div>
        </div>

        {/* Privacy Promise */}
        <div className="text-center mb-12">
          <h3 className="font-semibold text-slate-800 mb-2">
            Your Story, Your Privacy:
          </h3>
          <p className="text-slate-600 max-w-md mx-auto">
            Everything you share stays private and secure.
            <br />
            We're here to listen, not judge.
          </p>
        </div>

        {/* Ready to Begin */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">
            Ready for a friendly chat about thriving at home?
          </h3>
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto bg-green-600 hover:bg-green-700"
            asChild
          >
            <Link to="/onboarding/profile">
              Start Step 1: Create Personal Profile
            </Link>
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
}
