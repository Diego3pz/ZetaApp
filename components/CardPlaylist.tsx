
import { useModalPlaylist, usePlaylistsStore } from '@/hooks/playlistStore';
import Dots from '@/icons/Dots'
import RowLefth from '@/icons/RowLeft'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { useActionInfoStore } from '@/hooks/likeStore';
import ListPlaylist from './ListPlaylist';

Modal.setAppElement('#__next');

const CardPlaylist = ({ track }: any) => {

    const [isOpen, setIsOpen] = useState(false);
    const [modalAdd, setModalAdd] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const modal = useRef(null);


    const { showModal, setShowModal, setSong } = useModalPlaylist((state: any) => ({
        showModal: state.showModal,
        setShowModal: state.setShowModal,
        setSong: state.setSong
    }))

    const escFunction = useCallback((event: any) => {
        if (event.keyCode === 27) setModalAdd(false)
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction])

    const handleClickOutside = () => {
        setModalAdd(false)
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



    const handleModalPlaylist = () => {
        setSong(track)
        setShowModal(!showModal)
    }

    return (
        <>
            <div ref={modal}>
                <button className=' rounded-full bg-transparent/60' onClick={() => setModalAdd(!modalAdd)}>
                    <Dots />
                </button>
                {modalAdd === true ?
                    <div className='flex flex-col rounded-lg absolute mt-1 bg-zinc-700 w-36'>
                        <div onMouseLeave={() => setShowAdd(false)}>
                            <p className='flex gap-2 items-center pt-2 px-3 pb-1 text-[12px] hover:cursor-pointer border-b-[1px] border-zinc-600 w-full' onClick={() => setShowAdd(true)}>
                                Add to Playlist
                                <RowLefth />
                            </p>
                            {showAdd &&
                                <div className='flex flex-col left-32 top-1 p-1 shadow-sm shadow-zinc-900 rounded-lg absolute bg-zinc-800 w-20'>
                                    <button className='flex gap-2 items-center pt-1 px-3 pb-2 text-[10px] hover:cursor-pointer w-full border-b-[1px] border-zinc-600' onClick={handleModalPlaylist}>
                                        New Playlist
                                    </button>
                                    <div className=' flex gap-2 items-center pt-2 px-3 pb-1 text-[12px] hover:cursor-pointer w-full'>
                                        <ListPlaylist song={track} />
                                    </div>
                                </div>

                            }
                        </div>

                        <p className='flex gap-2 items-center pt-2 px-3 pb-1 text-[12px] hover:cursor-pointer w-full'>
                            Go to Artist
                        </p>
                    </div>
                    :
                    ''
                }
            </div>


        </>
    )
}

export default CardPlaylist