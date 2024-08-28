import Link from "next/link";
import CardPlayButton from "@/components/CardPlayButton";
import Layout from "@/components/Layout";
import { NextPage } from "next";
import { getDetails } from "@/services/getDetails";
import { useRouter } from "next/router";
import CardPlaylist from "@/components/CardPlaylist";
import CardLikeButton from "@/components/CardLikeButton";



const TrackPage: NextPage<any> = (props) => {
    const router = useRouter()
    const idRouter = router.query.id;
    const { song } = props
    const { id, music, album, image, artist, title, releaseDate, bgColor } = song

    return (
        <>

            <div className='relative w-auto md:flex-col h-full bg-zinc-900 overflow-x-hidden '>

                <header className={` flex flex-col md:flex-row gap-8 px-6 pt-20 pb-5 place-items-center mb-20 md:mb-0`} >
                    <picture className="aspect-square w-auto h-auto md:w-64 md:h-64 flex-none ">
                        <img
                            src={image}
                            alt={`Cover of ${title}`}
                            className="object-cover w-full h-full shadow-2xl rounded-md shadow-black"
                        />
                        <div className={` mt-2 opacity-100 md:opacity-0 `}>
                            <CardPlaylist track={song} />
                        </div>

                    </picture>


                    <div className='flex flex-col justify-between'>
                        <h2 className='flex flex-1 items-end'>
                            Track
                        </h2>
                        <div className="flex-1">
                            <h1 className='first-letter:uppercase text-3xl md:text lg:text-5xl xl:text-6xl mb-6 font-bold block text-white font-sans'>
                                {title}
                            </h1>

                        </div>

                        <div className='flex-1 flex items-end'>
                            <div className=' flex text-sm text-gray-300 font-normal'>
                                <div className="flex font-bold items-center">
                                    {/* <picture>
                                        <img src={imageArtistUrl} alt={`${ArtistName} - image`}
                                            className="w-7 h-7 rounded-full" />
                                    </picture> */}
                                    <span className="ml-2">{artist}</span>
                                    <div className="bg-white mx-2 w-1 h-1 rounded-full"></div>
                                    <p className=''>
                                        <span className='text-white'>
                                            {releaseDate}
                                        </span>

                                    </p>
                                </div>


                            </div>
                        </div>
                        <div className="">
                            {
                                song ?
                                    <div className="flex flex-row gap-5 items-center my-4">
                                        <div className='relative  '>
                                            <CardPlayButton track={[song]} position={0} />
                                        </div>

                                        {/* <div className='relative'>
                                    <CardPlaylist track={[song]} />
                                </div> */}

                                        <div className='flex items-center text-sm rounded-full transition-all duration-500 '>
                                            <CardLikeButton track={song} />
                                        </div>
                                    </div>

                                    :
                                    ""
                            }
                        </div>
                    </div>

                </header>




            </div>
        </>
    )

}

export default TrackPage

export async function getServerSideProps({ params }: any) {
    const id = String(params?.id)
    const song = await getDetails(id)

    return { props: { song } }
}


