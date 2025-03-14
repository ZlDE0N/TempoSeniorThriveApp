import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faChair } from "@fortawesome/free-solid-svg-icons";

export default function ChairTransfer() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Chair Transfer"
      items={[
        {
          question: "What about getting up from your favorite chair?",
          type: "radio",
          key: "chairTransfer",
          icon: faChair,
          options: [
            "Pop right up when I need to",
            "Take my time but manage fine",
            "Sometimes it takes extra effort",
            "Could use something to push up with",
          ],
        },
      ]}
      nextSection="/onboarding/balance-history"
      backPath="/onboarding/home-movement"
      allowSkip={true}
      progress={55}
    />
  );
}
