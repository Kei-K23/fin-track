import { create } from 'zustand';

type UseNewAccountType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewAccount = create<UseNewAccountType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));