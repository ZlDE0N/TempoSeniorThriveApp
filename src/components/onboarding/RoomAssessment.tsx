import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";

export default function RoomAssessment() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Redirect if no room is selected
  useEffect(() => {
    if (!roomId) {
      navigate("/onboarding/room-selection");
    }
  }, [roomId, navigate]);

  const getRoomMessage = () => {
    switch (roomId) {
      case "bathroom":
        return "Great pick! The bathroom is key to daily confidence, and small changes here can make a big difference.";
      case "bedroom":
        return "Perfect! Your bedroom should be a haven of comfort, let's make sure it supports your daily rhythm.";
      case "livingroom":
        return "Wonderful choice! The living room is where life happens, let's make sure it works perfectly for you.";
      default:
        return "Excellent choice! Let's look at how this room can better support your daily activities.";
    }
  };

  const getRoomTitle = () => {
    switch (roomId) {
      case "bathroom":
        return "Bathroom Assessment";
      case "bedroom":
        return "Bedroom Assessment";
      case "livingroom":
        return "Living Room Assessment";
      default:
        return "Room Assessment";
    }
  };

  const getRoomImage = () => {
    switch (roomId) {
      case "bathroom":
        return "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=80";
      case "bedroom":
        return "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80";
      case "livingroom":
        return "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80";
      default:
        return "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80";
    }
  };

  return (
    <OnboardingLayout
      showBackButton={true}
      backPath="/onboarding/room-selection"
    >
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
          <div
            className="bg-st_light_blue h-2 rounded-full"
            style={{ width: "95%" }}
          ></div>
        </div>

        <div className="bg-white rounded-xl surrounding-shadow p-8">
          <h1 className="text-3xl font-bold text-st_black text-center mb-6">
            {getRoomTitle()}
          </h1>

          <div className="rounded-lg overflow-hidden mb-6">
            <img
              src={getRoomImage()}
              alt={`${roomId} visualization`}
              className="w-full h-64 object-cover"
            />
          </div>

          <p className="text-xl text-center text-slate-700 mb-8">
            {getRoomMessage()}
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
            <h3 className="font-medium text-slate-800 mb-3">
              What happens next:
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">1.</span>
                <span>Take a photo or upload an image of your {roomId}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">2.</span>
                <span>
                  Our AI will analyze the space for safety and convenience
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">3.</span>
                <span>
                  You'll receive personalized recommendations for simple
                  improvements
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-st_light_blue hover:bg-st_dark_blue text-white px-6 py-2 rounded-md flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              Take Photo
            </Button>
            <Button
              variant="outline"
              className="border-st_light_blue text-st_light_blue hover:bg-blue-50 px-6 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Image
            </Button>
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="link"
              className="text-slate-500 hover:text-slate-700"
              asChild
            >
              <Link to="/onboarding/transition">I'll do this later</Link>
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
}
