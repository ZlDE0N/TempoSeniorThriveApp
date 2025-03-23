import { cn } from "@/lib/utils";

interface HazardItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  impact: "high" | "medium" | "low";
  location: string;
}

interface VisionAssessmentProps {
  hazards?: HazardItem[];
  className?: string;
}

export default function VisionAssessment({
  hazards = [
    {
      id: "1",
      title: "Loose Rug",
      description: "Unsecured rug in hallway creates a tripping hazard",
      imageUrl:
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&q=80",
      impact: "high" as const,
      location: "Hallway",
    },
    {
      id: "2",
      title: "Poor Lighting",
      description: "Dim lighting in stairwell increases fall risk",
      imageUrl:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80",
      impact: "medium" as const,
      location: "Stairwell",
    },
    {
      id: "3",
      title: "Cluttered Pathway",
      description: "Items on floor creating obstacle in walking path",
      imageUrl:
        "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&q=80",
      impact: "medium" as const,
      location: "Living Room",
    },
  ],
  className,
}: VisionAssessmentProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className={cn("bg-white rounded-xl shadow-md p-6", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-700">
          Home Safety Assessment
        </h3>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
          View Full Report
        </button>
      </div>

      <p className="text-slate-600 mb-6">
        Our AI has identified these potential safety concerns in your home.
        Taking action on these items can significantly improve your ThriveScore.
      </p>

      <div className="space-y-4">
        {hazards.map((hazard) => (
          <div
            key={hazard.id}
            className="flex gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
              <img
                src={hazard.imageUrl}
                alt={hazard.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-medium text-slate-800">{hazard.title}</h4>
                <span
                  className={cn(
                    "px-2 py-1 text-xs rounded-full border",
                    getImpactColor(hazard.impact),
                  )}
                >
                  {hazard.impact.charAt(0).toUpperCase() +
                    hazard.impact.slice(1)}{" "}
                  Impact
                </span>
              </div>

              <p className="text-sm text-slate-600 mt-1">
                {hazard.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-slate-500">
                  Location: {hazard.location}
                </span>

                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  Get Solutions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Schedule New Assessment
        </button>
      </div>
    </div>
  );
}
