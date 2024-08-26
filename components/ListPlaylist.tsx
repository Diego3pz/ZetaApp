import { usePlaylists } from '@/hooks/usePlaylist'
import React, { useState } from 'react'
import { addSong } from './crud/playlist'
import { useActionInfoStore } from '@/hooks/likeStore';
import { useModalPlaylist } from '@/hooks/playlistStore';

const ListPlaylist = ({ song }: any) => {
    const { setTextInfo } = useActionInfoStore()

    const addSongToPlaylist = (playlist: any) => {
        addSong(playlist.uuid, song)
        setTextInfo({
            text: 'Added to playlist',
            active: true
        })
    }

    const { playlists } = usePlaylists()
    return (
        <div className='overflow-hidden truncate'>
            <ul className=''>
                {playlists.map((playlist: any) => (
                    <li
                        onClick={() => addSongToPlaylist(playlist)}
                        className='py-2 truncate'
                        key={playlist.id}>{playlist.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ListPlaylist