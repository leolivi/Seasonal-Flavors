import { create } from "zustand";

interface UserImageStore {
  imageUrl: string | undefined;
  setImageUrl: (url: string | undefined) => void;
  updateTimestamp: number;
}

export const useUserImageStore = create<UserImageStore>((set) => ({
  imageUrl: undefined,
  updateTimestamp: Date.now(),
  setImageUrl: (url) => set({ imageUrl: url, updateTimestamp: Date.now() }),
}));
