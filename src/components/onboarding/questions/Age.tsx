import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

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
          icon: faPerson,
          options: [
            "60-69 years young",
            "70-79 years young",
            "80-89 years young",
            "90+ years young",
          ],
        },
      ]}
      nextSection="/onboarding/mobility-aids"
      backPath="/onboarding/name"
      allowSkip={true}
      progress={3}
    />
  );
}
