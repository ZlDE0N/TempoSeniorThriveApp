import { create } from 'zustand';

const useGuestStore = create((set) => ({
  roomImages: {}, // Store Blobs as key-value pairs
  analysisResults: {}, // Store strings as key-value pairs
  beenHereBefore: false, // New boolean state

  // Image handlers
  setRoomImage: (id, blob) =>
    set((state) => ({
      roomImages: { ...state.roomImages, [id]: blob }
    })),

  clearRoomImages: () => set({ roomImages: {} }),

  // Analysis handlers
  setAnalysisResult: (id, result) =>
    set((state) => ({
      analysisResults: { ...state.analysisResults, [id]: result }
    })),

  clearAnalysisResults: () => set({ analysisResults: {} }),

  // New setter for beenHereBefore
  setBeenHereBefore: (value) => set({ beenHereBefore: value }),
}));

export default useGuestStore;
