import { useFavorites } from "@/hooks/useFavorites"
import { NextPage } from "next"

import heartIcon from "../public/heart.png"
import Image from "next/image"
import CardPlayButton from "@/components/CardPlayButton"

const likePage: NextPage<any> = () => {

    const { favorites }: any = useFavorites()

    return (

        <div className='relative w-auto md:flex-col h-full bg-zinc-900 overflow-x-hidden '>

            <header className=" flex flex-col sm:flex-row  md:flex-row gap-8 px-6 pt-20 pb-5 place-items-center sm:place-items-start " >
                <picture className="aspect-square w-auto h-auto md:w-64 md:h-64 flex-none bg-green-800 rounded-lg">
                    <Image src={heartIcon} alt="heart-icon" className="" />
                </picture>

                <div className='flex flex-col w-full justify-between'>
                    <h2 className='first-letter:uppercase text-lg block text-white font-sans'>
                        Playlist
                    </h2>
                    <div>
                        <h1 className=' text-3xl md:text-6xl lg:text-8xl font-bold block mb-6 2xl:mb-0 text-white font-sans'>
                            <p>Liked Songs</p>
                        </h1>
                    </div>

                    <div className='flex-1 flex items-end '>
                        <div className=' flex text-sm text-gray-300 font-normal'>
                            <div className="flex font-bold items-center">
                                <span className='text-white'>
                                    Your Favorites Songs
                                </span>
                                <div className="bg-white mx-2 w-1 h-1 rounded-full"></div>
                                <p className=''>
                                    <span className='text-white'>
                                        {favorites?.length}
                                    </span>
                                    <span className='text-white'>
                                        {" "}Songs
                                    </span>

                                </p>
                            </div>


                        </div>
                    </div>
                </div>
            </header>

            <div className="mb-20 md:mb-0">
                {favorites &&
                    <div className='relative z-10 px-6 pt-10'>

                    </div>
                }
                <div className="p-8  lg:mt-0 rounded shadow text-start  ">
                    <table className="w-[100%] pb-1 pt-1 ">
                        <thead className="border-b-[1px] border-zinc-600 text-zinc-400">
                            <tr className="">
                                <th className="text-start pb-5 pl-10">#</th>
                                <th className="text-start pb-5">Title</th>
                                <th className="text-start pb-5">Artist</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {favorites?.map((track: any, index: number) => (
                                <tr className="hover:bg-zinc-800 transition-all text-zinc-400" key={index}>
                                    <td className=" py-3 pl-10">
                                        {index + 1}
                                    </td>

                                    <td className="flex place-content-start items-center py-3 ">
                                        <img src={track.image} alt={track.title} className="w-16 rounded-md" />
                                        <h4 className="text-sm px-3 first-letter:uppercase" >
                                            {track.title}
                                        </h4>

                                    </td>

                                    <td className=" py-3">
                                        {track.artist}
                                    </td>
                                </tr>

                            ))

                            }

                        </tbody>

                    </table>


                </div>
            </div>


        </div>
    )
}

export default likePage