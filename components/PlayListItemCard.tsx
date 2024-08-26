// "use client"

import Link from "next/link";
import CardPlayButton from "./CardPlayButton";



const PlaylistItemCard = async ({ id }: any) => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '757e4aef7emsh211c7ea609e9712p1fb321jsnc1a25867c5d0',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
          }
    };

    const respo = await fetch(`https://spotify81.p.rapidapi.com/top_200_tracks`, options)
    const idSolo = await respo.json();

    const spotifyId = (idSolo[0].trackMetadata.trackUri).split('spotify:track:')[1]
    console.log(spotifyId)

    // function idTrack(id:any) {

    //     console.log(id);
    // }
    // idTrack(spotifyId)

    const res = await fetch(`https://spotify81.p.rapidapi.com/download_track?q=${spotifyId}`, options)
    const data = await res.json();
    const DataTrack = (data)
    console.log(DataTrack);

    const idArtist = data.artists[0].id
    const response = await fetch(`https://spotify81.p.rapidapi.com/artists?ids=${idArtist}`, options)
    const ArtistsId = await response.json();
    console.log(ArtistsId.artists[0].images[2].url);

    return (

        <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md transition-all duration-300">
            <div
                className={`absolute right-4 bottom-20 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10`}>
                <CardPlayButton id={spotifyId} />
            </div>
            <Link
                href={`/track/${spotifyId}`}
                className="playlist-item transition-all duration-300  flex relative p-2 overflow-hidden  gap-2 pb-6 rounded-md  w-44 flex-col"
                style={{ viewTransitionName: `playlist ${spotifyId} box` }}
            >
                <picture className="aspect-square w-full h-auto flex-none">
                    <img
                        src={DataTrack.album.images[0].url}
                        alt={`Cover of ${DataTrack.name}`}
                        className="object-cover w-full h-full rounded-md"
                        style={{ viewTransitionName: `playlist ${spotifyId} image` }}
                    />
                </picture>
                <div className="flex flex-auto flex-col truncate px-2">
                    <h4 className="text-white text-sm"
                        style={{ viewTransitionName: `playlist ${spotifyId} title` }}>
                        {DataTrack.name}
                    </h4>
                    <span className="text-xs text-gray-400"
                        style={{ viewTransitionName: `playlist ${spotifyId} artists` }}>
                        {ArtistsId.artists[0].name}
                    </span>
                </div>
            </Link>
        </article>

    )
}

export default PlaylistItemCard