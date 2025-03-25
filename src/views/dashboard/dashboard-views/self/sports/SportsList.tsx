// import React, { useState, useEffect } from 'react';
// import { Activity, Search, Filter, Plus, Heart, Star, Clock, AlertTriangle } from 'lucide-react';
// import { Sport, searchSports, getSportDetails } from '../../../services/sportsService';
// import SportsModal from './SportsModal';

// export default function SportsList() {
//   const [sports, setSports] = useState<Sport[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedDifficulty, setSelectedDifficulty] = useState<Sport['difficulty'] | 'all'>('all');
//   const [selectedType, setSelectedType] = useState<string>('all');

//   // Load initial suggestions when component mounts
//   useEffect(() => {
//     loadSuggestions();
//   }, []);

//   const loadSuggestions = async () => {
//     setIsLoading(true);
//     try {
//       // Search with empty query to get all activities
//       const results = await searchSports('');
//       setSports(results);
//     } catch (error) {
//       console.error('Error loading suggestions:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = async (query: string) => {
//     setSearchQuery(query);
//     setIsLoading(true);
//     try {
//       const results = await searchSports(query);
//       setSports(results);
//     } catch (error) {
//       console.error('Error searching sports:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Apply both difficulty and type filters
//   const filteredSports = sports.filter(sport => {
//     const matchesDifficulty = selectedDifficulty === 'all' || sport.difficulty === selectedDifficulty;
//     const matchesType = selectedType === 'all' || sport.type === selectedType;
//     return matchesDifficulty && matchesType;
//   });

//   // Get unique activity types from sports data
//   const activityTypes = ['all', ...Array.from(new Set(sports.map(s => s.type)))];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-semibold text-dark">Active Living</h2>
//           <p className="text-sm text-gray-500">Discover sports and activities suited for you</p>
//         </div>
//       </div>

//       <div className="flex space-x-4">
//         <div className="relative flex-1">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => handleSearch(e.target.value)}
//             placeholder="Search sports and activities..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>

//         <select
//           value={selectedDifficulty}
//           onChange={(e) => setSelectedDifficulty(e.target.value as Sport['difficulty'] | 'all')}
//           className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
//         >
//           <option value="all">All Levels</option>
//           <option value="easy">Easy</option>
//           <option value="moderate">Moderate</option>
//           <option value="challenging">Challenging</option>
//         </select>
//       </div>

//       {/* Activity Type Filter */}
//       <div className="flex flex-wrap gap-2">
//         {activityTypes.map(type => (
//           <button
//             key={type}
//             onClick={() => setSelectedType(type)}
//             className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
//               selectedType === type
//                 ? 'bg-primary text-white'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             {type === 'all' ? 'All Types' : type}
//           </button>
//         ))}
//       </div>

//       {isLoading ? (
//         <div className="text-center py-12">
//           <Activity className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
//           <p className="text-gray-500">Loading activities...</p>
//         </div>
//       ) : filteredSports.length === 0 ? (
//         <div className="text-center py-12 bg-white rounded-lg shadow">
//           <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900">No activities found</h3>
//           <p className="mt-2 text-gray-500">
//             Try adjusting your filters or search for different activities
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredSports.map((sport) => (
//             <div
//               key={sport.id}
//               className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//               onClick={() => {
//                 setSelectedSport(sport);
//                 setIsModalOpen(true);
//               }}
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="p-2 rounded-full bg-primary-light">
//                       <Activity className="h-5 w-5 text-primary" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900">{sport.name}</h3>
//                       <p className="text-sm text-gray-500">{sport.type}</p>
//                     </div>
//                   </div>
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     sport.difficulty === 'easy'
//                       ? 'bg-green-100 text-green-800'
//                       : sport.difficulty === 'moderate'
//                       ? 'bg-yellow-100 text-yellow-800'
//                       : 'bg-red-100 text-red-800'
//                   }`}>
//                     {sport.difficulty}
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600 line-clamp-2 mb-4">
//                   {sport.description}
//                 </p>

//                 <div className="space-y-2">
//                   <div className="text-sm text-gray-600">
//                     <strong>Benefits:</strong>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {sport.benefits.slice(0, 2).map((benefit, index) => (
//                       <span
//                         key={index}
//                         className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary"
//                       >
//                         {benefit}
//                       </span>
//                     ))}
//                     {sport.benefits.length > 2 && (
//                       <span className="text-xs text-gray-500">
//                         +{sport.benefits.length - 2} more
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <div className="text-sm text-gray-600">
//                     <strong>Required Equipment:</strong>
//                   </div>
//                   <div className="mt-1 text-sm text-gray-500">
//                     {sport.equipment.slice(0, 2).join(', ')}
//                     {sport.equipment.length > 2 && (
//                       <span className="text-xs text-gray-500">
//                         {' '}+{sport.equipment.length - 2} more
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <SportsModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedSport(null);
//         }}
//         sport={selectedSport}
//       />
//     </div>
//   );
// }