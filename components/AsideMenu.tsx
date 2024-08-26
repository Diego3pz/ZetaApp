import LibraryIcon from "../icons/Library"
import HomeIcon from "../icons/Home"
import SearchIcon from "../icons/Search"
import SideMenuItem from "./SideMenuItem"
import SideMenuCard from "./SideMenuCard"
import { playlists } from "../lib/data"
import Link from "next/link"
import Image from "next/image"
import heartIcon from "../public/heart.png"
import SideMenuCardHidden from "./SideMenuCardHidden"
import { shallow } from "zustand/shallow"
import { usePlaylistsStore } from "@/hooks/playlistStore"
import { usePlaylists } from "@/hooks/usePlaylist"
import { useEffect } from "react"

const AsideMenu = ({ handleClick, click }: any) => {



    const { playlists } = usePlaylists()

    return (
        <nav className=" flex md:flex-col flex-1 md:gap-2 ">
            <div className="w-[50%] md:w-full  bg-zinc-900 rounded-l-lg md:rounded-lg p-2 ">
                <ul className=" flex md:block place-content-around">
                    <div className="">
                        <SideMenuItem href="/">
                            <HomeIcon />
                            <p className="hidden lg:block">
                                Home
                            </p>

                        </SideMenuItem>
                    </div>
                    <div>
                        <SideMenuItem href="/search">
                            <SearchIcon />
                            <p className="hidden lg:block">
                                Search
                            </p>

                        </SideMenuItem>
                    </div>

                </ul>
            </div>

            <div className=" bg-zinc-900 w-[50%] md:w-full rounded-r-lg md:rounded-lg md:p-2 flex-1 overflow-hidden truncate">
                <ul className="truncate flex md:block place-content-around">
                    <Link href={'/playlist'} className="flex gap-4 text-zinc-400 hover:text-zinc-100 items-center py-3 px-5 font-medium transition duration-300 cursor-pointer">
                        <LibraryIcon />
                        <p className="hidden lg:block">
                            Your Library
                        </p>
                    </Link>


                    <Link href={'/like'} className="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800">
                        <picture className=" flex rounded-md items-center place-content-center h-12 w-12 flex-none md:bg-green-400" >
                            <Image src={heartIcon} alt="heart-icon" className="w-8 h-8" />
                        </picture>
                        <div className=" flex-auto flex-col truncate hidden lg:block">
                            <h4 className="text-green-400 text-sm">
                                Liked Songs
                            </h4>
                            <span className="text-xs text-gray-400">
                                <p>Playlist</p>
                            </span>
                        </div>
                    </Link>
                    {playlists?.length === 0 &&
                        <div className=" relative p-2 text-white text-sm hidden lg:block">
                            <p>No playlist created</p>
                        </div>
                    }
                    {
                        playlists.length > 0 &&
                        playlists?.map((playlist: any) =>
                            <SideMenuCard playlist={playlist} key={playlist.uuid} />)

                    }

                </ul>

            </div>
        </nav>
    )


}

export default AsideMenu