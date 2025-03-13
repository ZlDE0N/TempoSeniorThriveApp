import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";

export default function MorningEnergy() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Afternoon Energy"
      items={[
        {
          question: "By mid-day, you usually:",
          type: "radio",
          key: "afternoonEnergy",
          options: [
            "Still going strong with activities",
            "Manage what needs to be done",
            "Need to pace myself",
            "Find it challenging to do much",
          ],
        },
      ]}
      nextSection="/onboarding/evening-energy"
      allowSkip={true}
      progress={75}
    />
  );
}
