import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";

export default function Health() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Health Context"
      subtitle="This helps us suggest appropriate activities"
      items={[
        {
          question: "Any health considerations?",
          type: "checkbox",
          key: "Vision",
          options: [
            "Arthritis",
            "Heart condition",
            "Diabetes",
            "Breathing challenges",
            "Memory considerations",
          ],
        },
      ]}
      nextSection="/onboarding/daily-living"
      buttonLabel="Continue to Daily Living"
      allowSkip={true}
      progress={30}
    />
  );
}
