import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function EverydayTasks() {
  return (
    <QuestionsCard
      title="Everyday Tasks"
      items={[
        {
          question:
            "How would you describe your ability to handle everyday tasks around your home, like chores or personal care?",
          type: "radio",
          key: "everydayTasks",
          icon: faHome,
          options: [
            "I manage all tasks independently and comfortably.",
            "I handle most tasks with ease.",
            "I can manage, but sometimes need to pace myself.",
            "I find it difficult to manage many tasks.",
          ],
        },
      ]}
      nextSection="/onboarding/daily-routines"
      backPath="/onboarding/meals"
      allowSkip={true}
      sectionIndex={6}
    />
  );
}
