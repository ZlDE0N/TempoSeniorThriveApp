import React, { useState, useRef } from 'react';
import { Camera, X, Upload, Tag as TagIcon } from 'lucide-react';
import { useFamilyStore } from '../../store/familyStore';
import Modal from '../Modal';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'grandkids', label: 'Grandchildren' },
    { id: 'family_gatherings', label: 'Family Gatherings' },
    { id: 'vacations', label: 'Vacations & Trips' },
    { id: 'celebrations', label: 'Celebrations & Holidays' },
    { id: 'hobbies', label: 'Hobbies & Activities' }
  ];
export default function PhotoUploadModal({ isOpen, onClose }: PhotoUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addPhoto } = useFamilyStore();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim())) {
      setCustomTags([...customTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCustomTags(customTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !caption.trim()) return;

    // Combine categories and custom tags
    const allTags = [...selectedCategories, ...customTags];

    // In a real app, you would upload the file to a storage service
    // For now, we'll use a local URL
    const photoUrl = URL.createObjectURL(selectedFile);

    addPhoto({
      url: photoUrl,
      caption: caption.trim(),
      uploadedBy: 'currentUserId',
      uploadedAt: new Date().toISOString(),
      tags: allTags,
      likes: [],
      comments: []
    });

    // Reset form
    setSelectedFile(null);
    setCaption('');
    setSelectedCategories([]);
    setCustomTags([]);
    setPreview(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share a Photo"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          
          {preview ? (
            <div className="relative w-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <>
              <Camera className="h-12 w-12 text-gray-400 mb-3" />
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Write a caption for your photo..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCategories.includes(category.id)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {customTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-gray-400 hover:text-gray-600"
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
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add custom tags..."
              className="block flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
            >
              <TagIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedFile || !caption.trim()}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Share Photo
          </button>
        </div>
      </form>
    </Modal>
  );
}