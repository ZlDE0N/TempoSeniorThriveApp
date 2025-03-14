import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons";

export default function HomeMovement() {
  return (
    <QuestionsCard
      title="Home Movement"
      items={[
        {
          question: "How do you feel moving around your home?",
          type: "radio",
          key: "homeMovement",
          icon: faHouseUser,
          options: [
            "Like a fish in water -  totally at ease",
            "Pretty comfortable in my space",
            "Take it slow and steady",
            "Need to be extra careful",
          ],
        },
      ]}
      nextSection="/onboarding/chair-transfer"
      backPath="/onboarding/activities"
      allowSkip={true}
      progress={30}
    />
  );
}
