import CardLikeButton from "@/components/CardLikeButton";
import CardPlayButton from "@/components/CardPlayButton";
import CardPlaylist from "@/components/CardPlaylist";
import ModalNewPlaylist from "@/components/ModalNewPlaylist";
import { useModalPlaylist } from "@/hooks/playlistStore";
import SearchIcon from "@/icons/Search";
import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const SearchPage: NextPage<any> = () => {
    const [inputValue, setInputValue] = useState('')
    const router = useRouter()
    const { data, error, isLoading } = useSWR(`/api/search?song=${router.query.song}`, fetcher)

    const { showModal, setShowModal, song } = useModalPlaylist((state: any) => ({
        showModal: state.showModal,
        setShowModal: state.setShowModal,
        song: state.song
    }))

    const handleChange = (e: any) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setInputValue('')
        router.push(`/search?song=${inputValue.toLocaleLowerCase().trim()}`)
    }

    if (error) Router.push('/404')

    return (
        <div>
            <div className="static">

                <form className="flex p-5" onSubmit={e => handleSubmit(e)}>
                    <div className=" w-full flex justify-between items-center">

                        <div className="relative left-10  ml-3 pointer-events-none text-zinc-500">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            name="song"
                            placeholder="What do you want to listen?"
                            autoComplete="off"
                            className=" max-2xl:px-14 w-full pl-12 px-20 py-2 rounded-full bg-zinc-800 shadow-lg"
                            value={inputValue}
                            onChange={e => handleChange(e)}
                        />
                    </div>
                </form>
            </div>

            {
                router.query.song !== undefined ?
                    <main className='flex flex-col gap-8'>
                        <header className='flex justify-center gap-5 text-neutral-100 font-bold text-2xl lg:text-3xl'>
                            <h2 className='text-green-400'>Search - {router.query.song}</h2>
                        </header>
                        <section className='flex flex-col'>
                            <div className='grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                                {isLoading}
                            </div>
                            <div className='relative z-10 px-6 md:pt-10 mb-20 md:mb-0' >
                                <div className="flex flex-wrap md:mt-6 gap-4 place-content-center md:place-content-start mb-6">
                                    {data && data.songs?.map((song: any, index: number) => ((
                                        <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300" key={index}>
                                            <div className={` absolute right-5 bottom-20 -translate-y-24 transition-all duration-500 opacity-70 md:opacity-0 md:group-hover:opacity-100 z-10`}>
                                                <CardLikeButton track={song} />
                                            </div>
                                            <div className={`absolute left-4 bottom-20 md:translate-y-4 transition-all duration-500 opacity-100 translate-y-0  md:opacity-0 md:group-hover:translate-y-0 group-hover:opacity-100 z-10`}>
                                                <CardPlayButton track={[...data.songs]} position={index} />
                                            </div>
                                            <div className={`absolute right-4 bottom-20 translate-y-0 md:translate-y-4 transition-all duration-500 opacity-100 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10`}>
                                                <CardPlaylist track={song} />
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
                                                        {song.title ?? 'Unknown Title'}
                                                    </h4>
                                                    <span className="text-xs text-gray-400">
                                                        {song.artist ?? 'Unknown Artist'}
                                                    </span>
                                                </div>
                                            </Link>
                                        </article>
                                    )))}
                                </div>
                            </div>
                            {data && data.length === 0 && (
                                <div className='flex flex-col justify-center col-span-full mt-10'>
                                    <p className='text-white text-center font-bold text-base sm:text-xl'>{`couldn't find '${router.query.song}'`}</p>
                                    <p className='text-gray-400 text-center text-base sm:text-xl '>Try searching again using a diferent spelling or keywords</p>
                                </div>
                            )}
                        </section>
                    </main>
                    :
                    <div className="flex flex-col items-center text-4xl px-5">

                        <p>Find your favorite songs or <span className=" text-[#4ade80]">artists</span></p>
                    </div>
            }
            {showModal && <ModalNewPlaylist setShowModal={setShowModal} song={song} />}
        </div >
    )
}
export default SearchPage
