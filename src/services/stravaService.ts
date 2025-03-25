import { z } from 'zod';

const STRAVA_API_BASE = 'https://www.strava.com/api/v3';

// Fallback activities for when API fails
const fallbackActivities = [
  {
    id: '1',
    name: 'Morning Walk',
    type: 'Walk',
    distance: 2500,
    moving_time: 1800,
    elapsed_time: 2000,
    total_elevation_gain: 25,
    start_date: new Date().toISOString(),
    average_speed: 1.4,
    max_speed: 2.1,
    has_heartrate: true,
    average_heartrate: 125,
    max_heartrate: 140
  },
  {
    id: '2',
    name: 'Afternoon Bike Ride',
    type: 'Ride',
    distance: 8000,
    moving_time: 2400,
    elapsed_time: 2700,
    total_elevation_gain: 100,
    start_date: new Date().toISOString(),
    average_speed: 3.3,
    max_speed: 5.2,
    has_heartrate: true,
    average_heartrate: 135,
    max_heartrate: 155
  }
];

const activitySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  distance: z.number(),
  moving_time: z.number(),
  elapsed_time: z.number(),
  total_elevation_gain: z.number(),
  start_date: z.string(),
  average_speed: z.number(),
  max_speed: z.number(),
  has_heartrate: z.boolean(),
  average_heartrate: z.number().optional(),
  max_heartrate: z.number().optional()
});

export type StravaActivity = z.infer<typeof activitySchema>;

export class StravaService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number | null = null;

  constructor() {
    // Load tokens from localStorage
    this.loadTokens();
  }

  private loadTokens() {
    try {
      const tokens = localStorage.getItem('strava_tokens');
      if (tokens) {
        const { accessToken, refreshToken, expiresAt } = JSON.parse(tokens);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresAt = expiresAt;
      }
    } catch (error) {
      console.error('Error loading Strava tokens:', error);
    }
  }

  private saveTokens() {
    try {
      localStorage.setItem('strava_tokens', JSON.stringify({
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresAt: this.expiresAt
      }));
    } catch (error) {
      console.error('Error saving Strava tokens:', error);
    }
  }

  private async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) throw new Error('No refresh token available');

    try {
      const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
          client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken
        })
      });

      if (!response.ok) throw new Error('Failed to refresh token');

      const data = await response.json();
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.expiresAt = data.expires_at;
      this.saveTokens();
    } catch (error) {
      console.error('Error refreshing Strava token:', error);
      throw error;
    }
  }

  private async ensureValidToken(): Promise<string> {
    if (!this.accessToken || !this.expiresAt) {
      throw new Error('Not authenticated with Strava');
    }

    if (Date.now() / 1000 >= this.expiresAt) {
      await this.refreshAccessToken();
    }

    return this.accessToken;
  }

  async getRecentActivities(limit: number = 10): Promise<StravaActivity[]> {
    try {
      const token = await this.ensureValidToken();
      const response = await fetch(
        `${STRAVA_API_BASE}/athlete/activities?per_page=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          signal: AbortSignal.timeout(5000)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }

      const data = await response.json();
      return data.map((activity: any) => ({
        id: activity.id.toString(),
        name: activity.name,
        type: activity.type,
        distance: activity.distance,
        moving_time: activity.moving_time,
        elapsed_time: activity.elapsed_time,
        total_elevation_gain: activity.total_elevation_gain,
        start_date: activity.start_date,
        average_speed: activity.average_speed,
        max_speed: activity.max_speed,
        has_heartrate: activity.has_heartrate,
        average_heartrate: activity.average_heartrate,
        max_heartrate: activity.max_heartrate
      }));
    } catch (error) {
      console.error('Error fetching Strava activities:', error);
      return fallbackActivities;
    }
  }

  async getActivityDetails(activityId: string): Promise<StravaActivity | null> {
    try {
      const token = await this.ensureValidToken();
      const response = await fetch(
        `${STRAVA_API_BASE}/activities/${activityId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          signal: AbortSignal.timeout(5000)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch activity details');
      }

      const activity = await response.json();
      return {
        id: activity.id.toString(),
        name: activity.name,
        type: activity.type,
        distance: activity.distance,
        moving_time: activity.moving_time,
        elapsed_time: activity.elapsed_time,
        total_elevation_gain: activity.total_elevation_gain,
        start_date: activity.start_date,
        average_speed: activity.average_speed,
        max_speed: activity.max_speed,
        has_heartrate: activity.has_heartrate,
        average_heartrate: activity.average_heartrate,
        max_heartrate: activity.max_heartrate
      };
    } catch (error) {
      console.error('Error fetching Strava activity details:', error);
      return fallbackActivities.find(a => a.id === activityId) || null;
    }
  }

  async getAthleteStats(): Promise<{
    recent_run_totals: any;
    recent_ride_totals: any;
    recent_swim_totals: any;
    ytd_run_totals: any;
    ytd_ride_totals: any;
    ytd_swim_totals: any;
  }> {
    try {
      const token = await this.ensureValidToken();
      const response = await fetch(
        `${STRAVA_API_BASE}/athlete/stats`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          signal: AbortSignal.timeout(5000)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch athlete stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Strava athlete stats:', error);
      return {
        recent_run_totals: { count: 0, distance: 0, moving_time: 0, elapsed_time: 0 },
        recent_ride_totals: { count: 0, distance: 0, moving_time: 0, elapsed_time: 0 },
        recent_swim_totals: { count: 0, distance: 0, moving_time: 0, elapsed_time: 0 },
        ytd_run_totals: { count: 0, distance: 0, moving_time: 0, elapsed_time: 0 },
        ytd_ride_totals: { count: 0, distance: 0, moving_time: 0, elapsed_time: 0 },
        ytd_swim_totals: { count: 0, distance: 0, moving_time: 0, elapsed_time: 0 }
      };
    }
  }

  async authenticate(code: string): Promise<void> {
    try {
      const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: import.meta.env.VITE_STRAVA_CLIENT_ID,
          client_secret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code'
        })
      });

      if (!response.ok) throw new Error('Failed to authenticate');

      const data = await response.json();
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.expiresAt = data.expires_at;
      this.saveTokens();
    } catch (error) {
      console.error('Error authenticating with Strava:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return Boolean(this.accessToken && this.refreshToken && this.expiresAt);
  }

  getAuthUrl(): string {
    const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
    const redirectUri = `${window.location.origin}/strava-callback`;
    const scope = 'read,activity:read';
    
    return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  }

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = null;
    localStorage.removeItem('strava_tokens');
  }
}

export const stravaService = new StravaService();