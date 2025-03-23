import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export default function SocialSatisfaction() {
  return (
    <QuestionsCard
      title="Social Satisfaction"
      items={[
        {
          question:
            "How satisfied are you with your social life?",
          type: "radio",
          key: "socialSatisfaction",
          icon: faThumbsUp,
          options: [
            "Very satisfied, I have a fulfilling social life",
            "Mostly satisfied, I have some good connections",
            "Somewhat satisfied, but I'd like more interaction",
            "Not satisfied, I feel lonely or disconnected",
          ],
        },
      ]}
      nextSection="/onboarding/support-access"
      backPath="/onboarding/overall-mood"
      allowSkip={true}
      sectionIndex={22}
    />
  );
}
