import { create } from 'zustand';

type UseOpenTransactionType = {
    id?: string;
    isOpen: boolean;
    onOpen: (id?: string) => void;
    onClose: () => void;
}

export const useOpenTransaction = create<UseOpenTransactionType>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id?: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));