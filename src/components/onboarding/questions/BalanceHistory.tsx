import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";

export default function BalanceHistory() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Balance History"
      items={[
        {
          question:
            "In the past few months, have you had any slips or stumbles?",
          type: "radio",
          key: "balanceHistory",
          icon: faPersonFalling,
          options: [
            "Steady as a rock",
            "Maybe a close call or two",
            "Had a minor slip",
            "Had a few concerns",
          ],
        },
      ]}
      nextSection="/onboarding/energy-and-engagement"
      backPath="/onboarding/chair-transfer"
      conditionalNextSection="/onboarding/balance-followup"
      condition={(answer) => {
        return answer["balanceHistory"] !== "Steady as a rock";
      }}
      allowSkip={true}
      sectionIndex={12}
    />
  );
}
