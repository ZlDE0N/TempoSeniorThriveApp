import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";

export default function EveningEnergy() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Evening Energy"
      items={[
        {
          question: "In the evenings, you tipically:",
          type: "radio",
          key: "eveningEnergy",
          icon: faCloudMoon,
          options: [
            "Enjoy activities and socializing",
            "Have energy for quiet activities",
            "Prefer to take it very easy",
            "Ready to wind down early",
          ],
        },
      ]}
      nextSection="/onboarding/support-and-connections"
      backPath="/onboarding/afternoon-energy"
      allowSkip={true}
      sectionIndex={16}
    />
  );
}
