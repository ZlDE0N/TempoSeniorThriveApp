import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function SleepHours() {
  return (
    <QuestionsCard
      title="Sleep Hours"
      items={[
        {
          question:
            "How many hours of sleep do you typically get each night?",
          type: "radio",
          key: "sleepHours",
          icon: faClock,
          options: [
            "7-9 hours",
            "6 hours",
            "5 hours",
            "4 hours or less",
          ],
        },
      ]}
      nextSection="/onboarding/mobility-and-stability"
      backPath="/onboarding/everyday-tasks"
      allowSkip={true}
      sectionIndex={6}
    />
  );
}
