import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VideoParticipantProps {
  participant: any;
}

export default function VideoParticipant({ participant }: VideoParticipantProps) {
  const [videoTrack, setVideoTrack] = useState<any>(null);
  const [audioTrack, setAudioTrack] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const trackSubscribed = (track: any) => {
      if (track.kind === 'video') {
        setVideoTrack(track);
      } else if (track.kind === 'audio') {
        setAudioTrack(track);
      }
    };

    const trackUnsubscribed = (track: any) => {
      if (track.kind === 'video') {
        setVideoTrack(null);
      } else if (track.kind === 'audio') {
        setAudioTrack(null);
      }
    };

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      participant.off('trackSubscribed', trackSubscribed);
      participant.off('trackUnsubscribed', trackUnsubscribed);
    };
  }, [participant]);

  useEffect(() => {
    if (videoTrack && videoRef.current) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTrack]);

  useEffect(() => {
    if (audioTrack && audioRef.current) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTrack]);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
      />
      <audio ref={audioRef} autoPlay />
      <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
        <span>{participant.identity}</span>
        {audioTrack ? (
          <Mic className="h-4 w-4" />
        ) : (
          <MicOff className="h-4 w-4" />
        )}
      </div>
    </div>
  );
}