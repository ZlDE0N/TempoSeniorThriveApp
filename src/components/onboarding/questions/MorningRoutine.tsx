import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";

export default function MorningRoutine() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Morning Routine"
      items={[
        {
          question: "Tell us about your morning routine:",
          type: "radio",
          key: "routine",
          options: [
            "I've got my own rhythm down pat",
            "Most days, I handle things just fine",
            "Sometimes I could use a helping hand",
            "Mornings can be a bit overwhelming",
          ],
        },
      ]}
      nextSection="/onboarding/meals"
      allowSkip={true}
      progress={35}
    />
  );
}
