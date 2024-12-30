import { create } from "zustand";

interface PaginationStore {
  visibleItems: number;
  itemsPerLoad: number;
  showMore: () => void;
  resetPagination: () => void;
}

export const usePaginationStore = create<PaginationStore>((set) => ({
  visibleItems: 6,
  itemsPerLoad: 3,
  showMore: () =>
    set((state) => ({
      visibleItems: state.visibleItems + state.itemsPerLoad,
    })),
  resetPagination: () =>
    set({
      visibleItems: 6,
    }),
}));
