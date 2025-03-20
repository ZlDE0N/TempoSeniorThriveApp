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
            "Enjoy calm activities",
            "Prefer to rest and relax",
            "Ready to wind down early",
          ],
        },
      ]}
      nextSection="/onboarding/support-and-connections"
      backPath="/onboarding/afternoon-energy"
      allowSkip={true}
      sectionIndex={18}
    />
  );
}
