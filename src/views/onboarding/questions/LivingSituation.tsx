import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function LivingSituation() {
  return (
    <QuestionsCard
      title="Personal Profile"
      subtitle="Let's get to know you better"
      items={[
        {
          question: "Which option best describes your living situation?",
          type: "radio",
          key: "livingSituation",
          icon: faHouse,
          options: [
            "Living alone",
            "Living with a spouse/partner",
            "Living with family members",
            "Living in a senior community",
            "Other",
          ],
        },
      ]}
      nextSection="/onboarding/health"
      backPath="/onboarding/age"
      allowSkip={true}
      sectionIndex={1}
    />
  );
}
