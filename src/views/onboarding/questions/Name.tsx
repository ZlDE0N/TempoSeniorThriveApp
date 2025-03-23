import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Name() {
  return (
    <QuestionsCard
      title="Personal Profile"
      subtitle="Let's personalize your journey"
      items={[
        {
          question: "What is your first name?",
          type: "input",
          key: "name",
          icon: faUser,
        },
      ]}
      nextSection="/onboarding/age"
      backPath="/onboarding/process"
      sectionIndex={0}
    />
  );
}
