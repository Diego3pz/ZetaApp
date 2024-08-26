import CardLikeButton from "@/components/CardLikeButton";
import CardPlayButton from "@/components/CardPlayButton";
import { deletePlaylist } from "@/components/crud/playlist";
import { useModalPlaylist, usePlaylistsStore } from "@/hooks/playlistStore";
import { usePlaylists } from "@/hooks/usePlaylist";
import { getPlaylistByUUID } from "@/services/playlist";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Song {
    id: string;
    key: string;
    title: string;
    artist: string;
    image: string;
}

interface Playlist {
    id: string;
    name: string;
    song: Song[];
}

const PlaylistPage: NextPage = () => {
    const router = useRouter();
    const uuid = String(router.query?.id);
    const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);

    const { setPlaylists }: any = usePlaylistsStore();

    useEffect(() => {
        if (uuid) {
            handlePlaylist(uuid);
        }
    }, [uuid]);

    const handlePlaylist = async (uuid: string) => {
        const data = await getPlaylistByUUID(uuid);
        setPlaylist(data);
    };

    const handleDelete = async () => {
        if (uuid) {
            const newPlaylists = await deletePlaylist(uuid);
            setPlaylists(newPlaylists);
            router.push("/");
        }
    };

    return (
        <div>
            <div className="mb-20 md:mb-0">
                {uuid ?
                    <div className='relative w-auto md:flex-col h-full bg-zinc-900 overflow-x-hidden '>

                        <header className="flex flex-col md:flex-row gap-8 px-6 pt-20 pb-5 place-items-center">
                            <picture className="aspect-square w-auto h-auto md:w-64 md:h-64 flex-none ">
                                <img
                                    src={playlist?.song[0].image}
                                    alt={playlist?.name}
                                    className="object-cover w-full h-full shadow-2xl rounded-md shadow-black"
                                />
                            </picture>

                            <div className='flex flex-col justify-between'>
                                <h2 className='flex flex-1 items-end'>
                                    Playlist
                                </h2>
                                <div className="flex-1">
                                    <h1 className=' first-letter:uppercase text-5xl md:text-5xl lg:text-6xl xl:text-8xl mb-6 font-bold block text-white font-sans'>
                                        {playlist?.name}
                                    </h1>
                                </div>

                                <p className='flex items-center gap-4'>
                                    <span className='text-white gap-0'>
                                        {playlist?.song.length} {" "} Songs
                                    </span>

                                    <Link
                                        onClick={handleDelete}
                                        className="bg-green-400 p-2 rounded-md font-semibold" href={"/"}>
                                        Delete Playlist
                                    </Link>

                                </p>
                            </div>
                        </header>

                        <div className='relative z-10 px-6 pt-10' >
                            <div className="flex flex-wrap mt-6 gap-4 place-content-center md:place-content-start mb-6">
                                {playlist?.song.map((song: any, index: number) => (
                                    <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300" key={song.key}>
                                        <div className={` absolute right-5 bottom-20 -translate-y-24 transition-all duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 z-10`}>
                                            <CardLikeButton track={song} />
                                        </div>
                                        <div className={`absolute left-4 bottom-20 md:translate-y-4 transition-all duration-500 opacity-100 translate-y-0  md:opacity-0 md:group-hover:translate-y-0 group-hover:opacity-100 z-10`}>
                                            <CardPlayButton track={[...playlist?.song]} position={index} />
                                        </div>
                                        <div className={`absolute right-4 bottom-20 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10`}>
                                            {/* <CardPlaylist track={track} /> */}
                                        </div>
                                        <Link
                                            href={`/track/${song.id}`}
                                            className="playlist-item transition-all duration-300  flex relative p-2 overflow-hidden  gap-2 pb-6 rounded-md  w-44 flex-col"
                                        >
                                            <picture className="aspect-square w-full h-auto flex-none">
                                                <img
                                                    src={song.image}
                                                    alt={song.title}
                                                    className="object-cover w-full h-full rounded-md"
                                                />
                                            </picture>
                                            <div className="flex flex-auto flex-col truncate px-2">
                                                <h4 className="text-white text-sm" >
                                                    {song.title}
                                                </h4>
                                                <span className="text-xs text-gray-400">
                                                    {song.artist}
                                                </span>

                                            </div>
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                    :
                    ""
                }
            </div>
        </div>
    )
}
export default PlaylistPage
