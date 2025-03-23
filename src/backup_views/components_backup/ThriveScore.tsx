import { cn } from "@/lib/utils";

interface ThriveScoreProps {
  score: number;
  previousScore?: number;
  className?: string;
}

export default function ThriveScore({
  score = 78,
  previousScore = 72,
  className,
}: ThriveScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const scoreChange = score - (previousScore || 0);
  const isImproving = scoreChange > 0;

  return (
    <div
      className={cn(
        "flex flex-col items-center p-6 bg-white rounded-xl shadow-md",
        className,
      )}
    >
      <h3 className="text-xl font-semibold text-slate-700 mb-2">
        Your ThriveScore
      </h3>

      <div className="flex items-center justify-center">
        <div className={cn("text-6xl font-bold", getScoreColor(score))}>
          {score}
        </div>
      </div>

      <div className="mt-3 flex items-center">
        {isImproving ? (
          <span className="text-green-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            <span className="font-medium">+{scoreChange} points</span>
          </span>
        ) : (
          <span className="text-red-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
            <span className="font-medium">{scoreChange} points</span>
          </span>
        )}
      </div>

      <p className="mt-4 text-center text-slate-600">
        Your independence score shows how well you're thriving at home. Small
        improvements make a big difference!
      </p>

      <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
        See what affects your score
      </button>
    </div>
  );
}
