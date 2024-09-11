import { useFavorites } from "@/hooks/useFavorites";
import { NextPage } from "next";
import PlayLikeIcon from "@/icons/PlayLike";
import heartIcon from "../public/heart.png";
import Image from "next/image";
import CardPlayButton from "@/components/CardPlayButton";
import { usePlayerIndexStore, usePlayerStore } from "@/hooks/playerStore";
import CardLikeButton from "@/components/CardLikeButton";
import { useState } from "react";
import ModalAddToPlaylist from '@/components/ModalAddToPlaylist';
import ModalNewPlaylist from "@/components/ModalNewPlaylist";
import { useModalPlaylist } from "@/hooks/playlistStore";
import CardPlaylistLike from "@/components/Like Page/CardPlayListLike";

const LikePage: NextPage<NextPage> = () => {

    const { favorites }: any = useFavorites();
    const { setCurrentMusic, setIsPlaying } = usePlayerStore();
    const { setIndex } = usePlayerIndexStore();


    const { showModal, setShowModal, song } = useModalPlaylist((state: any) => ({
        showModal: state.showModal,
        setShowModal: state.setShowModal,
        song: state.song
    }))

    const handlePlaySong = (song: any, index: number) => {
        setCurrentMusic({
            playlist: favorites,
            song: song,
            songs: favorites.map((track: any) => track.music),
        });
        setIndex(index);
        setIsPlaying(true);
    };

    const handlePlayFirstSong = () => {
        if (favorites && favorites.length > 0) {
            handlePlaySong(favorites[0], 0);
        }
    };

    return (
        <div className="relative w-auto md:flex-col h-full bg-zinc-900 overflow-x-hidden ">
            <header className="flex flex-col sm:flex-row gap-4 sm:gap-8 px-4 sm:px-6 pt-10 sm:pt-20 pb-5 items-center sm:items-start">
                <picture className="aspect-square w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 flex-none bg-green-800 rounded-lg">
                    <Image src={heartIcon} alt="heart-icon" className="" />
                </picture>

                <div className="flex flex-col w-full justify-between text-center sm:text-left">
                    <h2 className="uppercase text-base sm:text-lg text-white font-sans">Playlist</h2>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 2xl:mb-0">
                        Liked Songs
                    </h1>
                    <div className="flex-1 sm:mt-5 flex items-center justify-center sm:justify-start">
                        <div className="flex text-sm sm:text-base text-gray-300 font-normal items-center">
                            <div className="flex-1">
                                <span className="font-bold text-white">Your Favorite Songs</span>
                            </div>

                            <div className="bg-white mx-2 w-1 h-1 rounded-full"></div>
                            <p className="flex items-center">
                                <span className="text-white">{favorites?.length}</span>
                                <span className="ml-1 text-white">Songs</span>
                                <button
                                    onClick={handlePlayFirstSong}
                                    className="bg-green-600 ml-4 text-white font-bold py-2 px-4 rounded-md sm:ml-8"
                                >
                                    Play Playlist
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mb-40 md:mb-20 ">
                {favorites && (
                    <div className="relative z-10 pt-10 ">
                        <div className="overflow-x-auto ">
                            <table className="min-w-full w-full pb-1 pt-1">
                                <thead className="md:border-b border-zinc-600 text-zinc-400">
                                    <tr>
                                        <th className=" opacity-0 text-start pb-5 text-xs sm:text-sm">Like</th>
                                        <th className="hidden sm:block text-start pb-5 text-xs sm:text-sm px-6 md:px-0">Title</th>
                                        <th className="hidden sm:table-cell text-start pb-5 text-xs sm:text-sm">Artist</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favorites?.map((track: any, index: number) => (
                                        <tr className="hover:bg-zinc-800 transition-all text-zinc-400" key={index}>
                                            <td className="py-3 pl-3">
                                                <CardLikeButton track={track} />
                                            </td>
                                            <td className="flex items-center py-3 relative group sm:max-w-none px-6 md:px-0">
                                                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                                                    <img
                                                        src={track.image}
                                                        alt={track.title}
                                                        className="w-full h-full rounded-md object-cover"
                                                    />
                                                    <button
                                                        onClick={() => handlePlaySong(track, index)}
                                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"
                                                    >
                                                        <PlayLikeIcon />
                                                    </button>
                                                </div>
                                                <div className="flex flex-col justify-center pl-3 sm:max-w-none">
                                                    <h4 className="text-xs sm:text-sm text-white font-bold md:truncate">{track.title}</h4>
                                                    <span className="sm:hidden text-xs sm:text-sm text-gray-400 md:truncate">{track.artist}</span>
                                                </div>
                                            </td>
                                            <td className="hidden sm:table-cell py-3 text-xs sm:text-sm">{track.artist}</td>

                                            <td>
                                                <CardPlaylistLike track={track}/>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {showModal && <ModalNewPlaylist setShowModal={setShowModal} song={song} />}
        </div>
    );
};

export default LikePage;