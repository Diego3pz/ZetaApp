import { useActionInfoStore } from '@/hooks/likeStore';
import { usePlaylistsStore } from '@/hooks/playlistStore';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { deletePlaylist, newPlaylist } from './crud/playlist';

const ModalDeletePlayList = ({ setShowModal, uuid }: any) => {

    const [namePlaylist, setNamePlaylist] = useState('')
    const modal = useRef(null);
    const { setTextInfo } = useActionInfoStore()

    const { setPlaylists } = usePlaylistsStore()

    const escFunction = useCallback((event: any) => {
        if (event.keyCode === 27) setShowModal(false)
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const playlists = await deletePlaylist(uuid)
        setPlaylists(playlists)

        setTextInfo({
            text: 'Playlist created',
            active: true
        })

        setShowModal(false)
    }

    const handleClickOutside = () => {
        setShowModal(false)
    }

    const useExternalClick = (ref: React.RefObject<HTMLElement>, callback: any): void => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        useEffect(() => {
            document.addEventListener('mousedown', handleClick);
            return () => {
                document.removeEventListener('mousedown', handleClick);
            };
        }, []);
    };

    useExternalClick(modal, handleClickOutside)

    return (
        <div className='z-[51] fixed left-0 top-0 flex items-center justify-center bg-black/70 backdrop-blur-sm h-screen w-screen'>
            <div ref={modal} className='absolute top-0 left-0 flex items-center h-full w-full justify-center'>
                <div className='w-full max-w-[300px] p-4 grid gap-8 rounded-xl border border-neutral-500 border-opacity-40 bg-neutral-800'>
                    <h2 className='text-neutral-200 text-xl font-semibold text-center'>Are you sure you want to delete this playlist?</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 '>
                        <div className='flex justify-between'>
                            <button type='button' onClick={() => setShowModal(false)} className='border border-neutral-600 w-32 text-sm hover:bg-neutral-700 rounded-md py-2 text-white'>
                                Cancel
                            </button>
                            <button type='submit' className='bg-green-600 hover:bg-green-500 w-32 rounded-md py-2 text-sm text-white'>
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalDeletePlayList