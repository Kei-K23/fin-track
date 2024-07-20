import { create } from 'zustand';

type UseNewTransactionType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewTransaction = create<UseNewTransactionType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));