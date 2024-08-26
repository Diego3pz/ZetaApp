import { useEffect } from 'react'
import { usePlaylistsStore } from './playlistStore'
import { getPlaylists } from '@/services/playlist'


export const usePlaylists = () => {
    const { playlists } = usePlaylistsStore((state: any) => ({
        playlists: state.playlists
    }))

    const { setPlaylists }: any = usePlaylistsStore()

    const handlePlaylists = async () => {
        const data = await getPlaylists()
        setPlaylists(data)
    }

    useEffect(() => {
        handlePlaylists()
    }, [])

    return { playlists, setPlaylists }
}