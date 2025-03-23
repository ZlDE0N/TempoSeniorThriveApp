import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../QuestionsCard";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";

export default function MobilityAids() {
  return (
    <QuestionsCard
      title="Mobility Aids"
      subtitle="Understanding how you move through your day helps us provide relevant insights"
      items={[
        {
          question: "Do you regularly use any mobility devices (such as a cane, walker, or wheelchair)?",
          type: "radio",
          key: "mobilityAids",
          icon: faWheelchair,
          options: [
            "No, I don't use any mobility devices.",
            "Yes, I use a cane.",
            "Yes, I use a walker.",
            "Yes, I use a wheelchair.",
            "Other support",
          ],
        },
      ]}
      nextSection="/onboarding/vision"
      backPath="/onboarding/chair-transfer"
      allowSkip={true}
      sectionIndex={11}
    />
  );
}
