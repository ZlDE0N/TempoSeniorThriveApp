import { Button } from "@/components/dashboard/ui/button";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faChair } from "@fortawesome/free-solid-svg-icons";

export default function ChairTransfer() {
  return (
    <QuestionsCard
      title="Chair Transfer"
      subtitle="Your ability to stand up affects your independence"
      items={[
        {
          question:
            "How easy is it for you to get up from a seated position, like from your favorite chair?",
          type: "radio",
          key: "chairTransfer",
          icon: faChair,
          options: [
             "I can stand up easily and quickly",
            "I can stand up, but I take my time",
            "I need to use my arms or something to help me stand",
            "Standing up is very difficult for me",
          ],
        },
      ]}
      nextSection="/onboarding/mobility-aids"
      backPath="/onboarding/home-movement"
      allowSkip={true}
      sectionIndex={10}
    />
  );
}
