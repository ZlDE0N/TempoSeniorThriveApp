import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";

export default function BalanceFollowup() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Balance Follow-up"
      items={[
        {
          question: "Where did your last balance concern happen?",
          type: "radio",
          key: "balanceFollowup",
          icon: faPersonFalling,
          options: [
            "Inside while moving around",
            "Getting up or sitting down",
            "Outside on my property",
            "In the community",
          ],
        },
      ]}
      nextSection="/onboarding/energy-and-engagement"
      backPath="/onboarding/balance-history"
      allowSkip={true}
      progress={65}
    />
  );
}
