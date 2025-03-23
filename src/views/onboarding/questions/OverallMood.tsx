import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";

export default function OverallMood() {
  return (
    <QuestionsCard
      title="Connections"
      items={[
        {
          question:
            "How would you describe your overall mood in the past few weeks?",
          type: "radio",
          key: "overallMood",
          icon: faFaceSmileBeam,
          options: [
            "Generally positive and upbeat",
            "Mostly stable and content",
            "I have some ups and downs",
            "I've been feeling down or anxious",
          ],
        },
      ]}
      nextSection="/onboarding/social-satisfaction"
      backPath="/onboarding/meaningful-conversations"
      allowSkip={true}
      sectionIndex={21}
    />
  );
}
