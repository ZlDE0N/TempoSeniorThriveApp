import { create } from 'zustand';

const useGuestStore = create((set) => ({
  roomImages: {}, // Store Blobs as key-value pairs
  analysisResults: {}, // Store strings as key-value pairs

  setRoomImage: (id, blob) =>
    set((state) => ({
      roomImages: { ...state.roomImages, [id]: blob }
    })),

  clearRoomImages: () => set({ roomImages: {} }),

  setAnalysisResult: (id, result) =>
    set((state) => ({
      analysisResults: { ...state.analysisResults, [id]: result }
    })),

  clearAnalysisResults: () => set({ analysisResults: {} }),
}));

export default useGuestStore;
