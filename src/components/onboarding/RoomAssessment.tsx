import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faCouch,
  faCamera,
  faUpload,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import OnboardingLayout from "./OnboardingLayout";

export default function RoomAssessment() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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

  const getRoomIcon = () => {
    switch (roomId) {
      case "bathroom":
        return faBath;
      case "bedroom":
        return faBed;
      case "livingroom":
        return faCouch;
      default:
        return faCouch;
    }
  };

  const getRoomImage = () => {
    switch (roomId) {
      case "bathroom":
        return "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl surrounding-shadow p-8"
        >
          <div className="flex justify-center mb-6">
            <FontAwesomeIcon
              icon={getRoomIcon()}
              className="text-4xl text-st_black"
            />
          </div>

          <h1 className="text-3xl font-bold text-st_black text-center mb-6">
            {getRoomTitle()}
          </h1>

          <div className="rounded-lg overflow-hidden mb-6 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faClock}
                  spin
                  className="text-2xl text-st_light_blue"
                />
              </div>
            )}
            <motion.img
              src={getRoomImage()}
              alt={`${roomId} visualization`}
              className="w-full h-64 object-cover"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onLoad={() => setIsLoading(false)}
            />
          </div>

          <p className="text-xl text-center text-slate-700 mb-8">
            {getRoomMessage()}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button className="shadow-md hover:shadow-xl border-2 border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue text-white px-6 py-4 rounded-md flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faCamera} className="text-lg" />
              Take Photo
            </Button>
            <Button
              variant="outline"
              className="shadow-md hover:shadow-lg border-2 border-st_light_blue text-st_light_blue hover:bg-blue-50 px-6 py-4 rounded-md flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faUpload} className="text-lg" />
              Upload Image
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Button
              variant="link"
              className="text-slate-500 hover:text-slate-700"
              asChild
            >
              <Link to="/onboarding/transition">I'll do this later</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </OnboardingLayout>
  );
}
