import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Vision() {
  return (
    <QuestionsCard
      title="Vision & Safety"
      subtitle="Let's ensure our recommendations match your needs"
      items={[
        {
          question: "How would you rate your vision?",
          subtitle:
            "Your vision quality affects how we design safety features and recommendations",
          type: "radio",
          key: "vision",
          icon: faEye,
          options: [
            "Excellent, I have no difficulty seeing",
            "Good, I have minor vision issues that are corrected with glasses or contacts",
            "Fair, I have noticeable vision problems that sometimes affect my daily activities",
            "Poor, my vision significantly impacts my daily life",
          ],
        },
      ]}
      nextSection="/onboarding/balance-history"
      backPath="/onboarding/mobility-aids"
      allowSkip={true}
      sectionIndex={12}
    />
  );
}
