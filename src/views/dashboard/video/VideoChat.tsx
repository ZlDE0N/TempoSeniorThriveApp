import React, { useState, useEffect } from 'react';
import { Video, Camera, Mic, PhoneOff, MonitorOff } from 'lucide-react';
import { TelehealthService } from '../../integrations/telehealth/TelehealthService';
import VideoParticipant from './VideoParticipant';
import VideoControls from './VideoControls';

interface VideoChatProps {
  roomName: string;
  accessToken: string;
  onLeave?: () => void;
}

export default function VideoChat({ roomName, accessToken, onLeave }: VideoChatProps) {
  // const [videoService, setVideoService] = useState<TelehealthService | null>(null);
  // const [participants, setParticipants] = useState<any[]>([]);
  // const [isConnecting, setIsConnecting] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const service = new TelehealthService(accessToken);
  //   setVideoService(service);

  //   const connectToRoom = async () => {
  //     try {
  //       const room = await service.joinRoom(roomName);
        
  //       // Handle participants already in the room
  //       room.participants.forEach(participant => {
  //         setParticipants(prev => [...prev, participant]);
  //       });

  //       // Handle participant connections/disconnections
  //       room.on('participantConnected', participant => {
  //         setParticipants(prev => [...prev, participant]);
  //       });

  //       room.on('participantDisconnected', participant => {
  //         setParticipants(prev => prev.filter(p => p !== participant));
  //       });

  //       setIsConnecting(false);
  //     } catch (err) {
  //       setError('Failed to connect to video room');
  //       setIsConnecting(false);
  //     }
  //   };

  //   connectToRoom();

  //   return () => {
  //     if (videoService) {
  //       videoService.leaveRoom();
  //     }
  //   };
  // }, [roomName, accessToken]);

  // const handleLeaveRoom = async () => {
  //   if (videoService) {
  //     await videoService.leaveRoom();
  //   }
  //   onLeave?.();
  // };

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <div className="text-center">
  //         <p className="text-red-600 mb-2">{error}</p>
  //         <button
  //           onClick={handleLeaveRoom}
  //           className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
  //         >
  //           Leave Room
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // if (isConnecting) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
  //         <p className="text-gray-600">Connecting to video room...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="flex flex-col h-full bg-gray-900">
  //     <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
  //       {/* Local participant */}
  //       <div className="relative bg-gray-800 rounded-lg overflow-hidden">
  //         <video
  //           className="w-full h-full object-cover"
  //           autoPlay
  //           playsInline
  //           muted
  //         />
  //         <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
  //           You
  //         </div>
  //       </div>

  //       {/* Remote participants */}
  //       {participants.map(participant => (
  //         <VideoParticipant
  //           key={participant.sid}
  //           participant={participant}
  //         />
  //       ))}
  //     </div>

  //     {/* Video controls */}
  //     <VideoControls
  //       onLeave={handleLeaveRoom}
  //       onToggleAudio={(enabled) => videoService?.toggleAudio(enabled)}
  //       onToggleVideo={(enabled) => videoService?.toggleVideo(enabled)}
  //     />
  //   </div>
  // );
}