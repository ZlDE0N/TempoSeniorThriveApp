import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";

export default function FamilyConnections() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Family Connections"
      items={[
        {
          question: "How often do you connect with your family?",
          type: "radio",
          key: "familyConnections",
          options: [
            "We're in touch almost daily",
            "Regular weekly contact",
            "Every couple of weeks",
            "Less often than i'd like",
          ],
        },
      ]}
      nextSection="/onboarding/friends-and-neighbors"
      allowSkip={true}
      progress={85}
    />
  );
}
