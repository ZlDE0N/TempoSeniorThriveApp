import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, Mic } from 'lucide-react';
import { useMessageStore } from '../../store/messageStore';
import { useUserStore } from '../../store/userStore';
import VoiceRecorder from './VoiceRecorder';
import ImagePreview from './ImagePreview';
import { formatDateTime } from '../../utils/dateUtils';

export default function MessageCenter() {
  const [messageText, setMessageText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useUserStore();
  const { messages, addMessage } = useMessageStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    setAttachments(prev => [...prev, ...imageFiles]);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.click();
    }
  };

  const handleVoiceMessage = (blob: Blob) => {
    const file = new File([blob], `voice-message-${Date.now()}.webm`, {
      type: 'audio/webm'
    });
    setAttachments(prev => [...prev, file]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const sendMessage = async () => {
    if (!messageText.trim() && attachments.length === 0) return;
    if (!currentUser) return;

    // Convert attachments to message format
    const messageAttachments = await Promise.all(
      attachments.map(async (file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
        size: file.size
      }))
    );

    addMessage({
      senderId: currentUser.id,
      recipientId: 'caregiver', // In a real app, this would be the actual caregiver's ID
      content: messageText,
      attachments: messageAttachments,
      senderName: currentUser.name
    });

    setMessageText('');
    setAttachments([]);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === currentUser?.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100'
              }`}
            >
              {message.content && (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              )}
              {message.attachments?.map((attachment) => (
                <div key={attachment.id} className="mt-2">
                  {attachment.type.startsWith('image/') ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-full rounded-md"
                    />
                  ) : attachment.type === 'audio/webm' ? (
                    <audio controls className="w-full">
                      <source src={attachment.url} type="audio/webm" />
                    </audio>
                  ) : (
                    <div className="text-sm text-blue-500 hover:underline">
                      {attachment.name}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-1 text-xs opacity-75">
                {formatDateTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            title="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            onClick={handleImageClick}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            title="Add image"
          >
            <Image className="h-5 w-5" />
          </button>
          <VoiceRecorder onRecordingComplete={handleVoiceMessage} />
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border-0 focus:ring-0 focus:outline-none bg-gray-100 rounded-full px-4 py-2"
          />
          <button
            onClick={sendMessage}
            disabled={!messageText.trim() && attachments.length === 0}
            className="p-2 text-primary hover:text-primary-hover rounded-full hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*,.pdf,.doc,.docx"
        />
        
        {/* Image/File Previews */}
        {attachments.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              file.type.startsWith('image/') ? (
                <ImagePreview
                  key={index}
                  file={file}
                  onRemove={() => removeAttachment(index)}
                />
              ) : (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-100 rounded-md p-2"
                >
                  <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}