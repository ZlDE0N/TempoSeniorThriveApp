import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

export default function Health() {
  return (
    <QuestionsCard
      title="Personal Profile"
      subtitle="Let's get to know you better"
      items={[
        {
          question: "How would you rate your general health?",
          type: "radio",
          key: "health",
          icon: faHeartPulse,
          options: [
            "Excellent",
            "Good",
            "Fair",
            "Poor",
          ],
        },
      ]}
      nextSection="/onboarding/daily-living"
      backPath="/onboarding/living-situation"
      allowSkip={true}
      sectionIndex={3}
    />
  );
}
