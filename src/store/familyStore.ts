import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  birthDate?: string;
  location?: string;
  avatar?: string;
  photoCount: number;
}

export interface PhotoTag {
  id: string;
  familyMemberId: string;
  position?: { x: number; y: number };
}

export interface SharedPhoto {
  id: string;
  url: string;
  caption: string;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
  familyTags: PhotoTag[];
  likes: string[];
  comments: {
    id: string;
    userId: string;
    text: string;
    timestamp: string;
  }[];
  isFavorite?: boolean;
}

interface FamilyState {
  photos: SharedPhoto[];
  familyMembers: FamilyMember[];
  addPhoto: (photo: Omit<SharedPhoto, 'id' | 'likes' | 'comments' | 'familyTags'>) => void;
  removePhoto: (id: string) => void;
  updatePhoto: (id: string, updates: { caption: string; tags: string[] }) => void;
  deletePhoto: (id: string) => void;
  addComment: (photoId: string, userId: string, text: string) => void;
  toggleLike: (photoId: string, userId: string) => void;
  toggleFavorite: (photoId: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'photoCount'>) => void;
  updateFamilyMember: (id: string, updates: Partial<Omit<FamilyMember, 'id' | 'photoCount'>>) => void;
  deleteFamilyMember: (id: string) => void;
  addPhotoTag: (photoId: string, familyMemberId: string, position?: { x: number; y: number }) => void;
  removePhotoTag: (photoId: string, tagId: string) => void;
  getPhotosByTag: (tag: string) => SharedPhoto[];
  getPhotosByFamilyMember: (familyMemberId: string) => SharedPhoto[];
  getPhotosByDateRange: (startDate: string, endDate: string) => SharedPhoto[];
  getFavoritePhotos: () => SharedPhoto[];
  getPhotosOnThisDay: () => SharedPhoto[];
}

export const useFamilyStore = create<FamilyState>()(
  persist(
    (set, get) => ({
      photos: [],
      familyMembers: [],

      addPhoto: (photo) => {
        const id = crypto.randomUUID();
        set((state) => ({
          photos: [
            { 
              ...photo, 
              id, 
              likes: [], 
              comments: [],
              familyTags: [],
              isFavorite: false 
            }, 
            ...state.photos
          ]
        }));
      },

      removePhoto: (id) => {
        set((state) => ({
          photos: state.photos.filter((photo) => photo.id !== id)
        }));
      },

      updatePhoto: (id, updates) => {
        set((state) => ({
          photos: state.photos.map((photo) =>
            photo.id === id
              ? { ...photo, ...updates }
              : photo
          )
        }));
      },

      deletePhoto: (id) => {
        // Update photo counts for family members
        const photo = get().photos.find(p => p.id === id);
        if (photo) {
          const taggedMemberIds = photo.familyTags.map(tag => tag.familyMemberId);
          set((state) => ({
            familyMembers: state.familyMembers.map(member => ({
              ...member,
              photoCount: taggedMemberIds.includes(member.id) 
                ? member.photoCount - 1 
                : member.photoCount
            }))
          }));
        }

        set((state) => ({
          photos: state.photos.filter((photo) => photo.id !== id)
        }));
      },

      addComment: (photoId, userId, text) => {
        set((state) => ({
          photos: state.photos.map((photo) =>
            photo.id === photoId
              ? {
                  ...photo,
                  comments: [
                    ...photo.comments,
                    {
                      id: crypto.randomUUID(),
                      userId,
                      text,
                      timestamp: new Date().toISOString()
                    }
                  ]
                }
              : photo
          )
        }));
      },

      toggleLike: (photoId, userId) => {
        set((state) => ({
          photos: state.photos.map((photo) =>
            photo.id === photoId
              ? {
                  ...photo,
                  likes: photo.likes.includes(userId)
                    ? photo.likes.filter((id) => id !== userId)
                    : [...photo.likes, userId]
                }
              : photo
          )
        }));
      },

      toggleFavorite: (photoId) => {
        set((state) => ({
          photos: state.photos.map((photo) =>
            photo.id === photoId
              ? {
                  ...photo,
                  isFavorite: !photo.isFavorite
                }
              : photo
          )
        }));
      },

      addFamilyMember: (member) => {
        const id = crypto.randomUUID();
        set((state) => ({
          familyMembers: [
            ...state.familyMembers,
            { ...member, id, photoCount: 0 }
          ]
        }));
      },

      updateFamilyMember: (id, updates) => {
        set((state) => ({
          familyMembers: state.familyMembers.map((member) =>
            member.id === id
              ? { ...member, ...updates }
              : member
          )
        }));
      },

      deleteFamilyMember: (id) => {
        // Remove family member tags from photos
        set((state) => ({
          photos: state.photos.map(photo => ({
            ...photo,
            familyTags: photo.familyTags.filter(tag => tag.familyMemberId !== id)
          })),
          familyMembers: state.familyMembers.filter(member => member.id !== id)
        }));
      },

      addPhotoTag: (photoId, familyMemberId, position) => {
        const tagId = crypto.randomUUID();
        
        // Update photo with new tag
        set((state) => ({
          photos: state.photos.map((photo) =>
            photo.id === photoId
              ? {
                  ...photo,
                  familyTags: [
                    ...photo.familyTags,
                    { id: tagId, familyMemberId, position }
                  ]
                }
              : photo
          ),
          // Increment photo count for family member
          familyMembers: state.familyMembers.map(member =>
            member.id === familyMemberId
              ? { ...member, photoCount: member.photoCount + 1 }
              : member
          )
        }));
      },

      removePhotoTag: (photoId, tagId) => {
        const photo = get().photos.find(p => p.id === photoId);
        if (!photo) return;

        const tag = photo.familyTags.find(t => t.id === tagId);
        if (!tag) return;

        set((state) => ({
          photos: state.photos.map((photo) =>
            photo.id === photoId
              ? {
                  ...photo,
                  familyTags: photo.familyTags.filter(t => t.id !== tagId)
                }
              : photo
          ),
          // Decrement photo count for family member
          familyMembers: state.familyMembers.map(member =>
            member.id === tag.familyMemberId
              ? { ...member, photoCount: member.photoCount - 1 }
              : member
          )
        }));
      },

      getPhotosByTag: (tag) => {
        return get().photos.filter((photo) => 
          photo.tags.includes(tag)
        );
      },

      getPhotosByFamilyMember: (familyMemberId) => {
        return get().photos.filter((photo) =>
          photo.familyTags.some(tag => tag.familyMemberId === familyMemberId)
        );
      },

      getPhotosByDateRange: (startDate, endDate) => {
        return get().photos.filter((photo) => {
          const photoDate = new Date(photo.uploadedAt);
          return photoDate >= new Date(startDate) && 
                 photoDate <= new Date(endDate);
        });
      },

      getFavoritePhotos: () => {
        return get().photos.filter((photo) => photo.isFavorite);
      },

      getPhotosOnThisDay: () => {
        const today = new Date();
        return get().photos.filter((photo) => {
          const photoDate = new Date(photo.uploadedAt);
          return photoDate.getDate() === today.getDate() && 
                 photoDate.getMonth() === today.getMonth();
        });
      }
    }),
    {
      name: 'family-storage'
    }
  )
);