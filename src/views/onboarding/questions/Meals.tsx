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
            "I enjoy preparing varied and complex meals", 
            "I am comfortable preparing most meals.", 
            "I prepare only very simple meals.",
            "I order meals or eat out regularly.",
            "Meal preparation is difficult for me.",
          ],
          deductions: [
            3,5,6,9,12,
          ],
        },
      ]}
      nextSection="/onboarding/everyday-tasks"
      backPath="/onboarding/morning-energy"
      sectionIndex={5}
    />
  );
}
