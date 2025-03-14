import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OnboardingLayout from "./OnboardingLayout";

export default function TransitionScreen() {
  const allLocalStorageData = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      allLocalStorageData[key] = localStorage.getItem(key);
    }
  }

  console.log(allLocalStorageData);
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
            style={{ width: "100%" }}
          ></div>
        </div>

        <div className="bg-white rounded-xl surrounding-shadow p-12">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-st_light_blue"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-st_black mb-6">
            Thank you, {userName}!
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            You just completed the first step to thrive at home.
          </p>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="text-lg bg-gray-50 surrounding-shadow hover:bg-gray-200 text-st_black px-8 py-6 h-auto"
              asChild
            >
              <Link to="/dashboard">
                See my&nbsp;<span className="text-st_light_orange">Thrive</span>
                <span className="text-st_light_blue">Score™&nbsp;&nbsp;</span>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-xl"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
