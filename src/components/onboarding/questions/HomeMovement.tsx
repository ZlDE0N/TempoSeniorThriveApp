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
      subtitle="Your confidence in moving affects your daily activities"
      items={[
        {
          question: "How do you feel moving around your home?",
          type: "radio",
          key: "homeMovement",
          icon: faHouseUser,
          options: [
            "Completely confident and at ease.",
            "Mostly comfortable, I move without much worry.",
            "I move carefully and take my time.",
            "I need to be very careful and feel unsteady.",
          ],
        },
      ]}
      nextSection="/onboarding/chair-transfer"
      backPath="/onboarding/personal-care"
      allowSkip={true}
      sectionIndex={9}
    />
  );
}
