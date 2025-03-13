import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";

export default function Name() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Personal Profile"
      subtitle="Let's personalize your assessment"
      items={[
        {
          question: "What name should we use?",
          type: "input",
          key: "name",
        },
      ]}
      nextSection="/onboarding/age"
      progress={0}
    />
  );
}
