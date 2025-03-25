import { Activity, Calendar, Target, Award } from 'lucide-react';
import VideoLibrary from './VideoLibrary';

export default function Fitness() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-primary/10">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-primary/5 rounded-xl">
            <Activity className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Active Living</h1>
            <p className="text-lg text-gray-600 mt-1">
              Stay strong, flexible, and energized with expert-led fitness videos
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-primary/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">This Week</div>
              <div className="text-2xl font-bold text-gray-900">3 Activities</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-primary/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/5 rounded-lg">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Monthly Goal</div>
              <div className="text-2xl font-bold text-gray-900">75% Complete</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-primary/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/5 rounded-lg">
              <Award className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Achievements</div>
              <div className="text-2xl font-bold text-gray-900">5 Earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Library */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Fitness Videos</h2>
        <VideoLibrary />
      </div>
    </div>
  );
}