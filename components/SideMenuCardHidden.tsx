import Link from "next/link";
import type { Playlist } from "../lib/data";

interface Props {
    playlist: Playlist
}

const SideMenuCardHidden: React.FC<Props> = (playlist) => {
    const { image } = playlist.playlist.song[0]

    const { uuid, name } = playlist.playlist

    return (

        <Link
            href={`/playlist/${uuid}`}
            className="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800"
        >
            <picture className="h-12 w-12 flex-none" >
                <img src={image} alt={`name`}
                    className="object-cover w-full h-full rounded-md" />
            </picture>
            <div className="flex flex-auto flex-col truncate">
                <h4 className="text-white text-sm">
                    {name}
                </h4>
                <span className="text-xs text-gray-400">
                    {"Playlist"}
                </span>
            </div>
        </Link>
    )
}

export default SideMenuCardHidden