import { Button } from "@/views/dashboard/ui/button";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import  Gauge from "../dashboard/ui/gauge";
import { Link } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OnboardingLayout from "../../components/onboarding/OnboardingLayout";

export default function WelcomeScreen() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // For main image skeleton
  const [isLoading, setIsLoading] = useState(true);
  return (
    <OnboardingLayout>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="container mx-auto px-4 py-12 max-w-4xl text_st_black">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome Home to Your Independence
          </h1>
          <p className="text-lg text-st_black max-w-2xl mx-auto">
            Your home: a confident space for your independence.
          </p>
        </div>

        {/* Main Image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-12 bg-white">
          <div className="aspect-w-16 aspect-h-9 relative">
            <div className="w-full h-full">
              {/* Image Skeleton */}
              {isLoading && (
                <div className="absolute top-0 flex items-center justify-center left-0 h-full w-full bg-gray-200">
                  <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-st_light_blue"/>
                </div>
              )}
              <img
                src="https://images.unsplash.com/photo-1567067974934-75a3e4534c14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Senior enjoying home activities"
                className="w-full h-full object-cover"
                onLoad={() => {setIsLoading(false)}}
              />
            </div>
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 rounded-md bg-white bg-opacity-50 shadow-md">
              <div className="p-2 rounded-md flex flex-col gap-2 items-center justify-center">
                <div className="text-md bg-white rounded-sm p-2 md:text-xl text-st_black font-bold">
                  <span className="text-st_light_orange">Thrive</span><span className="text-st_light_blue">Score™</span>
                </div>
                <div className="px-4 flex rounded-md border-b-0 border-white items-center justify-center">
                  <Gauge label="" value={78}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ThriveScore Introduction */}
        <div className="bg-white rounded-xl surrounding-shadow p-8 mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
            Introducing Your <span className="text-st_light_orange">Thrive</span><span className="text-st_light_blue">Score™</span>
          </h2>
          <p className="text-lg text-st_black text-center mb-8">
            Discover your ThriveScore™: a personalized guide to thriving at
            home. It's like having a friendly compass, showing you how to live
            your best independent life.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="transition duration-100 hover:-translate-y-2 hover:scale-[1.05] bg-blue-50 border-l-4 border-blue-200 p-6 rounded-lg">
              <h3 className="font-medium text-slate-800 mb-2">
                Celebrating your daily strengths
              </h3>
              <p className="text-st_black">
                Recognize the routines and habits that already support your
                independence.
              </p>
            </div>
            <div className="transition duration-100 hover:-translate-y-2 hover:scale-[1.05] bg-green-50 border-l-4 border-green-200 p-6 rounded-lg">
              <h3 className="font-medium text-slate-800 mb-2">
                Understanding your home
              </h3>
              <p className="text-st_black">
                See how your living space uniquely supports your well-being and
                confidence.
              </p>
            </div>
            <div className="transition duration-100 hover:-translate-y-2 hover:scale-[1.05] bg-amber-50 border-l-4 border-amber-200 p-6 rounded-lg">
              <h3 className="font-medium text-slate-800 mb-2">
                Simple enhancements
              </h3>
              <p className="text-st_black">
                Discover easy ways to boost your confidence and enjoyment at
                home.
              </p>
            </div>
          </div>
          <p className="text-center text-st_black mb-8">
            Let's explore easy steps to enhance your daily confidence.
          </p>

          <div className="flex justify-center">
            <Button size="md" 
              className="shadow-md hover:shadow-xl border-2 border-st_dark_blue hover:border-white text-lg bg-st_dark_blue hover:bg-st_light_blue px-8 py-6 h-auto" asChild>
              <Link to="/onboarding/name">
                Start Your 7-Minute Discovery
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
}
