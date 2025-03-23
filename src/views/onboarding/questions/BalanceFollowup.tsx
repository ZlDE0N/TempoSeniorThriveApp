import { Button } from "@/views/dashboard/ui/button";
import { Input } from "@/views/dashboard/ui/input";
import { Label } from "@/views/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/views/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";

export default function BalanceFollowup() {
  return (
    <QuestionsCard
      title="Balance Follow-up"
      subtitle="This helps us understand where you might need additional support"
      items={[
        {
          question: "Where did this slip or fall occur?",
          subtitle:
            "Identifying fall locations helps us recommend specific safety measures",
          type: "radio",
          key: "balanceFollowup",
          icon: faPersonFalling,
          options: [
            "Inside my home while walking",
            "While getting up or sitting down",
            "Outside on my property",
            "In a public space or the community",
          ],
        },
      ]}
      nextSection="/onboarding/energy-and-engagement"
      backPath="/onboarding/balance-history"
      allowSkip={true}
      sectionIndex={14}
    />
  );
}
