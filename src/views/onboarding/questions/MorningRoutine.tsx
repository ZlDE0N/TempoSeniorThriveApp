import { Button } from "@/views/dashboard/ui/button";
import { Input } from "@/views/dashboard/ui/input";
import { Label } from "@/views/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/views/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function MorningRoutine() {
  return (
    <QuestionsCard
      title="Morning Habits"
      items={[
        {
          question:
            "Think about your typical mornings. How smoothly do things usually go?",
          type: "radio",
          key: "morningRoutine",
          icon: faSun,
          options: [
            "Everything flows really well",
            "Most morning are manageable",
            "I sometimes need a little help",
            "Mornings can be challenging",
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
