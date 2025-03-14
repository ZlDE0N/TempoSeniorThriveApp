import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

export default function Activities() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Daily Activities"
      items={[
        {
          question: "How do you usually spend your afternoons?",
          type: "radio",
          key: "activities",
          icon: faCloudSun,
          options: [
            "Always finding things to do",
            "Mix of activities and rest",
            "Take it pretty easy",
            "Prefer to stay settled",
          ],
        },
      ]}
      nextSection="/onboarding/movement-and-stability"
      backPath="/onboarding/meals"
      allowSkip={true}
      progress={45}
    />
  );
}
