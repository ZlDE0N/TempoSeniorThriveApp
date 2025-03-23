import React, { useState } from 'react';
import { Camera, Search, Filter, Eye, Calendar, Plus, Heart, Share2, Tag, X, Star, Edit, Save, Trash2, Grid, List, Clock, Users } from 'lucide-react';
import { useFamilyStore } from '../../../../store/dashboard_store/familyStore';
import Modal from '../../../../components/Modal';
import ImageViewer from './ImageViewer';
import UploadArtModal from './UploadArtModal';
import CollectionModal from './CollectionModal';
import FamilyTreePanel from './FamilyTreePanel';

type ViewMode = 'grid' | 'list' | 'timeline' | 'favorites' | 'thisDay';

interface EditPhotoData {
  caption: string;
  tags: string[];
}

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
}

interface PhotoCardProps {
  photo: any;
  newComment: string;
  onCommentChange: (text: string) => void;
  onAddComment: () => void;
  onToggleLike: () => void;
  onToggleFavorite: () => void;
  onEdit: () => void;
  isEditing: boolean;
  editData: EditPhotoData;
  onEditDataChange: React.Dispatch<React.SetStateAction<EditPhotoData>>;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onAddTag: () => void;
  newTag: string;
  onNewTagChange: (value: string) => void;
  onRemoveTag: (tag: string) => void;
  onDelete: () => void;
  showYear?: boolean;
}

// PhotoCard component implementation...
function PhotoCard({ 
  photo, 
  newComment, 
  onCommentChange, 
  onAddComment, 
  onToggleLike, 
  onToggleFavorite,
  onEdit,
  isEditing,
  editData,
  onEditDataChange,
  onSaveEdit,
  onCancelEdit,
  onAddTag,
  newTag,
  onNewTagChange,
  onRemoveTag,
  onDelete,
  showYear = false
}: PhotoCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="relative group">
        <img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button 
            className="p-2 bg-white rounded-full text-gray-700 hover:text-primary mx-1"
            title="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button 
            onClick={onEdit}
            className="p-2 bg-white rounded-full text-gray-700 hover:text-primary mx-1"
            title="Edit Photo"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
        {photo.isFavorite && (
          <div className="absolute top-2 right-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
          </div>
        )}
        {showYear && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {new Date(photo.uploadedAt).getFullYear()}
          </div>
        )}
      </div>
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-900">Edit Photo</h4>
              <button 
                onClick={onCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Caption</label>
              <input
                type="text"
                value={editData.caption}
                onChange={(e) => onEditDataChange(prev => ({ ...prev, caption: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Add a caption..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Tags</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {editData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                    <button 
                      onClick={() => onRemoveTag(tag)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => onNewTagChange(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-l-md text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && onAddTag()}
                />
                <button
                  onClick={onAddTag}
                  disabled={!newTag.trim()}
                  className="px-3 py-1.5 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md text-gray-700 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={onSaveEdit}
                className="px-3 py-1.5 bg-primary text-white rounded-md text-sm flex items-center"
              >
                <Save className="h-4 w-4 mr-1" />
                Save Changes
              </button>
            </div>
            
            {showDeleteConfirm && (
              <div className="mt-3 p-3 bg-red-50 rounded-md border border-red-100">
                <p className="text-sm text-red-700 mb-2">Are you sure you want to delete this photo?</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-1 bg-white text-gray-700 rounded-md text-sm border border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onDelete();
                      setShowDeleteConfirm(false);
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <p className="text-sm text-gray-900">{photo.caption}</p>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onEdit}
                  className="text-gray-400 hover:text-gray-600"
                  title="Edit Photo"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={onToggleFavorite}
                  className={`flex-shrink-0 ${photo.isFavorite ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
                  title={photo.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Star className="h-4 w-4" />
                </button>
              </div>
            </div>
            {photo.tags && photo.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {photo.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(photo.uploadedAt).toLocaleDateString()}</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={onToggleLike}
                  className={`flex items-center space-x-1 ${
                    photo.likes.includes('currentUserId')
                      ? 'text-red-500'
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  <span>{photo.likes.length}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {photo.comments.slice(0, 2).map((comment: any) => (
                <div key={comment.id} className="text-sm">
                  <span className="font-medium text-gray-900">
                    {comment.userId}
                  </span>
                  <span className="ml-2 text-gray-700">{comment.text}</span>
                </div>
              ))}
              {photo.comments.length > 2 && (
                <button className="text-sm text-primary hover:text-primary-hover">
                  View all {photo.comments.length} comments
                </button>
              )}
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => onCommentChange(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 text-sm border-0 focus:ring-0 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && onAddComment()}
                />
                <button
                  onClick={onAddComment}
                  disabled={!newComment?.trim()}
                  className="text-primary hover:text-primary-hover disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PhotoGallery() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [editPhotoId, setEditPhotoId] = useState<string | null>(null);
  const [editPhotoData, setEditPhotoData] = useState<EditPhotoData>({caption: '', tags: []});
  const [newTag, setNewTag] = useState('');
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showFamilyTree, setShowFamilyTree] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showAddFamilyMember, setShowAddFamilyMember] = useState(false);
  const [newFamilyMember, setNewFamilyMember] = useState<{ name: string; relation: string }>({ name: '', relation: 'other' });

  const { 
    photos, 
    addPhoto, 
    toggleLike, 
    toggleFavorite,
    updatePhoto,
    deletePhoto,
    addComment,
    getFavoritePhotos,
    getPhotosOnThisDay 
  } = useFamilyStore();

  const viewOptions = [
    { id: 'grid', label: 'Grid View', icon: <Grid className="h-4 w-4" /> },
    { id: 'list', label: 'List View', icon: <List className="h-4 w-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <Clock className="h-4 w-4" /> },
    { id: 'favorites', label: 'Favorites', icon: <Star className="h-4 w-4" /> },
    { id: 'thisDay', label: 'This Day', icon: <Calendar className="h-4 w-4" /> }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'grandkids', label: 'Grandchildren' },
    { id: 'family', label: 'Family' },
    { id: 'pets', label: 'Pets & Animals' },
    { id: 'vacations', label: 'Vacations & Trips' },
    { id: 'celebrations', label: 'Celebrations & Holidays' },
    { id: 'sports', label: 'Sports & Games' },
    { id: 'school', label: 'School & Graduations' },
    { id: 'hobbies', label: 'Hobbies & Activities' },
    { id: 'home', label: 'Home & Garden' },
    { id: 'cooking', label: 'Cooking & Recipes' },
    { id: 'throwback', label: 'Throwback Photos' },
    { id: 'weddings', label: 'Weddings & Anniversaries' },
    { id: 'travel', label: 'Travel & Adventures' },
    { id: 'milestones', label: 'Milestones & Achievements' }
  ];

  const relationOptions = [
    { value: 'grandparent', label: 'Grandparent' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Child' },
    { value: 'grandchild', label: 'Grandchild' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'aunt', label: 'Aunt' },
    { value: 'uncle', label: 'Uncle' },
    { value: 'cousin', label: 'Cousin' },
    { value: 'niece', label: 'Niece' },
    { value: 'nephew', label: 'Nephew' },
    { value: 'other', label: 'Other' }
  ];

  const handleAddFamilyMember = () => {
    if (newFamilyMember.name.trim()) {
      const newId = (familyMembers.length + 1).toString();
      setFamilyMembers([
        ...familyMembers,
        { 
          id: newId, 
          name: newFamilyMember.name.trim(), 
          relation: newFamilyMember.relation 
        }
      ]);
      setNewFamilyMember({ name: '', relation: 'other' });
      setShowAddFamilyMember(false);
    }
  };

  // Filter photos based on selected category and view mode
  const getFilteredPhotos = () => {
    let filtered = selectedCategory === 'all' 
      ? photos 
      : photos.filter(photo => photo.tags?.includes(selectedCategory));
    
    // Additional filtering based on view mode
    if (viewMode === 'favorites') {
      filtered = filtered.filter(photo => photo.isFavorite);
    } else if (viewMode === 'thisDay') {
      filtered = getPhotosOnThisDay();
    }
    
    // Sort for timeline view
    if (viewMode === 'timeline') {
      filtered.sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime());
    }
    
    return filtered;
  };

  const filteredPhotos = getFilteredPhotos();

  // Group photos by year for timeline view
  const photosByYear = filteredPhotos.reduce((acc, photo) => {
    const year = new Date(photo.uploadedAt).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(photo);
    return acc;
  }, {} as Record<string, any[]>);

  const handleAddComment = (photoId: string) => {
    if (!newComment[photoId]?.trim()) return;
    addComment(photoId, 'currentUserId', newComment[photoId]);
    setNewComment(prev => ({ ...prev, [photoId]: '' }));
  };

  const handleEditPhoto = (photo: any) => {
    setEditPhotoId(photo.id);
    setEditPhotoData({
      caption: photo.caption,
      tags: [...photo.tags]
    });
  };

  const handleSaveEdit = () => {
    if (editPhotoId) {
      updatePhoto(editPhotoId, editPhotoData);
      setEditPhotoId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditPhotoId(null);
    setEditPhotoData({caption: '', tags: []});
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setEditPhotoData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditPhotoData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-dark">Family Photo Gallery</h2>
          <p className="text-sm text-gray-500">Share special moments with your loved ones</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            {viewOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setViewMode(option.id as ViewMode)}
                className={`p-2 rounded flex items-center ${
                  viewMode === option.id ? 'bg-white shadow text-primary' : 'text-gray-500'
                }`}
                title={option.label}
              >
                {option.icon}
                <span className="sr-only">{option.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFamilyTree(!showFamilyTree)}
            className={`p-2 rounded-full ${
              showFamilyTree ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
            }`}
            title="Family Tree"
          >
            <Users className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
          >
            <Camera className="h-4 w-4 mr-2" />
            Share Photo
          </button>
        </div>
      </div>

      {/* Family Tree Panel */}
      {showFamilyTree && (
        <FamilyTreePanel
          onClose={() => setShowFamilyTree(false)}
          onSelectMember={(member) => {
            setSelectedCategory('all');
            // Additional filtering logic here
          }}
        />
      )}

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search photos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {viewMode === 'timeline' ? (
        <div className="space-y-8">
          {Object.entries(photosByYear)
            .sort(([a, b]) => Number(b) - Number(a))
            .map(([year, photos]) => (
              <div key={year} className="space-y-4">
                <div className="flex items-center">
                  <h3 className="text-xl font-bold text-gray-900">{year}</h3>
                  <div className="ml-4 h-0.5 flex-1 bg-gray-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo) => (
                    <PhotoCard 
                      key={photo.id} 
                      photo={photo} 
                      newComment={newComment[photo.id] || ''} 
                      onCommentChange={(text) => setNewComment(prev => ({ ...prev, [photo.id]: text }))}
                      onAddComment={() => handleAddComment(photo.id)}
                      onToggleLike={() => toggleLike(photo.id, 'currentUserId')}
                      onToggleFavorite={() => toggleFavorite(photo.id)}
                      onEdit={() => handleEditPhoto(photo)}
                      isEditing={editPhotoId === photo.id}
                      editData={editPhotoData}
                      onEditDataChange={setEditPhotoData}
                      onSaveEdit={handleSaveEdit}
                      onCancelEdit={handleCancelEdit}
                      onAddTag={handleAddTag}
                      newTag={newTag}
                      onNewTagChange={setNewTag}
                      onRemoveTag={handleRemoveTag}
                      onDelete={() => deletePhoto(photo.id)}
                      showYear
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              newComment={newComment[photo.id] || ''} 
              onCommentChange={(text) => setNewComment(prev => ({ ...prev, [photo.id]: text }))}
              onAddComment={() => handleAddComment(photo.id)}
              onToggleLike={() => toggleLike(photo.id, 'currentUserId')}
              onToggleFavorite={() => toggleFavorite(photo.id)}
              onEdit={() => handleEditPhoto(photo)}
              isEditing={editPhotoId === photo.id}
              editData={editPhotoData}
              onEditDataChange={setEditPhotoData}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onAddTag={handleAddTag}
              newTag={newTag}
              onNewTagChange={setNewTag}
              onRemoveTag={handleRemoveTag}
              onDelete={() => deletePhoto(photo.id)}
            />
          ))}
        </div>
      )}

      <UploadArtModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <CollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
      />
    </div>
  );
}