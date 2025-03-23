import React, { useState } from 'react';
import { Mic, MicOff, Camera, CameraOff, PhoneOff } from 'lucide-react';

interface VideoControlsProps {
  onToggleAudio: (enabled: boolean) => void;
  onToggleVideo: (enabled: boolean) => void;
  onLeave: () => void;
}

export default function VideoControls({ onToggleAudio, onToggleVideo, onLeave }: VideoControlsProps) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    onToggleAudio(!isAudioEnabled);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    onToggleVideo(!isVideoEnabled);
  };

  return (
    <div className="bg-gray-800 p-4">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={toggleAudio}
          className={`p-3 rounded-full ${
            isAudioEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {isAudioEnabled ? (
            <Mic className="h-6 w-6 text-white" />
          ) : (
            <MicOff className="h-6 w-6 text-white" />
          )}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-3 rounded-full ${
            isVideoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {isVideoEnabled ? (
            <Camera className="h-6 w-6 text-white" />
          ) : (
            <CameraOff className="h-6 w-6 text-white" />
          )}
        </button>

        <button
          onClick={onLeave}
          className="p-3 rounded-full bg-red-600 hover:bg-red-700"
        >
          <PhoneOff className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}