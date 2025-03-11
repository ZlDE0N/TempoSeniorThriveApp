import { cn } from "@/lib/utils";

interface WelcomeHeaderProps {
  userName?: string;
  className?: string;
}

export default function WelcomeHeader({
  userName = "Margaret",
  className,
}: WelcomeHeaderProps) {
  // Get time of day for greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const greeting = getTimeBasedGreeting();

  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-3xl font-bold text-slate-800">
        {greeting}, {userName}
      </h1>
      <p className="mt-2 text-slate-600">
        Your journey to independent living starts with small, meaningful steps.
        Today is a perfect day to make progress.
      </p>
    </div>
  );
}
