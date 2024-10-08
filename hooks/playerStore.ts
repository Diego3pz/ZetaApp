import { create } from "zustand";

interface MusicState {
    id?: string;
    track?: MusicState[] | null;
    music?: string;
    image?: string;
    title?: string;
    artist?: string;
    position?: number;
    playlist?: MusicState[] | null;
    song?: MusicState | null;
    songs?: string[];
}

interface PlayerStore {
    isPlaying: boolean;
    currentMusic: MusicState;
    volume: number;
    setVolume: (volume: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentMusic: (currentMusic: MusicState) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    isPlaying: false,
    currentMusic: { playlist: [], song: null, songs: [] },
    volume: 1,
    setVolume: (volume: number) => set({ volume }),
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
    setCurrentMusic: (currentMusic: MusicState) => set({ currentMusic }),
}));
interface PlayerIndexStore {
    index: number;
    setIndex: (index: number) => void;
}

export const usePlayerIndexStore = create<PlayerIndexStore>((set) => ({
    index: 0,
    setIndex: (index: number) => set({ index }),
}));