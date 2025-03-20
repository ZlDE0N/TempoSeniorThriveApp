import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

export default function FriendsNeighbors() {
  return (
    <QuestionsCard
      title="Friends/Neighbors Interactions"
      items={[
        {
          question: "What about friends and neighbors?",
          type: "radio",
          key: "friendsNeighbors",
          icon: faPeopleGroup,
          options: [
            "See or talk to them often",
            "Regular casual interactions",
            "Occasional connections",
            "Rarely get together",
          ],
        },
      ]}
      nextSection="/onboarding/support-access"
      backPath="/onboarding/family-connections"
      allowSkip={true}
      sectionIndex={18}
    />
  );
}
