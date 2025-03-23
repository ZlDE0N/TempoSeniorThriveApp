import WelcomeHeader from "../views/dashboard/dashboard-views/family/WelcomeHeader";
import ThriveScore from "./components_backup/ThriveScore";
import VisionAssessment from "./components_backup/VisionAssessment";
import Recommendations from "../views/dashboard/Recommendations";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <WelcomeHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-1">
            <ThriveScore className="mb-6" />

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-slate-700 mb-4">
                Your Purpose
              </h3>
              <p className="text-slate-600">
                Living independently isn't just about staying in your home—it's
                about maintaining the freedom to make your own choices and live
                life on your terms.
              </p>
              <p className="mt-3 text-slate-600">
                Every small improvement you make strengthens your ability to
                stay independent and connected to what matters most.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800 font-medium">
                  "The 5-second rule: If you have an instinct to act on a goal,
                  you must physically move within 5 seconds or your brain will
                  kill it."
                </p>
                <p className="mt-2 text-sm text-blue-600 text-right">
                  - Mel Robbins
                </p>
              </div>
            </div>
          </div>

          {/* Middle and right columns */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <VisionAssessment />
              <Recommendations />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
