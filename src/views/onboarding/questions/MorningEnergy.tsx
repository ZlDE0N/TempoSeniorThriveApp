import { Button } from "@/views/dashboard/ui/button";
import { Input } from "@/views/dashboard/ui/input";
import { Label } from "@/views/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/views/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function MorningEnergy() {
  return (
    <QuestionsCard
      title="Morning Energy"
      items={[
        {
          question:
            "How would you describe your energy levels when you wake up in the morning?",
          type: "radio",
          key: "morningEnergy",
          icon: faSun,
          options: [
            "I feel refreshed and ready to go",
            "It takes me a little while to get going, but then I'm fine",
            "My morning energy depends on how well I slept",
            "Mornings are usually difficult for me",
          ],
        },
      ]}
      nextSection="/onboarding/meals"
      backPath="/onboarding/health"
      allowSkip={true}
      sectionIndex={4}
    />
  );
}
