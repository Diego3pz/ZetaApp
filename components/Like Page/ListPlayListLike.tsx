import { usePlaylists } from '@/hooks/usePlaylist'
import React, { useState } from 'react'
import { useActionInfoStore } from '@/hooks/likeStore';
import { useModalPlaylist } from '@/hooks/playlistStore';
import { addSong } from '../crud/playlist';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListPlayListLike = ({ song }: any) => {
    const { setTextInfo }: any = useActionInfoStore()
    const { playlists } = usePlaylists()


    const addSongToPlaylist = (playlist: any) => {
        addSong(playlist.uuid, song)
        setTextInfo({
            text: `Added to playlist ${playlist.name}`,
            active: true
        })
    }

    const notify = (info: any) => {
        console.log("Mostrando notificación"); // Para verificar que se llama
        toast.info(`${info}`, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    return (
        <div className="overflow-hidden truncate">
            <ul>
                {playlists.map((playlist: any) => (
                    <li
                        onClick={() => {
                            addSongToPlaylist(playlist);
                            notify(playlist.name); // Asegúrate de que se llama aquí
                        }}
                        className="py-2 truncate flex gap-2 items-center pt-2 px-3 pb-1 text-[12px] hover:cursor-pointer w-full hover:bg-zinc-600 transition-all rounded-b-lg"
                        key={playlist.id}
                    >
                        {playlist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListPlayListLike