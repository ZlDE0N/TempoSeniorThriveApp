import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

export default function DailyRoutines() {
  return (
    <QuestionsCard
      title="Daily Routines"
      items={[
        {
          question:
            "How consistent are your daily routines? Do you find it easy to stick to a regular schedule?",
          type: "radio",
          key: "dailyRoutines",
          icon: faCloudSun,
          options: [
            "Very consistent, I thrive on routine",
            "I generally maintain a good routine",
            "My routines vary somewhat",
            "I struggle to maintain a consistent routine",
          ],
        },
      ]}
      nextSection="/onboarding/personal-care"
      backPath="/onboarding/everyday-tasks"
      allowSkip={true}
      sectionIndex={7}
    />
  );
}

