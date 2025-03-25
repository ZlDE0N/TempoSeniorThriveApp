import React, { useState, useEffect } from 'react';
import { Activity, MapPin, Heart, Clock, TrendingUp, Link2, RefreshCw } from 'lucide-react';
import { stravaService, StravaActivity } from '../../../../services/stravaService';
import { formatDuration } from '../../../../utils/dateUtils';

export default function StravaActivities() {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const isAuthed = stravaService.isAuthenticated();
    setIsAuthenticated(isAuthed);
    if (isAuthed) {
      loadActivities();
      loadStats();
    }
  };

  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const recentActivities = await stravaService.getRecentActivities();
      setActivities(recentActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const athleteStats = await stravaService.getAthleteStats();
      setStats(athleteStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleConnect = () => {
    window.location.href = stravaService.getAuthUrl();
  };

  const formatDistance = (meters: number): string => {
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(1)} km`;
  };

  const formatSpeed = (mps: number): string => {
    const kph = mps * 3.6;
    return `${kph.toFixed(1)} km/h`;
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <Activity className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Connect with Strava</h3>
        <p className="text-gray-500 mb-4">
          Link your Strava account to automatically sync your activities
        </p>
        <button
          onClick={handleConnect}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          <Link2 className="h-4 w-4 mr-2" />
          Connect Strava
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary-light rounded-lg p-4">
            <h4 className="text-primary font-medium mb-2">Recent Runs</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Distance</span>
                <span>{formatDistance(stats.recent_run_totals.distance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Activities</span>
                <span>{stats.recent_run_totals.count}</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary-light rounded-lg p-4">
            <h4 className="text-secondary font-medium mb-2">Recent Rides</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Distance</span>
                <span>{formatDistance(stats.recent_ride_totals.distance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Activities</span>
                <span>{stats.recent_ride_totals.count}</span>
              </div>
            </div>
          </div>

          <div className="bg-accent-light rounded-lg p-4">
            <h4 className="text-accent font-medium mb-2">Year to Date</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Total Distance</span>
                <span>
                  {formatDistance(
                    stats.ytd_run_totals.distance +
                    stats.ytd_ride_totals.distance +
                    stats.ytd_swim_totals.distance
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Activities</span>
                <span>
                  {stats.ytd_run_totals.count +
                   stats.ytd_ride_totals.count +
                   stats.ytd_swim_totals.count}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          <button
            onClick={loadActivities}
            className="text-primary hover:text-primary-hover"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{activity.name}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Activity className="h-4 w-4 mr-1" />
                    <span>{activity.type}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDuration(activity.moving_time / 60)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {formatDistance(activity.distance)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatSpeed(activity.average_speed)}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                {activity.total_elevation_gain > 0 && (
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {activity.total_elevation_gain}m
                  </div>
                )}
                
                {activity.has_heartrate && activity.average_heartrate && (
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {Math.round(activity.average_heartrate)} bpm
                  </div>
                )}

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <time dateTime={activity.start_date}>
                    {new Date(activity.start_date).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}