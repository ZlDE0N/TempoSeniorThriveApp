import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function WelcomeScreen() {
  return (
    <OnboardingLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Welcome Home to Your Independence
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your home: a confident space for your independence.
          </p>
        </div>

        {/* Main Image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-12 bg-white">
          <div className="aspect-w-16 aspect-h-9 relative">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80"
              alt="Senior enjoying home activities"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 right-6 bg-white bg-opacity-90 rounded-full p-3 shadow-md">
              <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                <span className="text-xl font-bold text-blue-600">78</span>
              </div>
            </div>
          </div>
        </div>

        {/* ThriveScore Introduction */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            Introducing Your ThriveScore™
          </h2>
          <p className="text-lg text-slate-600 text-center mb-8">
            Discover your ThriveScore™: a personalized guide to thriving at
            home. It's like having a friendly compass, showing you how to live
            your best independent life.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-medium text-slate-800 mb-2">
                Celebrating your daily strengths
              </h3>
              <p className="text-slate-600">
                Recognize the routines and habits that already support your
                independence.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-medium text-slate-800 mb-2">
                Understanding your home
              </h3>
              <p className="text-slate-600">
                See how your living space uniquely supports your well-being and
                confidence.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-medium text-slate-800 mb-2">
                Simple enhancements
              </h3>
              <p className="text-slate-600">
                Discover easy ways to boost your confidence and enjoyment at
                home.
              </p>
            </div>
          </div>

          <p className="text-center text-slate-600 mb-8">
            Let's explore easy steps to enhance your daily confidence.
          </p>

          <div className="flex justify-center">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link to="/onboarding/expectations">
                Start Your 7-Minute Discovery
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
