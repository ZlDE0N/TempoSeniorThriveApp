import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";

export default function FamilyConnections() {
  return (
    <QuestionsCard
      title="Family Connections"
      items={[
        {
          question: "How often do you connect with your family?",
          type: "radio",
          key: "familyConnections",
          icon: faPeopleRoof,
          options: [
            "We're in touch almost daily",
            "Regular weekly contact",
            "Every couple of weeks",
            "Less often than i'd like",
          ],
        },
      ]}
      nextSection="/onboarding/friends-and-neighbors"
      backPath="/onboarding/evening-energy"
      allowSkip={true}
      sectionIndex={17}
    />
  );
}
