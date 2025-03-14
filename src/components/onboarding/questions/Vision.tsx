import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function Vision() {
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
          question: "Any vision considerations?",
          type: "checkbox",
          key: "vision",
          icon: faEye,
          options: [
            "General vision is good",
            "Need good lighting",
            "Depth perception challenges",
            "Limited peripheral vision",
            "Other vision considerations",
          ],
        },
      ]}
      nextSection="/onboarding/stability"
      backPath="/onboarding/movement-considerations"
      allowSkip={true}
      progress={12}
    />
  );
}
