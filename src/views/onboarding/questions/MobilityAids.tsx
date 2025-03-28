import { Button } from "@/views/dashboard/ui/button";
import { Input } from "@/views/dashboard/ui/input";
import { Label } from "@/views/dashboard/ui/label";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/views/dashboard/ui/radio-group";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import QuestionsCard from "../../../components/onboarding/QuestionsCard";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";

export default function MobilityAids() {
  return (
    <QuestionsCard
      title="Mobility Aids"
      subtitle="Mobility looks different for everyone—let’s understand what works for you"
      items={[
        {
          question: "Do you regularly use any mobility devices?",
          type: "radio",
          key: "mobilityAids",
          icon: faWheelchair,
          options: [
            "No, I don't use any mobility devices",
            "Yes, I use a cane",
            "Yes, I use a walker",
            "Yes, I use a wheelchair",
            "Other support",
          ],
          deductions: [
            3,5,7,10,
          ],
        },
      ]}
      nextSection="/onboarding/vision"
      backPath="/onboarding/home-movement"
      allowSkip={true}
      sectionIndex={9}
    />
  );
}
