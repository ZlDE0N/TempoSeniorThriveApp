import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function MorningEnergy() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Morning Energy"
      items={[
        {
          question: "What's your typical energy like in the morning?",
          type: "radio",
          key: "morningEnergy",
          icon: faSun,
          options: [
            "Ready to tackle the day!",
            "Takes a bit to get going, then I'm good",
            "Depends on how well I slept",
            "Mornings can be tough",
          ],
        },
      ]}
      nextSection="/onboarding/afternoon-energy"
      backPath="/onboarding/balance-history"
      allowSkip={true}
      progress={42}
    />
  );
}
