import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

export default function MorningEnergy() {
  return (
    <QuestionsCard
      title="Afternoon Energy"
      items={[
        {
          question: "By mid-day, you usually:",
          type: "radio",
          key: "afternoonEnergy",
          icon: faCloudSun,
          options: [
            "Still going strong with activities",
            "Manage what needs to be done",
            "Need to pace myself",
            "Find it challenging to do much",
          ],
        },
      ]}
      nextSection="/onboarding/evening-energy"
      backPath="/onboarding/morning-energy"
      allowSkip={true}
      sectionIndex={15}
    />
  );
}
