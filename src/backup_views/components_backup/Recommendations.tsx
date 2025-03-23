import { cn } from "@/lib/utils";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "easy" | "moderate" | "difficult";
  category: "safety" | "wellness" | "social" | "nutrition";
  completed: boolean;
}

interface RecommendationsProps {
  recommendations?: Recommendation[];
  className?: string;
}

export default function Recommendations({
  recommendations = [
    {
      id: "1",
      title: "Secure loose rugs with non-slip backing",
      description:
        "Adding non-slip backing to rugs prevents slips and falls, one of the most common causes of injury at home.",
      impact: "high" as const,
      effort: "easy" as const,
      category: "safety" as const,
      completed: false,
    },
    {
      id: "2",
      title: "Install brighter bulbs in stairwell",
      description:
        "Improved lighting in stairwells significantly reduces fall risk and improves confidence when navigating between floors.",
      impact: "medium" as const,
      effort: "easy" as const,
      category: "safety" as const,
      completed: false,
    },
    {
      id: "3",
      title: "Daily 10-minute balance exercises",
      description:
        "Simple standing exercises improve stability and reduce fall risk while building confidence in movement.",
      impact: "high" as const,
      effort: "moderate" as const,
      category: "wellness" as const,
      completed: true,
    },
    {
      id: "4",
      title: "Schedule weekly video call with family",
      description:
        "Regular social connection improves mood and cognitive function while strengthening family bonds.",
      impact: "medium" as const,
      effort: "easy" as const,
      category: "social" as const,
      completed: false,
    },
    {
      id: "5",
      title: "Prepare meals with protein at breakfast",
      description:
        "Starting the day with protein helps maintain muscle mass and provides energy throughout the day.",
      impact: "medium" as const,
      effort: "moderate" as const,
      category: "nutrition" as const,
      completed: false,
    },
  ],
  className,
}: RecommendationsProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "safety":
        return "bg-blue-100 text-blue-800";
      case "wellness":
        return "bg-green-100 text-green-800";
      case "social":
        return "bg-purple-100 text-purple-800";
      case "nutrition":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case "high":
        return "High Impact";
      case "medium":
        return "Medium Impact";
      case "low":
        return "Low Impact";
      default:
        return "Unknown Impact";
    }
  };

  const getEffortLabel = (effort: string) => {
    switch (effort) {
      case "easy":
        return "Easy";
      case "moderate":
        return "Moderate";
      case "difficult":
        return "Challenging";
      default:
        return "Unknown Effort";
    }
  };

  // Filter active recommendations (not completed)
  const activeRecommendations = recommendations.filter((rec) => !rec.completed);
  const completedRecommendations = recommendations.filter(
    (rec) => rec.completed,
  );

  return (
    <div className={cn("bg-white rounded-xl shadow-md p-6", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-700">
          Your Personalized Action Plan
        </h3>
        <div className="flex gap-2">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            Sort by Impact
          </button>
          <span className="text-slate-300">|</span>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            Sort by Ease
          </button>
        </div>
      </div>

      <p className="text-slate-600 mb-6">
        These personalized recommendations will help you maintain independence
        and improve your well-being. Start with what feels right for you.
      </p>

      <div className="space-y-4">
        {activeRecommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <input
                  type="checkbox"
                  id={`rec-${recommendation.id}`}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={recommendation.completed}
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span
                    className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      getCategoryColor(recommendation.category),
                    )}
                  >
                    {recommendation.category.charAt(0).toUpperCase() +
                      recommendation.category.slice(1)}
                  </span>

                  <div className="flex items-center text-xs text-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
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
                    {getImpactLabel(recommendation.impact)}
                  </div>

                  <div className="flex items-center text-xs text-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M12 22v-9" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                      <path d="m16 16-4-4-4 4" />
                    </svg>
                    {getEffortLabel(recommendation.effort)}
                  </div>
                </div>

                <label
                  htmlFor={`rec-${recommendation.id}`}
                  className="font-medium text-slate-800 cursor-pointer"
                >
                  {recommendation.title}
                </label>

                <p className="text-sm text-slate-600 mt-1">
                  {recommendation.description}
                </p>

                <div className="mt-3 flex justify-end">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {completedRecommendations.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-slate-700 mb-3">
            Recently Completed
          </h4>
          <div className="space-y-2">
            {completedRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      id={`rec-${recommendation.id}`}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={recommendation.completed}
                      readOnly
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`rec-${recommendation.id}`}
                      className="text-sm font-medium text-slate-700 line-through cursor-pointer"
                    >
                      {recommendation.title}
                    </label>
                    <div className="flex gap-2 mt-1">
                      <span
                        className={cn(
                          "px-1.5 py-0.5 text-xs rounded-full",
                          getCategoryColor(recommendation.category),
                        )}
                      >
                        {recommendation.category.charAt(0).toUpperCase() +
                          recommendation.category.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          View All Recommendations
        </button>
      </div>
    </div>
  );
}
