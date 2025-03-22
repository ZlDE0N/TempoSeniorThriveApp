import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

export default function ImagePreview({ file, onRemove }: ImagePreviewProps) {
  const previewUrl = URL.createObjectURL(file);

  React.useEffect(() => {
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div className="relative group">
      <img
        src={previewUrl}
        alt={file.name}
        className="w-32 h-32 object-cover rounded-lg"
      />
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md text-gray-500 hover:text-gray-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}