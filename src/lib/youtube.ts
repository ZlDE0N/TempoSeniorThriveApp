import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

// Trusted fitness channels for seniors - ordered by priority
const VERIFIED_CHANNELS = [
  'SeniorFitnessWithMeredith',
  'SilverSneakers',
  'GrowYoung Fitness',
  'More Life Health',
  'Bob & Brad',
  'Sixty and Me',
  'National Institute on Aging',
  'AARP',
  'Eldergym'
];

interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: string;
  url: string;
  verified: boolean;
  closedCaptions: boolean;
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  const parts = [];
  if (hours) parts.push(hours);
  parts.push(minutes || '0');
  parts.push(seconds.padStart(2, '0') || '00');

  return parts.join(':');
}

export async function fetchYouTubeVideos(searchQuery: string): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is missing');
  }

  try {
    // Search for videos
    const searchResponse = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 24,
        q: searchQuery,
        type: 'video',
        key: YOUTUBE_API_KEY,
        videoEmbeddable: true,
        safeSearch: 'strict',
        relevanceLanguage: 'en'
      }
    });

    if (!searchResponse.data.items?.length) {
      return [];
    }

    // Get video IDs
    const videoIds = searchResponse.data.items
      .map((item: any) => item.id.videoId)
      .join(',');

    // Get video details
    const detailsResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'contentDetails,statistics',
        id: videoIds,
        key: YOUTUBE_API_KEY
      }
    });

    // Combine search results with video details
    return searchResponse.data.items.map((item: any, index: number) => {
      const details = detailsResponse.data.items[index];
      const isVerifiedChannel = VERIFIED_CHANNELS.some(channel => 
        item.snippet.channelTitle.toLowerCase().includes(channel.toLowerCase())
      );

      const video: YouTubeVideo = {
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        duration: details ? formatDuration(details.contentDetails.duration) : '0:00',
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        verified: isVerifiedChannel,
        closedCaptions: details?.contentDetails?.caption !== 'false'
      };

      return video;
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch videos: ${error.message}`);
    }
    throw error;
  }
}