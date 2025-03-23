import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";

export default function MovementConsiderations() {
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
          question: "Any movement considerations?",
          type: "checkbox",
          key: "movement",
          icon: faPersonWalking,
          options: [
            "Balance awareness",
            "Joint stiffness",
            "Limited strength",
            "Coordination challenges",
          ],
        },
      ]}
      nextSection="/onboarding/vision"
      backPath="/onboarding/mobility-aids"
      allowSkip={true}
      sectionIndex={3}
    />
  );
}
