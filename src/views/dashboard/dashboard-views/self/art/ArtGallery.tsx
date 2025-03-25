// import React, { useState, useEffect } from 'react';
// import { Search, Filter, Eye, Calendar, Globe, Frame, Plus, Heart, Share2, FolderPlus } from 'lucide-react';
// import { Artwork, ArtworkFilters, searchArtworks, getCategories, getCultures } from '../../../services/artService';
// import { useArtStore, PersonalArtwork } from '../../../store/artStore';
// import { useUserStore } from '../../../store/userStore';
// import ArtworkModal from './ArtworkModal';
// import UploadArtModal from './UploadArtModal';
// import CollectionModal from './CollectionModal';

// type ViewMode = 'museum' | 'personal' | 'collections';

// export default function ArtGallery() {
//   const [viewMode, setViewMode] = useState<ViewMode>('museum');
//   const [artworks, setArtworks] = useState<Artwork[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedArtwork, setSelectedArtwork] = useState<Artwork | PersonalArtwork | null>(null);
//   const [isArtworkModalOpen, setIsArtworkModalOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categories, setCategories] = useState<string[]>([]);
//   const [cultures, setCultures] = useState<string[]>([]);
//   const [filters, setFilters] = useState<ArtworkFilters>({});

//   const { personalArtworks, collections, favorites, toggleFavorite } = useArtStore();
//   const { currentUser } = useUserStore();

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     setIsLoading(true);
//     try {
//       const [artworksData, categoriesData, culturesData] = await Promise.all([
//         searchArtworks(''),
//         getCategories(),
//         getCultures()
//       ]);
//       setArtworks(artworksData);
//       setCategories(categoriesData);
//       setCultures(culturesData);
//     } catch (error) {
//       console.error('Error loading initial data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = async (query: string) => {
//     setSearchQuery(query);
//     if (viewMode === 'museum') {
//       setIsLoading(true);
//       try {
//         const results = await searchArtworks(query, filters);
//         setArtworks(results);
//       } catch (error) {
//         console.error('Error searching artworks:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const updateFilters = (updates: Partial<ArtworkFilters>) => {
//     const newFilters = { ...filters, ...updates };
//     setFilters(newFilters);
//     handleSearch(searchQuery);
//   };

//   const getDisplayedArtworks = () => {
//     switch (viewMode) {
//       case 'personal':
//         return personalArtworks.filter(artwork =>
//           searchQuery
//             ? artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               artwork.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               artwork.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
//             : true
//         );
//       case 'collections':
//         return collections;
//       default:
//         return artworks;
//     }
//   };

//   const displayedItems = getDisplayedArtworks();

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-semibold text-dark">Art Gallery</h2>
//           <p className="text-sm text-gray-500">Explore and share beautiful artwork</p>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="flex rounded-lg overflow-hidden">
//             <button
//               onClick={() => setViewMode('museum')}
//               className={`px-4 py-2 text-sm font-medium ${
//                 viewMode === 'museum'
//                   ? 'bg-primary text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               Museum Art
//             </button>
//             <button
//               onClick={() => setViewMode('personal')}
//               className={`px-4 py-2 text-sm font-medium ${
//                 viewMode === 'personal'
//                   ? 'bg-primary text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               Personal Art
//             </button>
//             <button
//               onClick={() => setViewMode('collections')}
//               className={`px-4 py-2 text-sm font-medium ${
//                 viewMode === 'collections'
//                   ? 'bg-primary text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               Collections
//             </button>
//           </div>
//           {viewMode === 'personal' && (
//             <button
//               onClick={() => setIsUploadModalOpen(true)}
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Share Art
//             </button>
//           )}
//           {viewMode === 'collections' && (
//             <button
//               onClick={() => setIsCollectionModalOpen(true)}
//               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
//             >
//               <FolderPlus className="h-4 w-4 mr-2" />
//               New Collection
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="flex space-x-4">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             placeholder={`Search ${viewMode === 'museum' ? 'artworks' : viewMode === 'personal' ? 'your art' : 'collections'}...`}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>

//         {viewMode === 'museum' && (
//           <>
//             <select
//               value={filters.category}
//               onChange={(e) => updateFilters({ category: e.target.value || undefined })}
//               className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
//             >
//               <option value="">All Categories</option>
//               {categories.map(category => (
//                 <option key={category} value={category}>{category}</option>
//               ))}
//             </select>

//             <select
//               value={filters.culture}
//               onChange={(e) => updateFilters({ culture: e.target.value || undefined })}
//               className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
//             >
//               <option value="">All Cultures</option>
//               {cultures.map(culture => (
//                 <option key={culture} value={culture}>{culture}</option>
//               ))}
//             </select>
//           </>
//         )}
//       </div>

//       {isLoading ? (
//         <div className="text-center py-12">
//           <Frame className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
//           <p className="text-gray-500">Loading artworks...</p>
//         </div>
//       ) : displayedItems.length === 0 ? (
//         <div className="text-center py-12 bg-white rounded-lg shadow">
//           <Frame className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900">No items found</h3>
//           <p className="mt-2 text-gray-500">
//             {viewMode === 'personal' 
//               ? 'Share your first artwork to get started!'
//               : viewMode === 'collections'
//               ? 'Create your first collection to organize your favorite art'
//               : 'Try adjusting your search terms or filters'}
//           </p>
//           <button
//             onClick={() => viewMode === 'personal' ? setIsUploadModalOpen(true) : setIsCollectionModalOpen(true)}
//             className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             {viewMode === 'personal' ? 'Share Art' : 'Create Collection'}
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {displayedItems.map((item: any) => (
//             <div
//               key={item.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
//               onClick={() => {
//                 setSelectedArtwork(item);
//                 setIsArtworkModalOpen(true);
//               }}
//             >
//               <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
//                 <img
//                   src={item.imageUrl}
//                   alt={item.title}
//                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
//                   <Eye className="h-8 w-8 text-white" />
//                 </div>
//               </div>

//               <div className="p-4">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
//                     {item.title}
//                   </h3>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleFavorite(item.id);
//                       }}
//                       className={`p-1 rounded-full transition-colors ${
//                         favorites.includes(item.id)
//                           ? 'text-red-500 hover:bg-red-50'
//                           : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
//                       }`}
//                     >
//                       <Heart className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         // Handle share
//                         if (navigator.share) {
//                           navigator.share({
//                             title: item.title,
//                             text: item.description,
//                             url: window.location.href
//                           });
//                         }
//                       }}
//                       className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
//                     >
//                       <Share2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>

//                 {viewMode === 'museum' ? (
//                   <>
//                     <p className="text-sm text-gray-500">{item.artist}</p>
//                     <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         {item.date}
//                       </div>
//                       {item.culture && (
//                         <div className="flex items-center">
//                           <Globe className="h-4 w-4 mr-1" />
//                           {item.culture}
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 ) : viewMode === 'personal' ? (
//                   <>
//                     {item.artist && <p className="text-sm text-gray-500">{item.artist}</p>}
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       {item.tags.map((tag: string) => (
//                         <span
//                           key={tag}
//                           className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <p className="text-sm text-gray-500 mt-1">
//                     {item.artworkIds.length} artworks
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <ArtworkModal
//         isOpen={isArtworkModalOpen}
//         onClose={() => {
//           setIsArtworkModalOpen(false);
//           setSelectedArtwork(null);
//         }}
//         artwork={selectedArtwork}
//         onFavorite={toggleFavorite}
//         isFavorite={selectedArtwork ? favorites.includes(selectedArtwork.id) : false}
//       />

//       <UploadArtModal
//         isOpen={isUploadModalOpen}
//         onClose={() => setIsUploadModalOpen(false)}
//       />

//       <CollectionModal
//         isOpen={isCollectionModalOpen}
//         onClose={() => setIsCollectionModalOpen(false)}
//       />
//     </div>
//   );
// }