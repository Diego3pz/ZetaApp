import Link from "next/link";
interface Playlist {
    song: any;
    id: string;
    albumId: number;
    title: string;
    cover: string;
    artists: string[];
  }

interface Props {
    playlist: Playlist
}

const SideMenuCard: React.FC<Props> = (playlist) => {

    const { image } = playlist.playlist.song[0]
    const { uuid, name } :any = playlist.playlist

    return (

        <Link
            href={`/playlist/${uuid}`}
            className="hidden md:flex playlist-item  relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800"
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

export default SideMenuCard