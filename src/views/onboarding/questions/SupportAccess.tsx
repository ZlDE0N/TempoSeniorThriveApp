import { Button } from "@/views/dashboard/ui/button";
import { Input } from "@/views/dashboard/ui/input";
import { Label } from "@/views/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/views/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faPeopleCarryBox } from "@fortawesome/free-solid-svg-icons";

export default function SupportAccess() {
  return (
    <QuestionsCard
      title="Support Access"
      items={[
        {
          question: "If you needed help with something, you would:",
          type: "radio",
          key: "supportAccess",
          icon: faPeopleCarryBox,
          options: [
            "Have several people to call",
            "Know at least one person to ask",
            "Try to manage on my own",
            "Not be sure who to ask",
          ],
        },
      ]}
      nextSection="/onboarding/room-assessment"
      backPath="/onboarding/social-satisfaction"
      buttonLabel="Done"
      allowSkip={true}
      sectionIndex={23}
    />
  );
}
