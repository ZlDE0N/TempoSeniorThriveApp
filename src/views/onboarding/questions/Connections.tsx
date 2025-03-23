import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

export default function Connections() {
  return (
    <QuestionsCard
      title="Connections"
      items={[
        {
          question:
            "How often do you feel connected to friends, family, or your community?",
          type: "radio",
          key: "connections",
          icon: faPeopleGroup,
          options: [
            "Very often, I feel deeply connected",
            "Quite often, I have regular contact",
            "Sometimes, but I wish it were more",
            "Rarely, I often feel isolated",
          ],
        },
      ]}
      nextSection="/onboarding/room-assessment"
      backPath="/onboarding/support-access"
      allowSkip={true}
      sectionIndex={12}
    />
  );
}
