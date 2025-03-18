import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

export default function Health() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          icon: faHeartPulse,
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
      backPath="/onboarding/health"
      buttonLabel="Continue to Daily Living"
      allowSkip={true}
      sectionIndex={6}
    />
  );
}
