import React, { useState } from 'react';
import { Bell, MessageCircle, Heart, Image } from 'lucide-react';
import { useFamilyStore } from '../../store/familyStore';
import { formatDateTime } from '../../utils/dateUtils';

export default function FamilyUpdates() {
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const { updates, addUpdate, addUpdateComment, toggleUpdateLike } = useFamilyStore();

  const handleAddUpdate = () => {
    addUpdate({
      timestamp: new Date().toISOString(),
      authorId: 'currentUserId',
      type: 'milestone',
      title: 'Physical Therapy Progress',
      content: 'Successfully completed 30 minutes of walking exercises today. Showing great improvement in balance and stamina.',
      attachments: [
        {
          type: 'photo',
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
          name: 'Walking Progress'
        }
      ],
      visibility: 'family',
      likes: [],
      comments: []
    });
  };

  const handleAddComment = (updateId: string) => {
    if (!newComment[updateId]?.trim()) return;
    addUpdateComment(updateId, 'currentUserId', newComment[updateId]);
    setNewComment(prev => ({ ...prev, [updateId]: '' }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Care Updates</h3>
        <button
          onClick={handleAddUpdate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
        >
          Share Update
        </button>
      </div>

      <div className="space-y-4">
        {updates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No updates yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Share your first update with the family
            </p>
          </div>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{update.title}</h4>
                  <p className="text-sm text-gray-500">{formatDateTime(update.timestamp)}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                  {update.type}
                </span>
              </div>

              <p className="mt-4 text-gray-600">{update.content}</p>

              {update.attachments && update.attachments.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {update.attachments.map((attachment, index) => (
                    <div key={index} className="relative">
                      {attachment.type === 'photo' && (
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleUpdateLike(update.id, 'currentUserId')}
                    className={`flex items-center space-x-1 ${
                      update.likes.includes('currentUserId')
                        ? 'text-red-500'
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                    <span>{update.likes.length}</span>
                  </button>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <MessageCircle className="h-5 w-5" />
                    <span>{update.comments.length}</span>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-4 space-y-4">
                {update.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {comment.userId}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDateTime(comment.timestamp)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{comment.text}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-center mt-4">
                  <input
                    type="text"
                    value={newComment[update.id] || ''}
                    onChange={(e) => setNewComment(prev => ({ 
                      ...prev, 
                      [update.id]: e.target.value 
                    }))}
                    placeholder="Add a comment..."
                    className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(update.id)}
                  />
                  <button
                    onClick={() => handleAddComment(update.id)}
                    disabled={!newComment[update.id]?.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}