import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";

export default function BalanceHistory() {
  return (
    <QuestionsCard
      title="Balance History"
      items={[
        {
          question:
            "In the past three months, how often have you experienced a slip, stumble, or fall?",
          type: "radio",
          key: "balanceHistory",
          icon: faPersonFalling,
          options: [
            "I haven't had any slips or falls",
            "I've had one or two close calls, but no falls",
            "I've had a minor slip or stumble",
            "I've had a fall or multiple concerning stumbles",
          ],
        },
      ]}
      nextSection="/onboarding/energy-and-engagement"
      backPath="/onboarding/vision"
      conditionalNextSection="/onboarding/balance-followup"
      condition={(answer) => {
        return (
          answer["balanceHistory"] === "I've had a minor slip or stumble" ||
            answer["balanceHistory"] ===
            "I've had a fall or multiple concerning stumbles"
        );
      }}
      sectionIndex={13}
    />
  );
}
