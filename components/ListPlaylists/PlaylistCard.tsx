import Link from "next/link";
import type { Playlist } from "../lib/data";
import { Bounce, ToastContainer } from "react-toastify";

interface Props {
  playlist: Playlist
}

const PlaylistCard: React.FC<Props> = (playlist) => {

  const { image } = playlist.playlist.song[0]
  const { uuid, name }: any = playlist.playlist
  const { id }: any = playlist.playlist.song

  return (
    <div className='relative z-10 px-6 pt-10'>
      <div className="flex flex-wrap mt-6 gap-4 place-content-center md:place-content-start mb-6">
        <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300" key={id}>
          <Link
            href={`/playlist/${uuid}`}
            className="playlist-item transition-all duration-300  flex relative p-2 overflow-hidden  gap-2 pb-6 rounded-md w-auto lg:w-80 flex-col"
          >
            <picture className="aspect-square w-full h-auto flex-none">
              <img
                src={image}
                alt={name}
                className="object-cover w-full h-full rounded-md "
              />
            </picture>
            <div className="flex flex-auto flex-col truncate px-2">
              <h4 className="text-white text-sm sm:text-lg " >
                {name}
              </h4>
            </div>
          </Link>
        </article>
      </div>
      
    </div>

  )
}

export default PlaylistCard