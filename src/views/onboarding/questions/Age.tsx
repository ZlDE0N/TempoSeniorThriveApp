import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

export default function Age() {
  return (
    <QuestionsCard
      title="Personal Profile"
      subtitle="Let's get to know you better"
      items={[
        {
          question: "What is your age range?",
          subtitle:
            "This helps us tailor our recommendations to your life stage",
          type: "radio",
          key: "age",
          icon: faPerson,
          options: [
            "50-59 years young",
            "60-69 years young",
            "70-79 years young",
            "80-89 years young",
            "90+ years young",
          ],
        },
      ]}
      nextSection="/onboarding/living-situation"
      backPath="/onboarding/name"
      allowSkip={true}
      sectionIndex={1}
    />
  );
}
