import React, { useState } from 'react';
import { Calendar, Globe, Frame, ExternalLink, Maximize2, Heart, Share2, FolderPlus } from 'lucide-react';
import { Artwork } from '../../../services/artService';
import { PersonalArtwork } from '../../../store/artStore';
import Modal from '../../Modal';
import ImageViewer from './ImageViewer';

interface ArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: Artwork | PersonalArtwork | null;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

export default function ArtworkModal({ isOpen, onClose, artwork, onFavorite, isFavorite }: ArtworkModalProps) {
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  if (!artwork) return null;

  const isPersonalArtwork = 'type' in artwork;

  const handleShare = async () => {
    try {
      // Check if Web Share API is supported
      if (!navigator.share) {
        // Fallback: Copy link to clipboard
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
      }

      // Use Web Share API
      await navigator.share({
        title: artwork.title,
        text: artwork.description,
        url: window.location.href
      });
    } catch (error) {
      // Handle errors (user cancelled or share failed)
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        // Fallback to clipboard
        try {
          const url = window.location.href;
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        } catch (clipboardError) {
          console.error('Error copying to clipboard:', clipboardError);
          alert('Unable to share. Please try again.');
        }
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={artwork.title}
      >
        <div className="space-y-6">
          <div className="aspect-video relative rounded-lg overflow-hidden group">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-full object-contain bg-gray-100 group-hover:opacity-95 transition-opacity"
            />
            <button
              onClick={() => setIsImageViewerOpen(true)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
              title="View full screen"
            >
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {isPersonalArtwork ? artwork.artist || 'Unknown Artist' : artwork.artist}
              </h3>
              {!isPersonalArtwork && (
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {artwork.date}
                  </div>
                  {artwork.culture && (
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {artwork.culture}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onFavorite(artwork.id)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite
                    ? 'text-red-500 hover:bg-red-50'
                    : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                }`}
              >
                <Heart className="h-5 w-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => {/* Handle add to collection */}}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <FolderPlus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {isPersonalArtwork ? (
            <>
              {artwork.description && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">About this Artwork</h4>
                  <p className="text-sm text-gray-600">{artwork.description}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-500">
                Uploaded {new Date(artwork.uploadedAt).toLocaleDateString()}
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">About this Artwork</h4>
                <p className="text-sm text-gray-600">{artwork.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Medium</h4>
                  <p className="text-sm text-gray-600">{artwork.medium}</p>
                </div>
                {artwork.dimensions && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Dimensions</h4>
                    <p className="text-sm text-gray-600">{artwork.dimensions}</p>
                  </div>
                )}
              </div>

              {artwork.creditLine && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Credit</h4>
                  <p className="text-sm text-gray-600">{artwork.creditLine}</p>
                </div>
              )}

              <div className="flex justify-end">
                <a
                  href={artwork.museum === 'Art Institute of Chicago'
                    ? `https://www.artic.edu/artworks/${artwork.id}`
                    : `https://harvardartmuseums.org/collections/object/${artwork.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover"
                >
                  View on Museum Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </div>
      </Modal>

      <ImageViewer
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        imageUrl={artwork.imageUrl}
        title={artwork.title}
      />
    </>
  );
}