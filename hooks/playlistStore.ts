import { create } from "zustand"

export const usePlaylistsStore = create((set) => ({
    playlists: [],
    setPlaylists: (playlist: any) => set(() => ({
        playlists: playlist,
    }))
}))
export const useModalPlaylist = create((set) => ({
    showModal: false,
    setShowModal: (value: boolean) => set(() => ({
        showModal: value
    })),
    song: {
        id: '',
        music: '',
        image: '',
        title: '',
        artist: '',
    },
    setSong: (value: any) => set(() => ({
        song: value
    }))
}))