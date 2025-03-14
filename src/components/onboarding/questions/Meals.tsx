import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

export default function Meals() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Your Meals"
      items={[
        {
          question: "When it comes to meals, what's your style?",
          type: "radio",
          key: "meals",
          icon: faUtensils,
          options: [
            "I love putting my own meals together",
            "I can whip up te basics no problem",
            "I keep it simple but get by okay",
            "It's not my favorite part of the day",
          ],
        },
      ]}
      nextSection="/onboarding/activities"
      backPath="/onboarding/morning-routine"
      allowSkip={true}
      progress={40}
    />
  );
}
