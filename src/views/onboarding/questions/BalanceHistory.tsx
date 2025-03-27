import { Button } from "@/views/dashboard/ui/button";
import { Input } from "@/views/dashboard/ui/input";
import { Label } from "@/views/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/views/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";

export default function BalanceHistory() {
  return (
    <QuestionsCard
      title="Balance History"
      subtitle="Falls are more common than you think—let’s get a clear picture, no judgment"
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
          deductions: [
            1,3,5,7,
          ],
        },
      ]}
      nextSection="/onboarding/support-and-connections"
      backPath="/onboarding/vision"
      sectionIndex={11}
    />
  );
}
