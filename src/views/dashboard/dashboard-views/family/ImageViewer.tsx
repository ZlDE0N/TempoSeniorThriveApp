import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export default function ImageViewer({ isOpen, onClose, imageUrl, title }: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) return null;

  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const resetView = () => {
    setScale(1);
    setRotation(0);
  };
  const rotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <button
          onClick={zoomIn}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="h-6 w-6" />
        </button>
        <button
          onClick={zoomOut}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="h-6 w-6" />
        </button>
        <button
          onClick={rotate}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors"
          title="Rotate"
        >
          <RotateCcw className="h-6 w-6" />
        </button>
        <button
          onClick={resetView}
          className="px-4 py-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm transition-colors"
          title="Reset View"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors"
          title="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-white text-center">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <div 
        className="w-full h-full flex items-center justify-center cursor-move"
        onClick={(e) => {
          // Close on background click
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            cursor: 'zoom-in'
          }}
        />
      </div>
    </div>
  );
}