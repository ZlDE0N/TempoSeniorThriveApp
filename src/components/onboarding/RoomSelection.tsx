import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleDot,
  faBath,
  faBed,
  faCouch,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OnboardingLayout from "./OnboardingLayout";

interface RoomOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  icon: any;
}

export default function RoomSelection() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const roomOptions: RoomOption[] = [
    {
      id: "bathroom",
      name: "Bathroom",
      description: "Starting and ending each day with confidence",
      imageUrl:
        "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&q=80",
      icon: faBath,
    },
    {
      id: "bedroom",
      name: "Bedroom",
      description: "Your personal space for rest and renewal",
      imageUrl:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
      icon: faBed,
    },
    {
      id: "livingroom",
      name: "Living Room",
      description: "Where daily life unfolds naturally",
      imageUrl:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80",
      icon: faCouch,
    },
  ];

  const handleContinue = () => {
    if (selectedRoom) {
      localStorage.setItem("st_onboarding_selected_room", selectedRoom);
      setIsExiting(true);
      setTimeout(() => {
        navigate(`/onboarding/room-assessment/${selectedRoom}`);
      }, 500);
    }
  };

  return (
    <OnboardingLayout
      showBackButton={true}
      backPath="/onboarding/support-access"
    >
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-8">
          <motion.div
            className="bg-st_light_blue h-2 rounded-full"
            initial={{ width: "60%" }}
            animate={{ width: "70%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isExiting ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl surrounding-shadow p-8"
        >
          <div className="flex justify-center mb-6">
            <FontAwesomeIcon
              icon={faHouse}
              className="text-4xl text-st_black"
            />
          </div>

          <h1 className="text-3xl font-bold text-st_black text-center mb-4">
            Choose a room where you spend much of your day
          </h1>

          <div className="mt-6 mb-8">
            <h3 className="text-lg font-medium text-slate-700 mb-3">
              Why This Matters:
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">•</span>
                <span>Small adjustments can make daily tasks easier</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">•</span>
                <span>Fresh eyes often spot simple improvements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-st_light_blue">•</span>
                <span>Your comfort and confidence start at home</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mt-8">
            {roomOptions.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "p-4 border-2 rounded-lg flex items-center gap-4 cursor-pointer transition-colors",
                  selectedRoom === room.id
                    ? "border-st_light_blue bg-blue-50"
                    : "border-slate-100 bg-gray-50",
                )}
                onClick={() => setSelectedRoom(room.id)}
              >
                <div className="flex-shrink-0">
                  <FontAwesomeIcon
                    icon={selectedRoom === room.id ? faCircleDot : faCircle}
                    className={cn(
                      "text-2xl text-st_black",
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={room.icon}
                      className={cn(
                        "text-lg text-st_black"
                      )}
                    />
                    <h3 className="font-medium text-slate-800">{room.name}</h3>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    "{room.description}"
                  </p>
                </div>
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 hidden md:block">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-slate-500 text-sm mt-6">
            There's no right or wrong choice - each room tells its own story!
          </div>

          <div className="pt-8 flex justify-center">
            <Button
              type="button"
              size="lg"
              onClick={handleContinue}
              className={cn(
                "shadow-md border-2 text-lg px-8 py-6 h-auto",
                selectedRoom
                  ? "hover:shadow-xl border-st_dark_blue hover:border-white bg-st_dark_blue hover:bg-st_light_blue"
                  : "pointer-events-none cursor-not-allowed opacity-50 border-st_dark_blue bg-st_dark_blue",
              )}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </div>
    </OnboardingLayout>
  );
}
