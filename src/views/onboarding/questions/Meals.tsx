import { Button } from "@/views/dashboard/ui/button";
import { Input } from "@/views/dashboard/ui/input";
import { Label } from "@/views/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/views/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function Meals() {
  return (
    <QuestionsCard
      title="Your Meals"
      items={[
        {
          question: "When it comes to meals, how comfortable are you with preparing or managing them?",
          type: "radio",
          key: "meals",
          icon: faUtensils,
          options: [
            "I enjoy and easily handle meal preparation",
            "I can manage basic meals without problems",
            "I keep meals simple and get by",
            "Meal times can be difficult for me",
          ],
        },
      ]}
      nextSection="/onboarding/everyday-tasks"
      backPath="/onboarding/morning-energy"
      sectionIndex={5}
    />
  );
}
