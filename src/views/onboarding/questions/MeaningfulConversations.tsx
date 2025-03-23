import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faComments } from "@fortawesome/free-solid-svg-icons";

export default function MeaningfulConversations() {
  return (
    <QuestionsCard
      title="Meaningful Conversations"
      items={[
        {
          question:
            "How often do you have meaningful conversations with others?",
          type: "radio",
          key: "meaningfulConversations",
          icon: faComments,
          options: [
            "Almost daily, I have many meaningful talks",
            "Several times a week",
            "Occasionally, but not as often as I'd like",
            "Rarely, I find it hard to connect",
          ],
        },
      ]}
      nextSection="/onboarding/overall-mood"
      backPath="/onboarding/connections"
      allowSkip={true}
      sectionIndex={20}
    />
  );
}
