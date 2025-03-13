import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";

export default function HomeMovement() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Home Movement"
      items={[
        {
          question: "How do you feel moving around your home?",
          type: "radio",
          key: "homeMovement",
          options: [
            "Like a fish in water -  totally at ease",
            "Pretty comfortable in my space",
            "Take it slow and steady",
            "Need to be extra careful",
          ],
        },
      ]}
      nextSection="/onboarding/chair-transfer"
      allowSkip={true}
      progress={50}
    />
  );
}
