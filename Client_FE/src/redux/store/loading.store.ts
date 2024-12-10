import { create } from "zustand";

interface LoadingState {
    loading: boolean;
    setLoading: (isLoading: boolean) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (isLoading) => set({ loading: isLoading }),
}));

export default useLoadingStore;
