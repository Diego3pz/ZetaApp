import PlaylistCard from "@/components/ListPlaylists/PlaylistCard"
import { usePlaylists } from "@/hooks/usePlaylist"
import { NextPage } from "next"
import Link from "next/link"

const Playlist: NextPage<NextPage> = () => {
    const { playlists } = usePlaylists()
    return (
        <>
            {playlists?.length === 0 &&
                <div className=" relative p-5 text-white w-full flex flex-col  ">
                    <p className="text-lg">Playlist you create will appear here
                    </p>
                    <span className="text-zinc-300">Create playlists to organize your music
                    </span>
                    <Link href={`/search`} className="bg-white w-24 h-12 rounded-3xl flex place-content-center items-center ">
                        <p className="text-zinc-900">Find Music</p>
                    </Link>
                </div>
            }
            {
                playlists.length > 0 &&
                playlists?.map((playlist: any) =>
                    <PlaylistCard playlist={playlist} key={playlist.uuid} />)

            }
        </>
    )
}

export default Playlist