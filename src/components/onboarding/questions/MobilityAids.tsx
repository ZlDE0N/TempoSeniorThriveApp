import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";

export default function MobilityAids() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Movement Profile"
      subtitle="Understanding how you move through your day helps us provide relevant insights"
      items={[
        {
          question: "Do you currently use any mobility aids?",
          type: "radio",
          key: "mobility",
          icon: faWheelchair,
          options: [
            "No aids needed",
            "Sometimes use a cane",
            "Regularly use a cane",
            "Use a walker",
            "Use a wheelchair",
            "Other support",
          ],
        },
      ]}
      nextSection="/onboarding/movement-considerations"
      backPath="/onboarding/age"
      allowSkip={true}
      sectionIndex={2}
    />
  );
}
