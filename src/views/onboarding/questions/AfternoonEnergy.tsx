import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

export default function AfternoonEnergy() {
  return (
    <QuestionsCard
      title="Afternoon Energy"
      items={[
        {
          question: "By mid-day, how do you typically feel?",
          type: "radio",
          key: "afternoonEnergy",
          icon: faCloudSun,
          options: [
            "I'm still energetic and engaged in activities",
            "I can manage my tasks, but I might need a short break",
            "I need to pace myself and take frequent breaks",
            "I find it challenging to do much by mid-day",
          ],
        },
      ]}
      nextSection="/onboarding/evening-energy"
      backPath="/onboarding/sleep-hours"
      allowSkip={true}
      sectionIndex={17}
    />
  );
}
