import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";

export default function Age() {
  return (
    <QuestionsCard
      title="Personal Profile"
      subtitle="Let's personalize your assessment"
      items={[
        {
          question: "Which age range describes you?",
          type: "radio",
          key: "age",
          options: [
            "60-69 years young",
            "70-79 years young",
            "80-89 years young",
            "90+ years young",
          ],
        },
      ]}
      nextSection="/onboarding/mobility-aids"
      allowSkip={true}
      progress={5}
    />
  );
}
