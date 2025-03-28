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
      subtitle="Relationships can lift us up—let’s see how connected you feel right now"
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
          deductions: [
            1,3,5,7,
          ],
        },
      ]}
      nextSection="/onboarding/celebration"
      backPath="/onboarding/support-access"
      allowSkip={true}
      sectionIndex={13}
    />
  );
}
