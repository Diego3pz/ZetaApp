import { Quicksand } from "next/font/google";
import Link from "next/link";
import CardLikeButton from "@/components/CardLikeButton";
import CardPlayButton from "@/components/CardPlayButton";
import axios from "axios";
import useSWR from "swr";
import CardPlaylist from "@/components/CardPlaylist";
import { useState } from "react";
import { useModalPlaylist } from "@/hooks/playlistStore";
import ModalNewPlaylist from "@/components/ModalNewPlaylist";
import ModalDeletePlayList from "@/components/ModalDeletePlayList";


const fetcher = (url: string) => axios.get('/api/top').then((res) => res.data)

export const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
  const { data, error } = useSWR('/api/top', fetcher);

  const { showModal, setShowModal, song } = useModalPlaylist((state: any) => ({
    showModal: state.showModal,
    setShowModal: state.setShowModal,
    song: state.song
  }))

  // Comprobando si está cargando
  if (!data && !error) {
    return <p>Cargando...</p>;
  }

  // Si hay un error al cargar los datos
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Si data es undefined o no tiene la propiedad top
  if (!data || !data.top) {
    return <div className="w-full">
      <div className="flex flex-col text-4xl p-5">
        This section is  <p className="text-[#4ade80]">not available</p>
      </div>
    </div>;
  }

  return (
    <>

      <div id='playlist-container' className=' relative transition-all duration-1000'>
        <div className='relative z-10 px-6 pt-10' >
          <p className="text-3xl font-bold pt-5 font-sans">Top Global <span className="text-lg text-zinc-400">{`Songs #1-${data?.top?.length}`}</span></p>
          <div className="flex flex-wrap mt-6 gap-4">
            {data.top.map((track: any, index: number) => (
              <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300" key={track.key}>
                <div className={` absolute right-5 bottom-20 -translate-y-24 transition-all duration-500 opacity-0 group-hover:opacity-100 z-10`}>
                  <CardLikeButton track={track} />
                </div>
                <div className={`absolute left-4 bottom-20 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10`}>
                  <CardPlayButton track={[...data.top]} position={index} />
                </div>
                <div className={`absolute right-4 bottom-20 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10`}>
                  <CardPlaylist track={track} />
                </div>
                <Link
                  href={`/track/${track.id ?? 'defaultId'}`}
                  className="playlist-item transition-all duration-300  flex relative p-2 overflow-hidden  gap-2 pb-6 rounded-md  w-44 flex-col"
                >
                  <picture className="aspect-square w-full h-auto flex-none">
                    <img
                      src={track.image ?? '/defaultCoverArt.png'}
                      alt={track.title ?? 'Unknown Title'}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </picture>
                  <div className="flex flex-auto flex-col truncate px-2">
                    <h4 className="text-white text-sm" >
                      {track.title ?? 'Unknown Title'}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {track.artist ?? 'Unknown Artist'}
                    </span>

                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className='absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80'></div>
      </div>
      {showModal && <ModalNewPlaylist setShowModal={setShowModal} song={song} />}

    </>
  );
}
