import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPersonFalling } from "@fortawesome/free-solid-svg-icons";

export default function Stability() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Vision & Safety"
      subtitle="Let's ensure our recommendations match your needs"
      items={[
        {
          question: "Regarding stability in the past year:",
          type: "radio",
          key: "stability",
          icon: faPersonFalling,
          options: [
            "No falls or concerns",
            "Some close calls",
            "One fall",
            "Multiple falls",
          ],
        },
      ]}
      nextSection="/onboarding/health"
      backPath="/onboarding/health"
      allowSkip={true}
      sectionIndex={5}
    />
  );
}
