import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function PersonalCare() {
  return (
    <QuestionsCard
      title="Personal Care"
      items={[
        {
          question:
            "How satisfied are you with how you manage your personal care?",
          type: "radio",
          key: "personalCare",
          icon: faUser,
          options: [
            "Very satisfied, I manage everything myself with ease",
            "Satisfied, I manage most things well",
            "I manage, but sometimes need assistance",
            "I find personal care challenging",
          ],
        },
      ]}
      nextSection="/onboarding/movement-and-stability"
      backPath="/onboarding/daily-routines"
      allowSkip={true}
      sectionIndex={8}
    />
  );
}

