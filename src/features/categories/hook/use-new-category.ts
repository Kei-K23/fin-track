import { create } from 'zustand';

type UseNewCategoryType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewCategory = create<UseNewCategoryType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));