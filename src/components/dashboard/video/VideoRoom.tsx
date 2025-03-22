import React, { useState } from 'react';
import { Video, AlertTriangle } from 'lucide-react';
import Modal from '../Modal';
import VideoChat from './VideoChat';

interface VideoRoomProps {
  isOpen: boolean;
  onClose: () => void;
  participantName?: string;
}

export default function VideoRoom({ isOpen, onClose, participantName }: VideoRoomProps) {
  const [roomName, setRoomName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJoinRoom = async () => {
    if (!roomName.trim()) return;

    setIsJoining(true);
    setError(null);
    
    try {
      // In a production environment, you would make an API call to your backend
      // to get a real Twilio access token. For now, we'll show a message about setup.
      setError('Video chat requires Twilio setup. Please configure your Twilio credentials in the backend.');
    } catch (error) {
      setError('Failed to join room. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleClose = () => {
    setRoomName('');
    setError(null);
    setAccessToken(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={accessToken ? 'Video Call' : 'Join Video Call'}
    >
      {accessToken ? (
        <div className="h-[600px]">
          <VideoChat
            roomName={roomName}
            accessToken={accessToken}
            onLeave={() => {
              setAccessToken(null);
              handleClose();
            }}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-700">{error}</p>
              </div>
              <p className="mt-2 text-xs text-yellow-600">
                To enable video chat:
                <ol className="list-decimal ml-4 mt-1">
                  <li>Set up a Twilio account</li>
                  <li>Create a backend endpoint to generate access tokens</li>
                  <li>Update the VideoRoom component to fetch real tokens</li>
                </ol>
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter room name"
                required
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Share this room name with others to join the same call
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleJoinRoom}
              disabled={!roomName.trim() || isJoining}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isJoining ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Joining...
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  Join Room
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}