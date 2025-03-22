import { create } from 'zustand';

const useBlobStore = create((set) => ({
  blob: null,
  setBlob: (blob) => set({ blob }),
  clearBlob: () => set({ blob: null }),
}));

export default useBlobStore;
