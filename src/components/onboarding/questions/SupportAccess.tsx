import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";

export default function SupportAccess() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 , behavior: "smooth" });
  }, []);
  return (
    <QuestionsCard
      title="Support Access"
      items={[
        {
          question: "If you needed help with something, you would:",
          type: "radio",
          key: "SupportAccess",
          options: [
            "Have several people to call",
            "Know at least one person to ask",
            "Try to manage on my own",
            "Not be sure who to ask",
          ],
        },
      ]}
      nextSection="/onboarding/transition"
      buttonLabel="Done"
      allowSkip={true}
      progress={95}
    />
  );
}
