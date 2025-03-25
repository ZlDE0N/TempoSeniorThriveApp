import { useState, useEffect } from 'react';
import { Play, Shield, Loader2, AlertTriangle, RefreshCw, Subtitles } from 'lucide-react';
import { fetchYouTubeVideos } from '../../../../lib/youtube';

interface Category {
  id: string;
  title: string;
  searchQuery: string;
}

const categories: Category[] = [
  {
    id: 'chair-yoga',
    title: 'Chair Yoga',
    searchQuery: 'senior chair yoga exercises'
  },
  {
    id: 'balance',
    title: 'Balance & Fall Prevention',
    searchQuery: 'senior balance exercises fall prevention'
  },
  {
    id: 'strength',
    title: 'Strength Training',
    searchQuery: 'senior strength training exercises'
  },
  {
    id: 'stretching',
    title: 'Flexibility & Stretching',
    searchQuery: 'senior stretching flexibility exercises'
  },
  {
    id: 'cardio',
    title: 'Low-Impact Cardio',
    searchQuery: 'senior low impact cardio workout'
  }
];

export default function VideoLibrary() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVideos = async (category: Category) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchYouTubeVideos(category.searchQuery);
      
      if (data.length === 0) {
        setError('No videos found for this category. Please try another category.');
      } else {
        setVideos(data);
      }
    } catch (err) {
      setError('Unable to load fitness videos. Please try again later.');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos(activeCategory);
  }, [activeCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Videos</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => loadVideos(activeCategory)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white
            rounded-lg hover:bg-primary-hover transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory.id === category.id
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100
              hover:shadow-lg transition-all duration-300 group animate-fadeSlideIn
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                transition-opacity flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80
                text-white text-sm rounded">
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary
                transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <span className={`font-medium ${video.verified ? 'text-primary' : 'text-gray-600'}`}>
                    {video.channelTitle}
                  </span>
                  {video.verified && (
                    <Shield className="w-4 h-4 text-green-500" />
                  )}
                </div>
                {video.closedCaptions && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <Subtitles className="w-4 h-4" />
                    <span>CC</span>
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}